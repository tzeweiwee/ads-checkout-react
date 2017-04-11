/*
CheckoutProduct.js

    -Renders table row and data in the summary table for each product type

by Tze Wei, 2017
https://github.com/tzeweiwee
*/
import React, { Component } from 'react';

class CheckoutProduct extends Component {
    render() {
        let prodName = this.props.prod.name;
        let prodQuantity = this.props.prod.quantity;
        let discountInfo = this.props.discountedProductInfo;
        if (discountInfo.savings !== "") {
            discountInfo.savings = <text className="savings-text">(-${discountInfo.savings})</text>
            discountInfo.fullPrice = <text className="original-price-text">({discountInfo.fullPrice})</text>
        } else {
            discountInfo.fullPrice = (this.props.prod.price * prodQuantity).toFixed(2);
        }
        return (
            <tr>
                <td className="checkout-product">{prodName} Ad x {prodQuantity} {discountInfo.savings} </td>
                <td className="checkout-price">{discountInfo.discountedPrice} ${discountInfo.fullPrice}</td>
            </tr>
        );
    }
}

export default CheckoutProduct;
