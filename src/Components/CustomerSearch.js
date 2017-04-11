/*
CustomerSearch.js

    -Get list of customers from Customers.js for datalist
    -Set the active customer

by Tze Wei, 2017
https://github.com/tzeweiwee
*/

import React, { Component } from 'react';
import Customers from './Customers';

class CustomerSearch extends Component {

    constructor() {
        super();
        this.handleName = this.handleName.bind(this);
    }

    handleCustomerList(list) {
        this.props.customerList(list);
        this.setState({
            customerList: list
        });
    }

    handleName = (e) => {
        let clientName = e.target.value;
        let clientList = this.state.customerList;
        let clientFound = false;
        if (clientList) {
            clientList.forEach(function(client) {
                if (clientName === client.customerName) {
                    console.log("Special Client: " + clientName);
                    clientFound = true;
                }
            });
            if (!clientFound) {
                clientName = "default";
            }
        }
        this.props.activeCustomer(clientName);
    }

    render() {
        return (
            <div className="CustomerSearch">
          <p>Client Name:  <input list="customers" onChange={this.handleName.bind(this)}/></p>
          <Customers customerList={this.handleCustomerList.bind(this)}/>
      </div>
        );
    }
}

export default CustomerSearch;
