import React from 'react'
import {connect} from 'react-redux'
import {Button, Col, DatePicker, Form, Input, Row} from 'antd'
import withStyles from 'isomorphic-style-loader/lib/withStyles'
import s from './Register2.css'
import KeyHandler, {KEYPRESS} from 'react-key-handler'
import formMessages from '../../formMessages'
import {setIndividualDetails} from '../../reducers/register'
import messages from './messages'
import {DATE_FORMAT} from '../../constants'
import {SectionHeader} from '../../components'

class Register2 extends React.Component {
  handleSubmit = (e) => {
    e.preventDefault()
    this.props.form.validateFields((err, values) => {
      if (!err) {
        this.props.setIndividualDetails(values)
      }
    })
  }

  render() {
    const {individualDetails, intl} = this.props
    const {getFieldDecorator} = this.props.form
    return (
      <Form onSubmit={this.handleSubmit} className={s.container}>
        <div className={s.content}>
          <section>
            <SectionHeader
              header={intl.formatMessage(messages.header)}
              number={2}
              prefixClassName={s.headerPrefix}
            />
            <Row gutter={20}>
              <Col xs={24} sm={12}>
                <Form.Item>
                  {getFieldDecorator('first_name', {
                    initialValue: individualDetails && individualDetails.first_name,
                    rules: [
                      {required: true, message: intl.formatMessage(formMessages.required), whitespace: true},
                    ],
                  })(
                    <Input placeholder={intl.formatMessage(messages.firstName)}/>
                  )}
                </Form.Item>
              </Col>
              <Col xs={24} sm={12}>
                <Form.Item>
                  {getFieldDecorator('last_name', {
                    initialValue: individualDetails && individualDetails.last_name,
                    rules: [
                      {required: true, message: intl.formatMessage(formMessages.required), whitespace: true},
                    ],
                  })(
                    <Input placeholder={intl.formatMessage(messages.lastName)}/>
                  )}
                </Form.Item>
              </Col>
            </Row>
            <Form.Item>
              {getFieldDecorator('email', {
                initialValue: individualDetails && individualDetails.email,
                rules: [
                  {required: true, message: intl.formatMessage(formMessages.required)},
                  {type: 'email', message: formMessages.emailInvalid},
                ],
              })(
                <Input placeholder={intl.formatMessage(messages.email)}/>
              )}
            </Form.Item>
            <Form.Item>
              {getFieldDecorator('phone', {
                initialValue: individualDetails && individualDetails.phone,
                rules: [
                  {required: true, message: intl.formatMessage(formMessages.required)},
                ],
              })(
                <Input placeholder={intl.formatMessage(messages.phone)}/>
              )}
            </Form.Item>
            <Form.Item>
              {getFieldDecorator('password', {
                rules: [
                  {required: true, message: intl.formatMessage(formMessages.required)},
                ],
              })(
                <Input type='password' placeholder={intl.formatMessage(messages.password)}/>
              )}
            </Form.Item>
          </section>
          <section>
            <h1 className={s.header}>
              {intl.formatMessage(messages.birthday)}
            </h1>
            <Form.Item>
              {getFieldDecorator('birthday', {
                initialValue: individualDetails ? individualDetails.month : undefined,
                rules: [
                  {required: true, message: intl.formatMessage(formMessages.required)},
                ],
              })(
                <DatePicker className={s.birthday} format={DATE_FORMAT}/>
              )}
            </Form.Item>
          </section>
        </div>
        <div className={s.actions}>
          <KeyHandler
            keyEventName={KEYPRESS}
            keyCode={13}
            onKeyHandle={this.handleSubmit}
          />
          <Button htmlType='submit' type='primary' className={s.submitBtn}>
            {intl.formatMessage(messages.submit)}
          </Button>
        </div>
      </Form>
    )
  }
}

const mapState = state => ({
  individualDetails: state.register.individualDetails,
})

const mapDispatch = {
  setIndividualDetails,
}

export default connect(mapState, mapDispatch)(Form.create()(withStyles(s)(Register2)))
