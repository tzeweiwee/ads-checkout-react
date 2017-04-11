/*
PricingRules.js

    -Setup deals (numA for numB) e.g. 3 for 2 deals
    -Setup discounts (price per ad) e.g 299.00 per ad
    -Display messages for special clients

by Tze Wei, 2017
https://github.com/tzeweiwee
*/

import React, { Component } from 'react';
import PricingRule from './PricingRule';
class PricingRules extends Component {
    constructor() {
            super();
            this.state = {
                pricingRules: []
            }
        }
        /*
            setDeal method is used for setting *numA for numB* type of deals.
            e.g. setDeal("nike", "classic", 3, 2); <= 3 for 2 deal on classic ads exclusively for nike.
            setDeal(
                client: string: name of the customer/company,
                product: string: name of the product,
                minStock: number: minimum quantity of the product to qualify for the deal,
                offerStock: number: the quantity of product offered given that the minimum quantity is reached
            )
        */
    setDeal(client, product, minStock, offerStock) {
            let productList = this.props.productList;
            try {
                //validate product, whether the product exist or declared in Product.js
                let productMatch = false;
                productList.forEach(function(prod) {
                    if (prod.name === product) {
                        productMatch = true;
                        return;
                    }
                });
                if (productMatch && (typeof(offerStock) === "number" && offerStock > 0)) {
                    if ((typeof(minStock) === "number" || typeof(minStock) === 'undefined') && minStock > 0) {
                        let deal = {
                            type: 0,
                            product: product,
                            offerStock: offerStock,
                            minStock: minStock,
                            customerName: client
                        };
                        let temp = this.state.pricingRules;
                        temp.push(deal);
                        this.setState({
                            pricingRules: temp
                        });
                    } else {
                        throw new Error("setDeal > minStock value is incorrect.")
                    }
                } else {
                    throw new Error("setDeal > quantity offered value is incorrect. OR product not found");
                }

            } catch (e) {
                console.log("ERROR: " + e.message);
            }
        }
        /*
            setDiscount method is used for setting *price per ad* type of deals.
            e.g. setDiscount("nike", 1, "premium", 250.00); <= $250.00 per premium ad purchased exclusively for nike.
            e.g. setDiscount("nike", 2, "standout", 220.00, 3); <= $220.00 per standout ad with minimum purchases of 3 standout ads
            setDiscount(
                client: string: name of the customer/company,
                type: number: 1 OR 2 ONLY. 
                              Type 1 discounts are discounts WITHOUT minimum quantity requirement
                              Type 2 discounts are discounts WITH minimum quantity requirement,
                product: string: name of the product (any),
                price: number: price given to the discounted product
                minStock: number: OPTIONAL: minimum quantity of the product to qualify for the deal,
            )
        */
    setDiscount(client, type, product, price, minStock) {
        let productList = this.props.productList;
        try {
            //validate product, whether the product exist or declared in Product.js
            let productMatch = false;
            productList.forEach(function(prod) {
                if (prod.name === product) {
                    productMatch = true;
                    return;
                }
            });
            if (productMatch && ((type === 1))) {
                if (typeof(price) === "number") {
                    if (typeof(minStock) === "number" || typeof(minStock) === 'undefined') {
                        let deal = {
                            type: type,
                            product: product,
                            price: price,
                            minStock: minStock,
                            customerName: client
                        };
                        let temp = this.state.pricingRules;
                        temp.push(deal);
                        this.setState({
                            pricingRules: temp
                        });
                    } else {
                        throw new Error("setDiscount > minStock value is incorrect.")
                    }
                } else {
                    throw new Error("setDiscount > price value is incorrect.");
                }
            } else {
                throw new Error("setDiscount > type value is incorrect. OR product not found");
            }

        } catch (e) {
            console.log("ERROR: " + e.message);
        }
    }

    componentWillReceiveProps() {

        //setup the discounts once the product list is retrieved from Products component
        if (this.state.pricingRules.length === 0) {
            if (this.props.productList.length > 0) {
                //unilever
                this.setDeal("unilever", "classic", 3, 2);
                //apple
                this.setDiscount("apple", 1, "standout", 299.99, 1);
                //nike
                this.setDiscount("nike", 1, "premium", 379.99, 4);
                //ford
                this.setDeal("ford", "classic", 5, 4);
                this.setDiscount("ford", 1, "standout", 309.99, 1);
                this.setDiscount("ford", 1, "premium", 389.99, 3);

                this.props.pricingRules(this.state.pricingRules);
            }
        }
    }

    // display messages to our special clients based on the pricing rules.
    interpretPricingRule(rule) {
        switch (rule.type) {
            case 0:
                return (": " + rule.minStock + " for " + rule.offerStock + " deal");
            case 1:
                if (rule.minStock === 1) {
                    return (": special price of $" + rule.price + " per " + rule.product + " ad");
                } else {
                    return (": special price of $" + rule.price + " with minimum purchases of " + rule.minStock + " " + rule.product + " ads");
                }
            default:
                return;
        }
    }

    render() {
        let customer = this.props.activeCustomer;
        let welcomeMsg = "";
        var pricingList = [];
        if (customer !== "default") {
            welcomeMsg = "Hello " + customer + ", we have special offers for you!";
            pricingList = this.state.pricingRules.map(rule => {
                if (rule.customerName === customer) {
                    let id = rule.customerName + "-" + rule.product;
                    return (
                        <PricingRule key={id} rule={this.interpretPricingRule(rule)} productname={rule.product}/>
                    );
                }
            });
        }

        return (
            <div className="PricingRules">
                {welcomeMsg}
                <ul>
                    {pricingList}
                </ul>
            </div>
        );
    }
}

export default PricingRules;
