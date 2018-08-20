import React from 'react'
import {connect} from 'react-redux'
import {submitShipping} from '../../reducers/purchase'
import {Button, Col, DatePicker, Form, Row, Select} from 'antd'
import withStyles from 'isomorphic-style-loader/lib/withStyles'
import s from './Purchase11.css'
import {PurchaseActions, SectionHeader} from '../../components'
import PlusGiftIcon from '../../static/plus_round.svg'
import KeyHandler, {KEYPRESS} from 'react-key-handler'
import formMessages from '../../formMessages'
import messages from './messages'
import {CARD_IMAGES_PROP, DATE_FORMAT, GIFT_IMAGES_PROP} from '../../constants'
import moment from 'moment'
import {getItemImage} from '../../utils'

class Purchase11 extends React.Component {
  handleSubmit = (e) => {
    e.preventDefault()
    this.props.form.validateFields((err, values) => {
      if (!err) {
        this.props.submitShipping(values)
      }
    })
  }

  render() {
    const {flowIndex, bundle, order, occasion, intl, deliveryLocations, deliveryLocation, deliveryTime} = this.props
    const {getFieldDecorator} = this.props.form
    return order ? (
      <Form onSubmit={this.handleSubmit} className={s.form}>
        <div className={s.content}>
          <SectionHeader
            header={intl.formatMessage(messages.header)}
            number={flowIndex + 1}
            prefixClassName={s.headerPrefix}
          />
          <div className={s.orderInfo}>
            <div className={s.cardWrapper}>
              <div style={{backgroundImage: `url(${getItemImage(order.items.card, CARD_IMAGES_PROP)})`}} className={s.itemImage}/>
              {(order.items.gifts[0] || order.voucher) && (
                <PlusGiftIcon className={s.plusIcon}/>
              )}
              <p className={s.cardInfo}>
                <span className={s.cardType}>{order.items.card.title}</span>
                <br/>
                <span className={s.cardPrice}>{order.items.card.price}</span>
                <span className={s.cardPriceCurrency}>{order.items.card.currency}</span>
              </p>
            </div>
            {order.items.gifts[0] && (
              <div className={s.giftWrapper}>
                <div style={{backgroundImage: `url(${getItemImage(order.items.gifts[0].gift, GIFT_IMAGES_PROP)})`}} className={s.itemImage}/>
                <p className={s.cardInfo}>
                  <span className={s.cardType}>{order.items.gifts[0].gift.title}</span>
                  <br/>
                  <span className={s.cardPrice}>{order.items.gifts[0].gift.price}</span>
                  <span className={s.cardPriceCurrency}>{order.items.gifts[0].gift.currency}</span>
                </p>
              </div>
            )}
            {order.voucher && (
              <div className={s.giftWrapper}>
                <div>
                  <span className={s.cardType}>From: {order.voucher.from}</span><br/>
                  <span className={s.cardType}>To: {order.voucher.to}</span>
                </div>
                <p className={s.cardInfo}>
                  <span className={s.cardType}>{order.voucher.title}</span>
                  <br/>
                  <span className={s.cardPrice}>{order.voucher.price}</span>
                </p>
              </div>
            )}
          </div>
          <div className={s.orderDetails}>
            <Row type='flex' align='center' gutter={20}>
              <Col xs={24} sm={12}>
                <section>
                  <h3 className={s.cardTitle}>{occasion && occasion.title}</h3>
                  <div dangerouslySetInnerHTML={{__html: bundle.body}}/>
                </section>
              </Col>
              <Col xs={24} sm={12}>
                {order.items.gifts[0] && order.items.gifts[0].gift.description}
              </Col>
            </Row>
          </div>
          <Row type='flex' align='center' gutter={20} className={s.subtotalSection}>
            <Col xs={12}>
              <h2 className={s.subtotalHeader}>{intl.formatMessage(messages.subtotal)}</h2>
            </Col>
            <Col xs={12}>
              <span className={s.subtotalValue}>{order.total}</span>
              <span className={s.subtotalCurrency}>CHF</span>
            </Col>
          </Row>
          <section className={s.section}>
            <h2 className={s.sectionHeader}>{intl.formatMessage(messages.shipping)}</h2>
            <Row gutter={20} type='flex' align='center'>
              <Col xs={24} sm={12}>
                <Form.Item>
                  {getFieldDecorator('deliverable', {
                    initialValue: deliveryLocation,
                    rules: [
                      {required: true, message: intl.formatMessage(formMessages.required)},
                    ],
                  })(
                    <Select placeholder={intl.formatMessage(messages.deliveryPlace)} className={s.select}>
                      {deliveryLocations.map((item) =>
                        <Select.Option key={item.value} value={item.value}>{item.title}</Select.Option>
                      )}
                    </Select>
                  )}
                </Form.Item>
              </Col>
              <Col xs={24} sm={12}>
                <Form.Item>
                  {getFieldDecorator('schedule_date', {
                    initialValue: deliveryTime ? moment(deliveryTime, DATE_FORMAT) : undefined,
                  })(
                    <DatePicker
                      className={s.select}
                      placeholder={intl.formatMessage(messages.deliveryTime)}
                      format={DATE_FORMAT}
                    />
                  )}
                </Form.Item>
              </Col>
            </Row>
          </section>
        </div>
        <PurchaseActions>
          <KeyHandler
            keyEventName={KEYPRESS}
            keyCode={13}
            onKeyHandle={this.handleSubmit}
          />
          <Button
            type='primary'
            htmlType='submit'
          >
            {intl.formatMessage(messages.submit)}
          </Button>
        </PurchaseActions>
      </Form>
    ) : null
  }
}

const mapState = state => ({
  loading: state.purchase.loading,
  flowIndex: state.purchase.flowIndex,
  bundle: state.purchase.bundle,
  order: state.purchase.order,
  occasion: state.purchase.occasion,
  deliveryLocations: state.purchase.deliveryLocations,
  deliveryLocation: state.purchase.deliveryLocation,
  deliveryTime: state.purchase.deliveryTime,
})

const mapDispatch = {
  submitShipping,
}

export default connect(mapState, mapDispatch)(Form.create()(withStyles(s)(Purchase11)))
