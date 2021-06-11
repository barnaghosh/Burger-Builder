// import React, { Component } from 'react'
// import { Button } from 'reactstrap'
// import { connect } from 'react-redux'
// import axios from 'axios'
// import Spinner from '../../Spinner/Spinner'
// import { Modal, ModalHeader, ModalBody, ModalFooter } from 'reactstrap'
// import { resetIngradiant } from '../../../Redux/actionCreator'

// const mapStateToProps = state => {
//     // console.log('state:',state)
//     return {
//         ingradiants: state.ingradiants,
//         totalPrice: state.totalPrice,
//         purchasable: state.purchasable,
//     }
// }

// const mapDispatchToProps = dispatch => {
//     return ({
//         resetIngradiants: () => dispatch(resetIngradiant())
//     })
// }

// export class Checkout extends Component {
//     state = {
//         values: {
//             deliveryAddress: '',
//             phone: '',
//             payment: ''
//         },
//         isLoading: false,
//         modalOpen: false,
//         modalMsg: ''
//     }
//     goBack = () => {
//         this.props.history.goBack('/')
//     }
//     inputHandler = (e) => {
//         // console.log('Target:',e.target.name)
//         // console.log('Target Value:',e.target.value)
//         this.setState({
//             values: {
//                 ...this.state.values,
//                 [e.target.name]: e.target.value
//             }
//         })
//         // console.log("state:",this.state.values)
//     }
//     submitHandler = () => {
//         this.setState({
//             isLoading: true
//         })
//         const order = {
//             ingradiants: this.props.ingradiants,
//             totalPrice: this.props.totalPrice,
//             customer: this.state.values,
//             orderTime: new Date()

//         }
//         axios.post('https://burger-builder-37b25-default-rtdb.firebaseio.com/orders.json', order)
//             .then(response => {
//                 if (response.status === 200) {
//                     this.setState({
//                         isLoading: false,
//                         modalOpen: true,
//                         modalMsg: 'Oder Place Successfully!!!'
//                     })
//                     console.log("Response: ", response)
//                     this.props.resetIngradiants()
//                 }
//                 else {
//                     this.setState({
//                         isLoading: false,
//                         modalOpen: true,
//                         modalMsg: 'Something went wrong'
//                     })
//                     console.log("Response: ", response)
//                 }
//             })
//             .catch(err => {
//                 this.setState({
//                     isLoading: false
//                 })
//                 console.log("ERROR: ", err)
//             })
//         // console.log('Submit:',order)
//         // console.log('Submit checkout value :', this.state.values)


//     }
//     toggle = () => {
//         this.setState({
//             modalOpen: !this.state.modalOpen
//         })
//     }
//     render() {
//         // console.log("Render state:",this.state.values)
//         // console.log("form state:",this.props.ingradiants)
//         let form = (<div>
//             <h4 style={{ border: '1px solid gray', boxShadow: '1px 1px #888888', borderRadius: '5px', padding: '20px' }}>Payment:{this.props.totalPrice} BDT </h4>
//             <form style={{ border: '1px solid gray', boxShadow: '1px 1px #888888', borderRadius: '5px', padding: '20px' }}>
//                 <textarea name='deliveryAddress' className='form-control' value={this.state.values.deliveryAddress} placeholder='Your Address' onChange={(e) => this.inputHandler(e)} />
//                 <br />
//                 <input name='phone' className='form-control' value={this.state.values.phone} placeholder='Your phone number' onChange={(e) => this.inputHandler(e)} />
//                 <br />
//                 <select name='payment' className='form-control' value={this.state.values.payment} onChange={(e) => this.inputHandler(e)}  >
//                     <option value='Cash On Delivery' > Cash On Delivery</option>
//                     <option value='Bkash'>BKash</option>
//                 </select>
//                 <br />
//                 <Button style={{ backgroundColor: '#D70F64' }} className='mr-auto'
//                     onClick={this.submitHandler} disabled={!this.props.purchasable} >Place Order</Button>
//                 <Button color='secondary' className='ml-1' onClick={this.goBack} >Cancel</Button>
//             </form>
//         </div>)
//         return (
//             <div>
//                 {this.state.isLoading ? <Spinner /> : form}
//                 <Modal isOpen={this.state.modalOpen} onClick={this.goBack} >
//                     <ModalBody>{this.state.modalMsg} </ModalBody>
//                     {/* <ModalFooter >
//                         <Button onClick={this.toggle} >Close</Button>
//                     </ModalFooter> */}
//                 </Modal>
//             </div>
//         )
//     }
// }

// export default connect(mapStateToProps, mapDispatchToProps)(Checkout)



















import React, { Component } from 'react'
import { Button } from 'reactstrap'
import { connect } from 'react-redux'
import axios from 'axios'
import Spinner from '../../Spinner/Spinner'
import { Modal, ModalHeader, ModalBody, ModalFooter } from 'reactstrap'
import { resetIngradiant } from '../../../Redux/actionCreator'
import { Formik } from 'formik'

