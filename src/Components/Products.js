/*
Products.js

    -Populate an array of products (ads)
    -Products validate pricing rules
    -Extendable and maintable list of products

by Tze Wei, 2017
https://github.com/tzeweiwee
*/

import React, { Component } from 'react';
import Product from './Product';

function product(name, price, description) {
    this.name = name;
    this.price = price;
    this.description = description;
    this.quantity = 0;
}

class Products extends Component {
    componentWillMount() {
        this.setState({
            productList: [  //initialize products, any new products can be added here
                new product("classic", 269.99, "Offers the most basic level of advertisement"),
                new product("standout", 322.99, "Allows advertisers to use a company logo and use a longer presentation text"),
                new product("premium", 394.99, "Same benefits as Standout Ad, but also puts the advertisement at the top of the results, allowing higher visibility")
            ]
        });

    }

    componentDidMount() {
        this.props.productList(this.state.productList);
    }

    handleBuyButton(productName) {
        let prodList = this.state.productList;
        prodList.forEach(function(prod) {
            if (productName === prod.name) {
                prod.quantity++;
            }
        });

        this.setState({
            productList: prodList
        });
        this.props.productList(this.state.productList);
    }

    handleClear(e) {
        let prodList = this.state.productList;
        prodList.forEach(function(prod) {
            prod.quantity = 0;
        });

        this.setState({
            productList: prodList
        });
        this.props.productList(this.state.productList);
    }

    render() {
        let productAsRows = this.state.productList.map(prod => {
            return (
                <Product key={prod.name} prod={prod} buyButton={this.handleBuyButton.bind(this)} />
            );
        });
        return (
            <div className="Products">
                <div className="product-selection">
                    <table width="100%" id="product-table">
                        <thead>
                            <tr>
                                <th> Product </th>
                                <th> Description </th>
                                <th> Price </th>
                                <th></th>
                            </tr>
                        </thead>
                        <tbody>
                            {productAsRows}
                        </tbody>
                    </table>
                    <button type="button" id="clear-button" onClick={this.handleClear.bind(this)}>Clear</button>
                </div>
            </div>
        );
    }
}

export default Products;
