/*
App.js

    -Main component for bridging large components
    -Responsible for transporting props and states from component to another

by Tze Wei, 2017
https://github.com/tzeweiwee
*/

import React, { Component } from 'react';
import './App.css';
import CustomerSearch from './Components/CustomerSearch';
import Products from './Components/Products';
import PricingRules from './Components/PricingRules';
import Checkout from './Components/Checkout';

class App extends Component {

    constructor() {
        super();
        this.state = {
            heading: "",
            subheading: "",
            productList: [],
            pricingRules: [],
            customerList: [],
            activeCustomer: "default"
        }
    }

    componentWillMount() {
        this.setState({
            heading: "Job Advertisements",
            subheading: "checkout system"
        })
    }

    handleCustomerList(list) {
        this.setState({
            customerList: list
        });
    }

    handleActiveCustomer(client) {
        this.setState({
            activeCustomer: client
        });
    }

    handlePricingRules(rules) {
        this.setState({
            pricingRules: rules
        });
    }

    handleProductList(list) {
        this.setState({
            productList: list
        });
    }

    getTotalPrice(val){
        console.log(val);
    }

    render() {
        return (
            <div className="App">
        <div className="container">
            <div id="main-heading">
              <h1>{this.state.heading}</h1>
              <h3><i>{this.state.subheading}</i></h3>
            </div>
            <div id="company-search">
              <CustomerSearch customerList={this.handleCustomerList.bind(this)} activeCustomer={this.handleActiveCustomer.bind(this)}/>
            </div>
            <div className="client-area">
              <div id="product-selection">
                <h3>Select Advertisements</h3>
                <Products productList={this.handleProductList.bind(this)}/>
              </div>
              <div id="special-deals">
                <h3>Special Deals and Discounts</h3>
                <PricingRules activeCustomer={this.state.activeCustomer} productList={this.state.productList} pricingRules={this.handlePricingRules.bind(this)}/>
              </div>
            </div>
            <div id="checkout-summary">
              <Checkout totalPrice={this.getTotalPrice.bind(this)} activeCustomer={this.state.activeCustomer} productList={this.state.productList} pricingRules={this.state.pricingRules}/>
            </div>
        </div>
      </div>
        );
    }
}

export default App;
