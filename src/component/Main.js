import React, { Component } from 'react'
import BurgerBulder from './BurgerBuilder/BurgerBulder'
import Header from './Header/Header'
import { Route, Switch, Redirect } from 'react-router-dom'
import Orders from './Orders/Orders'
import Checkout from './Orders/Checkout/Checkout'
import Auth from './Auth/Auth'
import { connect } from 'react-redux'
import { authCheck } from '../Redux/AuthactionCreator'
import  Log  from './Auth/Log'

const mapStateToProps = state => {
    return {
        token: state.token
    }
}

const mapDispatchToProps = dispatch => {
    return {
        auth: () => dispatch(authCheck())
    }
}

export class Main extends Component {

    componentDidMount() {
        this.props.auth()
    }



    render() {
        let route = null;
        if (this.props.token === null) {
            route = (
                <Switch>
                     
                    <Route path='/login' component={Auth} />
                    <Redirect to='/login' />
                   
                </Switch>
            )
        }
        else {
            route = (
                <Switch>
                    <Route path='/orders' component={Orders} />
                    <Route path='/checkout' component={Checkout} />
                    <Route path='/' exact component={BurgerBulder} />
                    <Route path='/logout' component={Log} />
                    <Redirect to='/' />
                </Switch>
            )
        }
        return (
            <div>
                <Header />
                <div className='container' >


                    {route}


                </div>


            </div>
        )
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(Main)
