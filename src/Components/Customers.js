/*
Customers.js

    -Populate an array of customers
    -The array is used for validation in PricingRules.js 
    -Maintable and Extendable list of customers

by Tze Wei, 2017
https://github.com/tzeweiwee
*/
import React, { Component } from 'react';
import Customer from './Customer';

function customer(name) {
    this.customerName = name;
}

class Customers extends Component {
    constructor() {
        super();
        this.state = {
            customerList: [ // initialize customers, any new customers can be added here
                new customer("nike"),
                new customer("unilever"),
                new customer("ford"),
                new customer("apple")
            ],
            customerOptions: ""
        }
    }

    componentWillMount() {
        // get Customer component
        let customerOptions = this.state.customerList.map(customer => {
            return (
                <Customer key={customer.customerName} customer={customer}/>
            );
        });

        this.setState({
            customerOptions: customerOptions
        })
        this.props.customerList(this.state.customerList);
    }

    render() {
        return (
            <div className="Customer">
                <datalist id="customers">
                    {this.state.customerOptions}
                </datalist>
            </div>
        );
    }
}

export default Customers;
