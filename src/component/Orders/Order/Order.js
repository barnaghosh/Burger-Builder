import React, { Component } from 'react'

export class Order extends Component {
    render() {
        const ingradiantSummary=this.props.order.ingradiants.map(item=>{
            return(
                <span  style={{
                    border:'1px solid gray',
                   
                    borderRadius:'5px',
                    padding:'5px',
                    marginRight:'10px'
    
                }} key={item.type}>
                    {item.amount}x
                    <span style={{textTransform:'capitalize'}}>{item.type} </span>
                </span>
            )
        })
        return (
            <div style={{
                border:'1px solid gray',
                boxShadow:'1px 1px #888888',
                borderRadius:'5px',
                padding:'20px',
                marginBottom:'10px'

            }}>
                <p>Order Number: {this.props.order.id} </p>
                <p>Delivery Address: {this.props.order.customer.deliveryAddress} </p>
                <hr/>
                {ingradiantSummary}
                <hr />
                <p>Total Price: {this.props.order.totalPrice} BDT</p>
            </div>
        )
    }
}

export default Order
