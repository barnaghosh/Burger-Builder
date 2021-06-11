import React, { Component } from 'react'
import {Card,CardBody,CardHeader,CardFooter,Button} from 'reactstrap'

export class Controls extends Component {
    render() {
        const controls=[
            {label:'Salad',type:'salad'},
            {label:'Cheese',type:'cheese'},
            {label:'meat',type:'meat'}
        ]

        const BuildControl=(props)=>{
            return(
                <div className='d-flex'>
                    <div className='mr-auto ml-5' style={{fontSize:'1.2rem',fontWeight:'bolder'}} >{props.label} </div>
                    <button className='btn btn-danger btn-sm m-1' onClick={props.removed} >Less</button>
                    <button className='btn btn-success btn-sm m-1'onClick={props.added} >More</button>
                </div>
            )
        }

        return (
            <div className='ml-md-5 container' style={{textAlign:'center'}}>
                <Card style={{marginTop:'30px',marginBottom:'30px',textAlign:'center'}}>
                    <CardHeader style={{backgroundColor:'#D70F64'}}><h4>Add Ingradient</h4> </CardHeader>
                    <CardBody>
                        {
                            controls.map(item=>{
                                return <BuildControl label={item.label} type={item.type}
                                key={Math.random()}
                                added={()=>this.props.ingradientAdded(item.type)}
                                removed={()=>this.props.ingradientRemoved(item.type)}
                                
                                />
                            })
                        }
                    </CardBody>
                    <CardFooter>
                        <h5>Price: {this.props.price} BDT</h5>
                        
                    </CardFooter>
                    <Button style={{backgroundColor:'#D70F64'}} onClick={this.props.toggleModal} disabled={!this.props.purchaseable} >Order Now</Button>
                </Card>
            </div>
        )
    }
}

export default Controls
