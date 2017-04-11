/*
Customer.js

    -Renders options to populate datalist, special clients can see their name listed when input bar is changed

by Tze Wei, 2017
https://github.com/tzeweiwee
*/
import React, { Component } from 'react';

class Customer extends Component {
    render() {
        return (
            <option className="Customer" value={this.props.customer.customerName}></option>
        );
    }
}

export default Customer;
