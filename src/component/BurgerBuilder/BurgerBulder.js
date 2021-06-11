// import React, { Component } from 'react'
// import {Modal,ModalHeader,ModalBody,ModalFooter,Button} from 'reactstrap'
// import Burger from './Burger/Burger'
// import Controls from './Controls/Controls'
// import Summary from './Summary/Summary'


// const INGRADIENT_PRICE={
//     salad:20,
//     cheese:40,
//     meat:60
// }

// export class BurgerBulder extends Component {
//     state={
//         ingradiants:[
//             {type:'salad',amount:0},
//             {type:'cheese',amount:0},
//             {type:'meat',amount:0}
//         ],
//         totalPrice:80,
//         modalOpen:false,
//         purchaseable:false
//     }
//     updatePurchaseable=()=>{
//         const sum=this.state.ingradiants.reduce((sum,element)=>{
//             return sum+element.amount
//         },0)
//         this.setState({
//             purchaseable:sum>0
//         })
//     }
//     addIngradientHandle=type=>{
//         console.log(type)
//         const ingradients=[...this.state.ingradiants]
        
//         console.log('Ingradients:',ingradients)
//         let item;
//         for(item of ingradients){
//             console.log('AddItem:',item)
//             if(item.type=== type){
//                 item.amount++
//             }
//             console.log('AfterIF:',item)
//         }
//         this.setState({
//             ingradiants:ingradients,
//             totalPrice:this.state.totalPrice + INGRADIENT_PRICE[type],
            
//         })
//         this.updatePurchaseable()
//     }
//     removeIngradientHandle=type=>{
//         console.log(type)
//         const ingradients=[...this.state.ingradiants]
        
//         console.log('Ingradients:',ingradients)
//         let item;
//         for(item of ingradients){
//             console.log('AddItem:',item)
//             if(item.type=== type){
//                 if(item.amount>0){
//                     item.amount--
//                     let totalPrice=this.state.totalPrice - INGRADIENT_PRICE[type]
//                     this.setState({
//                         ingradiants:ingradients,
//                         totalPrice:totalPrice,
                        
//                     })

                    
//                 }
//             }
           
//             console.log('AfterIF:',item)
//         }
//         this.updatePurchaseable()
        

//     }
//     toggle=()=>{
//         this.setState({
//             modalOpen:!this.state.modalOpen
//         })
//     }
//     HandleCheckout=()=>{
//         this.props.history.push('/checkout')
//     }
//     render() {
//         return (
//             <div className='d-flex flex-md-row flex-column'>
//                 <Burger ingradiants={this.state.ingradiants} />
//                 <Controls 
//                 ingradientAdded={this.addIngradientHandle}
//                 ingradientRemoved={this.removeIngradientHandle}
//                 price={this.state.totalPrice}
//                 toggleModal={this.toggle}
//                 purchaseable={this.state.purchaseable}
//                 />
//                 <Modal isOpen={this.state.modalOpen}>
//                     <ModalHeader>Your Oder summary </ModalHeader>
//                     <ModalBody>
//                         <h5>Total price:{this.state.totalPrice} </h5>
//                         <Summary ingradiant={this.state.ingradiants} />
//                     </ModalBody>
//                     <ModalFooter>
//                         <Button color='success' onClick={this.HandleCheckout} >Continue</Button>
//                         <Button color='danger' onClick={this.toggle} >Close</Button>
//                     </ModalFooter>
//                 </Modal>
//             </div>
//         )
//     }
// }

// export default BurgerBulder













import React, { Component } from 'react'
import {Modal,ModalHeader,ModalBody,ModalFooter,Button} from 'reactstrap'
import Burger from './Burger/Burger'
import Controls from './Controls/Controls'
import Summary from './Summary/Summary'
import {connect} from 'react-redux'
import {addIngradiant,removeIngradiant,updateIngradiant} from '../../Redux/actionCreator'

const mapStateToProps = state => {
    // console.log('state:',state)
    return {
        ingradiants: state.ingradiants,
        totalPrice: state.totalPrice,
        purchasable: state.purchasable,
    }
}

const mapDispatchToProps=dispatch=>{
    return({
        // addIngradientHandle:(item)=>{
        //     return dispatch({
        //         type:'ADD',
        //         payload: item
        //     })
        // },
        // removeIngradientHandle:(item)=>{
        //     return dispatch({
        //         type:'REMOVE',
        //         payload: item
        //     })
        // },
        // updatePurchaseable:()=>{
        //     return dispatch({
        //         type:'UPDATE'
                
        //     })
        // }
        addIngradientHandle:(item)=>{
            return dispatch(addIngradiant(item))
        },
        removeIngradientHandle:(item)=>{
            return dispatch(removeIngradiant(item))
        },
        updatePurchaseable:()=>{
            return dispatch(updateIngradiant())
        }

    })
}


const INGRADIENT_PRICE={
    salad:20,
    cheese:40,
    meat:60
}

export class BurgerBulder extends Component {
    state={
        // ingradiants:[
        //     {type:'salad',amount:0},
        //     {type:'cheese',amount:0},
        //     {type:'meat',amount:0}
        // ],
        // totalPrice:80,
        
        // purchaseable:false

        modalOpen:false,
    }
    
    addIngradientHandle=type=>{
   
        this.props.addIngradientHandle(type)
        this.props.updatePurchaseable()
        
        
    }
    removeIngradientHandle=type=>{
        this.props.removeIngradientHandle(type)
        this.props.updatePurchaseable()
        

    }
    toggle=()=>{
        this.setState({
            modalOpen:!this.state.modalOpen
        })
    }
    HandleCheckout=()=>{
        this.props.history.push('/checkout')
    }
    render() {
        //  console.log('MapStateToProps Ingradients:',this.props.purchasable)
        // // console.log('props:',this.props)
        return (
            <div className='d-flex flex-md-row flex-column'>
                <Burger ingradiants={this.props.ingradiants} />
                <Controls 
                ingradientAdded={this.addIngradientHandle}
                ingradientRemoved={this.removeIngradientHandle}
                price={this.props.totalPrice}
                toggleModal={this.toggle}
                purchaseable={this.props.purchasable}
                />
                <Modal isOpen={this.state.modalOpen}>
                    <ModalHeader>Your Oder summary </ModalHeader>
                    <ModalBody>
                        <h5>Total price:{this.props.totalPrice} </h5>
                        <Summary ingradiant={this.props.ingradiants} />
                    </ModalBody>
                    <ModalFooter>
                        <Button style={{backgroundColor:'#D70F64'}} onClick={this.HandleCheckout} >Continue</Button>
                        <Button  onClick={this.toggle} >Close</Button>
                    </ModalFooter>
                </Modal>
            </div>
        )
    }
}

export default connect(mapStateToProps,mapDispatchToProps)(BurgerBulder)