const mapStateToProps = state => {
    // console.log('state:',state)
    return {
        ingradiants: state.ingradiants,
        totalPrice: state.totalPrice,
        purchasable: state.purchasable,
        userId:state.userId,
        token:state.token
    }
}

const mapDispatchToProps = dispatch => {
    return ({
        resetIngradiants: () => dispatch(resetIngradiant())
    })
}

export class Checkout extends Component {
    state = {
        values: {
            deliveryAddress: '',
            phone: '',
            payment: ''
        },
        isLoading: false,
        modalOpen: false,
        modalMsg: ''
    }
    goBack = () => {
        this.props.history.goBack('/')
    }

   
    toggle = () => {
        this.setState({
            modalOpen: !this.state.modalOpen
        })
    }
    render() {
        // console.log("Render state:",this.state.values)
        // console.log("form state:",this.props.ingradiants)
        let form = (
            <Formik
                initialValues={
                    {
                        deliveryAddress: '',
                        phone: '',
                        payment: ''


                    }
                }
                onSubmit={
                    (values) => {
                        // console.log('Sumbit:', values);
                        this.setState({
                            isLoading: true
                        })
                        const order = {
                            ingradiants: this.props.ingradiants,
                            totalPrice: this.props.totalPrice,
                            customer: values,
                            orderTime: new Date(),
                            userId:this.props.userId

                        }
                        axios.post('https://burger-builder-37b25-default-rtdb.firebaseio.com/orders.json?auth='+this.props.token, order)
                            .then(response => {
                                if (response.status === 200) {
                                    this.setState({
                                        isLoading: false,
                                        modalOpen: true,
                                        modalMsg: 'Oder Place Successfully!!!'
                                    })
                                    // console.log("Response: ", response)
                                    this.props.resetIngradiants()
                                }
                                else {
                                    this.setState({
                                        isLoading: false,
                                        modalOpen: true,
                                        modalMsg: 'Something went wrong'
                                    })
                                    // console.log("Response: ", response)
                                }
                            })
                            .catch(err => {
                                this.setState({
                                    isLoading: false
                                })
                                console.log("ERROR: ", err)
                            })
                        //  console.log('Submit:',order)
                        // console.log('Submit checkout value :', values)

                    }
                }
                validate={
                    (values) => {
                        const errors = {};
                        if (!values.deliveryAddress) {
                            errors.deliveryAddress = 'Required';
                        } else if (values.deliveryAddress < 4) {
                            errors.deliveryAddress = 'Please enter correct address';
                        }

                        if (!values.phone) {
                            errors.phone = 'Required';
                        } else if (!/(^(\+88|0088)?(01){1}[3456789]{1}(\d){8})$/.test(values.phone)) {
                            errors.phone = 'Phone is not valid';
                        }
                        if (!values.payment) {
                            errors.payment = 'Required';
                        }
                        // console.log('Errors: ', errors)
                        return errors
                    }
                }
            >
                {({ values, handleChange, handleSubmit, errors }) => (
                    <div>
                        <h4 style={{ border: '1px solid gray', boxShadow: '1px 1px #888888', borderRadius: '5px', padding: '20px' }}>Payment:{this.props.totalPrice} BDT </h4>
                        <form style={{ border: '1px solid gray', boxShadow: '1px 1px #888888', borderRadius: '5px', padding: '20px' }} onSubmit={handleSubmit}>
                            <textarea name='deliveryAddress' className='form-control' value={values.deliveryAddress} placeholder='Your Address' onChange={handleChange} />
                            <span style={{ color: 'red' }}>{errors.deliveryAddress}</span>
                            <br />
                            <input name='phone' className='form-control' value={values.phone} placeholder='Your phone number' onChange={handleChange} />
                            <span style={{ color: 'red' }}>{errors.phone}</span>
                            <br />
                            <select name='payment' className='form-control' onChange={handleChange} value={values.payment}>
                                <option value="" label="Select payment way" />
                                <option value="Cash On Delivery " label='Cash On Delivery' />
                                <option value="BKash" label='Bkash' />

                            </select>
                            <span style={{ color: 'red' }}>{errors.payment}</span>
                            <br />
                            <Button style={{ backgroundColor: '#D70F64' }} className='mr-auto'
                                type='submit' disabled={!this.props.purchasable}  >Place Order</Button>
                            <Button color='secondary' className='ml-1' onClick={this.goBack} >Cancel</Button>
                        </form>
                    </div>
                )}
            </Formik>
        )
        return (
            <div>
                {this.state.isLoading ? <Spinner /> : form}
                <Modal isOpen={this.state.modalOpen} onClick={this.goBack} >
                    <ModalBody>{this.state.modalMsg} </ModalBody>
                    {/* <ModalFooter >
                        <Button onClick={this.toggle} >Close</Button>
                    </ModalFooter> */}
                </Modal>
            </div>
        )
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(Checkout)
