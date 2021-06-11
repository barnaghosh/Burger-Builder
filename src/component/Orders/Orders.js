import React, { Component } from 'react'
import { connect } from 'react-redux'
import { fetchOrder } from '../../Redux/actionCreator'
import { Order } from './Order/Order'
import Spinner from '../Spinner/Spinner'

const mapStateToProps = state => {
    return ({
        order: state.order,
        orderLoading: state.orderLoading,
        orderErr: state.orderErr,
        totalPrice: state.totalPrice,
        errMsg: state.ErrMsg,
        token: state.token,
        userId:state.userId
    })
}

const mapDispatchToProps = dispatch => {
    return ({
        fetchOrder: (token,userId) => dispatch(fetchOrder(token,userId))
    })
}

export class Orders extends Component {
    componentDidMount() {
        this.props.fetchOrder(this.props.token,this.props.userId)
    }
    componentDidUpdate() {
        // console.log('Update Order:',this.props)
    }
    render() {
        let orders;
        if (this.props.orderErr) {
            orders = <p style={{
                border: '1px solid gray',
                boxShadow: '1px 1px #888888',
                borderRadius: '5px',
                padding: '20px',
                marginBottom: '10px'

            }}>{this.props.errMsg} </p>
        }
        else {
            if (this.props.order.length === 0) {
                orders = <p style={{
                    border: '1px solid gray',
                    boxShadow: '1px 1px #888888',
                    borderRadius: '5px',
                    padding: '20px',
                    marginBottom: '10px'

                }}>You have no Orders!</p>
            }
            else {
                orders = this.props.order.map(order => {
                    // console.log('Order:',order)
                    return <Order key={order.id} order={order} />
                })
            }

        }

        return (
            <div>
                {this.props.orderLoading ? <Spinner /> : orders}
            </div>
        )
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(Orders)
