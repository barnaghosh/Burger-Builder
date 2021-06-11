import React, { Component } from 'react';
import { Redirect } from 'react-router-dom';
import { connect } from 'react-redux';

import { logout } from '../../Redux/AuthactionCreator';

const mapDispatchToProps = dispatch => {
    return {
        logout: () => dispatch(logout()),
    }
}

class Log extends Component {
    componentDidMount() {
        this.props.logout();
    }
    render() {
        return (<Redirect to="/" />)
    }
}

export default connect(null, mapDispatchToProps)(Log);