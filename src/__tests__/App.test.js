/*
App.test.js

    -Unit testing the checkout system. 
    -tested all of the example scenarios

by Tze Wei, 2017
https://github.com/tzeweiwee
*/

import React from 'react';
import { shallow, mount } from 'enzyme';
import Checkout from '../Components/Checkout';

describe("Total price tests for customers", () => {
    function product(name, price, quantity) {
        this.name = name;
        this.price = price;
        this.quantity = 0;
    }

    function deal(client, product, minStock, offerStock) {
        this.type = 0;
        this.product = product;
        this.offerStock = offerStock;
        this.minStock = minStock;
        this.customerName = client;
    }

    function discount(client, product, price, minStock) {
        this.type = 1;
        this.product = product;
        this.price = price;
        this.minStock = minStock;
        this.customerName = client;
    }

    //you can easily add more rules here.
    let pricingRules = [
        new deal("unilever", "classic", 3, 2),
        new discount("apple", "standout", 299.99, 1),
        new discount("nike", "premium", 379.99, 4),
        new deal("ford", "classic", 5, 4),
        new discount("ford", "standout", 309.99, 1),
        new discount("ford", "premium", 389.99, 3)
    ];
    let productList = [ //initialize products, any new products can be added here
        new product("classic", 269.99),
        new product("standout", 322.99),
        new product("premium", 394.99)
    ]

    let totalPrice;
    beforeEach(() => {
    	productList.forEach(prod => {
    		prod.quantity = 0;
    	});
    	totalPrice = jest.fn();
    });

    it('default: 1 classic 1 standout 1 premium $987.97', () => {
    	let emptyList = [];
    	productList.forEach(prod => {prod.quantity = 1;});
        const checkout = mount(
            <Checkout totalPrice={totalPrice} activeCustomer="default" productList={productList} pricingRules={emptyList} />
        );

        expect(totalPrice).toBeCalledWith(987.97);

    });

    it('unilever: 3 classic 1 premium $934.97', () => {
    	productList[0].quantity = 3;
    	productList[2].quantity = 1;
        const checkout = mount(
            <Checkout totalPrice={totalPrice} activeCustomer="unilever" productList={productList} pricingRules={pricingRules} />
        );

        expect(totalPrice).toBeCalledWith(934.97);

    });

    it('apple: 3 standout 1 premium $1294.96', () => {
    	productList[1].quantity = 3;
    	productList[2].quantity = 1;
        const checkout = mount(
            <Checkout totalPrice={totalPrice} activeCustomer="apple" productList={productList} pricingRules={pricingRules} />
        );

        expect(totalPrice).toBeCalledWith(1294.96);

    });

    it('nike: 4 premium $1519.96', () => {
    	productList[2].quantity = 4;
        const checkout = mount(
            <Checkout totalPrice={totalPrice} activeCustomer="nike" productList={productList} pricingRules={pricingRules} />
        );

        expect(totalPrice).toBeCalledWith(1519.96);

    });

    it('ford: 6 classic 2 standout 2 premium $2759.91', () => {
    	productList[0].quantity = 6;
    	productList[1].quantity = 2;
    	productList[2].quantity = 2;
        const checkout = mount(
            <Checkout totalPrice={totalPrice} activeCustomer="ford" productList={productList} pricingRules={pricingRules} />
        );

        expect(totalPrice).toBeCalledWith(2759.91);

    });
});
