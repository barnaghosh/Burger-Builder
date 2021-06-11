import React, { Component } from 'react'
import BreadBottom from '../../asset/images/bottom.png'
import Cheese from '../../asset/images/cheese.png'
import Meat from '../../asset/images/meat.png'
import BreadTop from '../../asset/images/top.png'
import Salad from '../../asset/images/salad.png'
import './Ingradiant.css'

export class Ingradiant extends Component {
    render() {
       
        let ingradiant=null;
        switch(this.props.types){
            case 'bread-top':
                
                ingradiant=<div><img src={BreadTop} /> </div>
                break;
            case 'cheese':
                    ingradiant=<div><img src={Cheese} /> </div>  
                    break;   
            case 'meat':
                ingradiant=<div><img src={Meat} /> </div>  
                break;  
            case 'salad':
                ingradiant=<div><img src={Salad} /> </div>  
                break;    
            case 'bread-bottom':
                    ingradiant=<div><img src={BreadBottom} /> </div>  
                    break;  
            default:
                ingradiant=null
                break
        }
        
        return (
            <div className='Ingradiant'>
                {ingradiant}
            </div>
        )
    }
}

export default Ingradiant
