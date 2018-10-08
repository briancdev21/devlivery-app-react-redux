import React from 'react'
import {connect} from 'react-redux'
import {Table, Button, Radio } from 'antd'
import withStyles from 'isomorphic-style-loader/lib/withStyles'
import s from './CardCheckOut.css'
import messages from './messages'
import Visa from '../../static/payment/visa.svg';
import Mastercard from '../../static/payment/mastercard.svg';
import Discover from '../../static/payment/discover.svg';
import Amex from '../../static/payment/amex.svg';
import Fault from '../../static/payment/default.svg';
import {setDefaultCard} from '../../reducers/user';

class CardCheckOut extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      disabled:false
    }
  }

  render() {
    // TODO add table loading
    const {
      cards
    } = this.props
    
    const columns = [
      {
        title: 'active',
        dataIndex: '',
        key: '',
        render: (data) => (
          <Radio  checked={data.default} disabled={this.state.disabled} onChange={() => {
              if(!data.default)
              {
                this.setState({disabled:true});
                this.props.setDefaultCard(data.id,()=>this.setState({disabled:false}))
              }
            }} />
        )
      },
      {
        title: 'Brand',
        dataIndex: '',
        key: '',
        render:(record) =>{
          if(record.brand.toLowerCase()==='visa')
            return (<Visa className={s.cardstyle}/>)
          if(record.brand.toLowerCase()==='mastercard')
            return (<Mastercard className={s.cardstyle}/>)
          if(record.brand.toLowerCase()==='discover')
            return (<Discover className={s.cardstyle}/>)
          if(record.brand.toLowerCase()==='amex')
            return (<Amex className={s.cardstyle}/>)
          return (<Fault className={s.cardstyle}/>)
        }
      },
      {
        title: 'BrandName',
        dataIndex: 'brand',
        key: 'brand',
      },
      {
        title: 'Last4',
        dataIndex: 'last4',
        key: 'last4',
      },
      {
        title: 'Expire date',
        dataIndex: '',
        key: '',
        render: (record) => record.exp_month+' / ' +record.exp_year
      },
    ]
    
    return (
      <div className={s.container}>
        <Table
          showHeader = {false}
          columns={columns}
          dataSource={cards}
          rowKey={record => record.id}
          //onChange={(pagination, filters, sorter) => getTeam({pagination, filters, sorter})}
          pagination={{
            hideOnSinglePage: true,
          }}
        />
      </div>
    )
  }
}

const mapState = state => ({
 
})

const mapDispatch = {
  setDefaultCard
}

export default connect(mapState, mapDispatch)(withStyles(s)(CardCheckOut))