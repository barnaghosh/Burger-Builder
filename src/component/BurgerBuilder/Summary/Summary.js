import React, { Component } from 'react'

export class Summary extends Component {
    render() {
        
        const li = this.props.ingradiant.map((item)=>{
            if(item.amount !== 0){
                return(
                    <li key={item.type}>
                        <span style={{textTransform:'capitalize'}} >{item.type}:</span>
                        <span> { item.amount}</span>
                    </li>
                )
            }
        })
        
        return (
            <div>
                <ul>
                    {li}
                </ul>
            </div>
        )
    }
}

export default Summary
