import React from 'react'
import {connect} from 'react-redux'
import {nextFlowStep, setCardStyle} from '../../reducers/purchase'
import {Col, Row, Button} from 'antd'
import withStyles from 'isomorphic-style-loader/lib/withStyles'
import s from './Purchase3.css'
import {Card, SectionHeader, PurchaseActions} from '../../components'
import {ALPHABET} from '../../constants'
import messages from './messages'
import KeyHandler, {KEYPRESS} from 'react-key-handler'

class Purchase3 extends React.Component {
  render() {
    const {cardStyle, setCardStyle, cardStyles, intl, flowIndex, nextFlowStep} = this.props
    console.log("---",cardStyles);
    return (
      <div className={s.content}>
        <SectionHeader
          header={intl.formatMessage(messages.header)}
          number={flowIndex + 1}
          prefixClassName={s.headerPrefix}
        />
        <Row className={s.items} gutter={20} type='flex' align='center'>
          {cardStyles.sort((a,b) => a.sequence>b.sequence).map((item, i) =>
            <Col key={item.title} className={s.itemWrapper}>
              <Card
                className={s.item}
                title={item.title}
                item={item}
                imagesProp={'image'}
                onClick={() => {
                  setCardStyle(item.title)
                }}
                active={item.title === cardStyle}
                keyValue={ALPHABET[i]}
                //imageStyle ={{'backgroundSize':'auto'}}
              />
            </Col>
          )}
        </Row>
        <PurchaseActions>
          <KeyHandler
            keyEventName={KEYPRESS}
            keyCode={13}
            onKeyHandle={() => cardStyle && nextFlowStep()}
          />
          <Button
            type='primary'
            disabled={!cardStyle}
            onClick={() => nextFlowStep()}
          >
            {intl.formatMessage(messages.submit)}
          </Button>
        </PurchaseActions>
      </div>
    )
  }
}

const mapState = state => ({
  cardStyles: state.purchase.cardStyles,
  cardStyle: state.purchase.cardStyle,
  loading: state.purchase.loading,
  flowIndex: state.purchase.flowIndex,
})

const mapDispatch = {
  setCardStyle,
  nextFlowStep,
}

export default connect(mapState, mapDispatch)(withStyles(s)(Purchase3))
