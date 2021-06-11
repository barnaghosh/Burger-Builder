import React, { Component } from 'react'
import Ingradiant from '../Ingradiant/Ingradiant'
import './Burger.css'

export class Burger extends Component {
    render() {
        // console.log('PropsIngradient:',this.props.ingradiants)
        let ingradiantArr=this.props.ingradiants.map((item)=>{
            // console.log('Item:',item)
            let amountArr=[...Array(item.amount).keys()]
            
            return amountArr.map(_=>{
                return <Ingradiant types={item.type} key={Math.random()} />
                // return <p key={Math.random()} >Hello</p>
            })
        })
        .reduce((arr,element)=>{
            // console.log('BurgerElement:',element)
            return arr.concat(element)
        },[])
        //  console.log('Ing:',ingradiantArr)
        if(ingradiantArr.length ===0){
            ingradiantArr= <p>Please add some ingradient!</p>
        }
       
        return (
            <div className='Burger'>
                <Ingradiant types='bread-top' />
                {ingradiantArr}
                <Ingradiant types='bread-bottom' />
            </div>
        )
    }
}

export default Burger
