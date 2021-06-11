import React, { Component } from 'react'
import { Formik } from 'formik'
import './Auth.css'
import { auth } from '../../Redux/AuthactionCreator'
import { connect } from 'react-redux'
import Spinner from '../Spinner/Spinner'
import { Alert } from 'reactstrap'


const mapStateToProps = state => {
    return ({
        authLoading: state.authLoading,
        authFailedMsg: state.authFailedMsg
    })
}

const mapDispatchToProps = dispatch => {
    return ({
        auth: (email, password, mode) => dispatch(auth(email, password, mode))
    })
}

export class Auth extends Component {
    state = {
        mode: 'SignIn',
        visible:true
    }

    switchButtonHandler = () => {
        if (this.state.mode === 'SignUp') {
            this.setState({
                mode: 'LogIn'
            })
        } else {
            this.setState({
                mode: 'SignUp'
            })
        }

    }
    render() {
        // console.log('Mode:', this.props)
        let form = null;
        let error = null;

        if (this.props.authFailedMsg !== null) {
            
            setTimeout(()=>{
                this.setState({
                    visible:false
                })
            },7000)
            error = <Alert color='danger' isOpen={this.state.visible} >{this.props.authFailedMsg} </Alert>
        }

        if (this.props.authLoading) {
            form = <Spinner />
        }
        else {
            form = (<Formik

                initialValues={
                    {
                        email: "",
                        password: "",
                        passwordConfirm: ""
                    }
                }
                onSubmit={
                    (values) => {
                        // console.log('Submit', values)
                        this.props.auth(values.email, values.password, this.state.mode)
                    }
                }
                validate={
                    (values) => {
                        const errors = {};
                        if (!values.email) {
                            errors.email = 'Required';
                        } else if (
                            !/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i.test(values.email)
                        ) {
                            errors.email = 'Invalid email address';
                        }

                        if (!values.password) {
                            errors.password = 'Required';
                        } else if (values.password.length < 6) {
                            errors.password = 'Must be atleast 6 characters!';
                        }

                        if (this.state.mode === 'SignUp') {
                            if (!values.passwordConfirm) {
                                errors.passwordConfirm = 'Required';
                            } else if (values.password !== values.passwordConfirm) {
                                errors.passwordConfirm = 'Password field does not match';
                            }
                        }


                        // console.log('Errors: ', errors)
                        return errors
                    }
                }
            >
                {({ values, handleChange, handleSubmit, errors }) => {
                    return (
                        <div className='div'>
                            <button style={{ backgroundColor: '#D70F64', width: '100%', color: 'white' }} className='btn mb-5' onClick={this.switchButtonHandler}  >{this.state.mode === 'SignUp' ? 'Switch To Log in' : 'Switch To Sign up'} </button>
                            <form onSubmit={handleSubmit}>
                                <input
                                    name='email'
                                    className='form-control'
                                    placeholder='Enter Your Email'
                                    value={values.email}
                                    onChange={handleChange}
                                />
                                <span style={{ color: 'red' }}>{errors.email}</span>
                                <br />
                                <input
                                    name='password'
                                    className='form-control'
                                    placeholder='Password'
                                    value={values.password}
                                    onChange={handleChange}
                                />
                                <span style={{ color: 'red' }}>{errors.password}</span>
                                <br />
                                {this.state.mode === 'SignUp' ? <div><input
                                    name='passwordConfirm'
                                    className='form-control'
                                    placeholder='Confirm Password'
                                    value={values.passwordConfirm}
                                    onChange={handleChange}
                                />
                                    <span style={{ color: 'red' }}>{errors.passwordConfirm}</span>
                                    <br /></div> : null}

                                {/* <input
                                    name='passwordConfirm'
                                    className='form-control'
                                    placeholder='Confirm Password'
                                    value={values.passwordConfirm}
                                    onChange={handleChange}
                                />
                                    <span style={{ color: 'red' }}>{errors.passwordConfirm}</span>
                                    <br /> */}

                                <button type='submit' className='btn btn-success' >
                                    {this.state.mode === 'SignUp' ? 'SignUp' : 'LogIn'}
                                </button>

                            </form>
                        </div>
                    )
                }

                }
            </Formik>)
        }
        return (
            <div style={{ width: '60%', margin: 'auto' }} >
                {error}
                {form}

            </div>
        )
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(Auth)
