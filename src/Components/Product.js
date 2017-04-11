/*
Product.js

    -Renders table row and data in product selection table
    -Handles buy button click and immediately updates product quantity in parent class (Products.js)

by Tze Wei, 2017
https://github.com/tzeweiwee
*/
import React, { Component } from 'react';

class Product extends Component {
    handleBuyButton(prodName) {
        this.props.buyButton(prodName);
    }
    render() {
        return (
            <tr>
            <td className="product-name">{this.props.prod.name} ad</td>
            <td>{this.props.prod.description}</td>
            <td>${this.props.prod.price}</td>
            <td className="add-button" id={this.props.prod.name}><button type="button" onClick={() => this.handleBuyButton(this.props.prod.name)}>Buy</button></td>
        </tr>
        );
    }
}

export default Product;
