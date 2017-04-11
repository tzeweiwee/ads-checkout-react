/*
Checkout.js

    -Calculate final pricing (discounted price and full price)
    -Let special clients know how much they can save (savings)

by Tze Wei, 2017
https://github.com/tzeweiwee
*/

import React, { Component } from 'react';
import CheckoutProduct from './CheckoutProduct';
class Checkout extends Component {
    getDeal(rule, prod) {
        let info = {
            savings: "",
            fullPrice: "",
            discountedPrice: ""
        };

        let inclusiveStock = prod.quantity;
        let exclusiveStock = prod.quantity % rule.minStock;
        let discountedProductsAmt;
        if (exclusiveStock > 0) {
            inclusiveStock = prod.quantity - exclusiveStock;
        }
        discountedProductsAmt = (inclusiveStock * rule.offerStock) / rule.minStock;
        //savings
        info.savings = ((inclusiveStock - discountedProductsAmt) * prod.price).toFixed(2);
        //full price
        info.fullPrice = (prod.quantity * prod.price).toFixed(2);
        //discounted price
        info.discountedPrice = (info.fullPrice - info.savings).toFixed(2);

        return info;
    }

    getDiscount(rule, prod) {
        let info = {
            savings: "",
            fullPrice: "",
            discountedPrice: ""
        };
        if (prod.quantity >= rule.minStock) {
            info.fullPrice = (prod.quantity * prod.price).toFixed(2);
            info.savings = (prod.quantity * (prod.price - rule.price)).toFixed(2);
            info.discountedPrice = (info.fullPrice - info.savings).toFixed(2);
        } else {
            return 0;
        }

        return info;
    }

    render() {
        let totalPrice = 0;
        let pricingRules = this.props.pricingRules;
        let productList = this.props.productList;
        let activeCustomer = this.props.activeCustomer;

        //each product has a table row 
        let productRows = productList.map(prod => {
            if (prod.quantity > 0) {
                let discountedProductInfo = {
                    savings: "",
                    fullPrice: "",
                    discountedPrice: ""
                };
                if (activeCustomer !== 'default') {
                    //check each rule if the client matches and the rule matches the current product
                    let hasDiscount = false;
                    pricingRules.forEach(rule => {
                        if ((activeCustomer === rule.customerName) && (rule.product === prod.name)) {
                            if (prod.quantity >= rule.minStock) {
                                switch (rule.type) {
                                    case 0:
                                        discountedProductInfo = this.getDeal(rule, prod);
                                        totalPrice += parseFloat(discountedProductInfo.discountedPrice);
                                        break;
                                    case 1:
                                        discountedProductInfo = this.getDiscount(rule, prod);
                                        if (discountedProductInfo === 0) {
                                            totalPrice += (prod.price * prod.quantity);
                                        } else {
                                            totalPrice += parseFloat(discountedProductInfo.discountedPrice);
                                        }
                                        break;
                                    default:
                                }
                                hasDiscount = true;
                            }
                        }
                    });
                    if(!hasDiscount){
                        totalPrice += (prod.price * prod.quantity);
                    }

                } else {
                    totalPrice += (prod.price * prod.quantity);
                }
                return (
                    <CheckoutProduct key={prod.name} prod={prod} discountedProductInfo={discountedProductInfo}/>
                );
            }
        });
        return (
            <div className="Checkout">
                <h3>Summary</h3>
                <hr/>
                <table id="checkout-table" width="100%">
                    <thead></thead>
                    <tbody>
                        {productRows}
                    </tbody>
                </table>
                <hr />
                <p id="checkout-total">Total: ${totalPrice.toFixed(2)}</p>
            </div>
        );
    }
}

export default Checkout;
