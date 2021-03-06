# Hi
This is how it looks
![mainscreenshot](https://github.com/tzeweiwee/ads-checkout-react/blob/master/images/main_screenshot.PNG "Screenshot")
## Let's get started
To run the project, simply
```
$ npm install
```
```
$ npm start
```
## Implementation
*tech used: React.js HTML CSS Jest Enzyme* <br>
The system is a single page application, made using React JS. <br>
The focus leans toward the back-end implementation rather than the front-end since I do not believe I have enough knowledge and creativity develop my own CSS to create a beautiful UI. However, I have attempted to 'beautify' the UI with App.css. <br>
There are 10 React Components. 
I have separated the matter of concerns into many different components. This allows the code to be more maintable and readable.<br>
1. Checkout
2. CheckoutProduct
3. Customer
4. Customers
5. CustomerSearch
6. PricingRule
7. PricingRules
8. Product
9. Products
10. App

## Back-end features
**Extendable**: I have allowed the Products and Customers components to easily extend the number of customers and products.

**Validation**: Priviledged customer's pricing rules can be validated against the list of declared products and customers.

**Flexibility**: I have noticed in the document that there may be a trend in deals and discounts for each type of product. "classic ad" usually have 3 for 2 deals/ numA for numB type of deals while "standout ad" have discounted price per ad purchased and "premium ad" have discounted price if the client buys more than a certain quantity. <br> In my solution, I have allowed ANY type of product to have ANY kind of deal or discount. E.g "classic ad" costs $250.00 when 3 or more are purchased. Please read below for setting up pricing rules.

## Front-end features
**UI**: As single page application, the page never refreshes and the UI components will be updated instantly upon changes. Clients can search or simply select their name from the list.

**Deals & Discounts Message**: The pricing rules are interpreted and converted into a message to remind priviledged clients of their special pricing.

**Savings**: This may be unnecessary but if I'm the client, I would find knowing how much I save when I apply the the deals or discounts extremely helpful. Savings shown in the summary table and when the priviledged clients apply deals or discounts to their desired products.

## Setting up pricing rules
There are 2 types of rules. One is a deal, the other is a discount.
In PricingRules.js,
```
setDeal(client, product, minStock, offerStock)
```
**client**: string: name of the customer/company <br>
**product**: string: name of the product<br>
**minStock**: number: minimum quantity of the product to qualify for the deal<br>
**offerStock**: number: the quantity of product offered given that the minimum quantity is reached
```
setDiscount(client, product, price, minStock)
```
**client**: string: name of the customer/company <br>
**product**: string: name of the product (any) <br>
**price**: number: price given to the discounted product <br>
**minStock**: number: minimum quantity of the product to qualify for the deal

## Unit Tests
As mentioned to Mr Jerome, I have never done unit testing before. For this project, I've utilised Jest and Enzyme to unit test the total price from pricing rules. You can see the results below.
It took awhile for me to learn about unit tests so I could only unit tests the most important part of the system which is the total price.<br> 
Just run this in the console to checkout the test results: 
```
$ npm test
```
![testresults](https://github.com/tzeweiwee/ads-checkout-react/blob/master/images/test_data.PNG "Test Results (src\__tests__\App.test.js)")

> ## Thank You <br>
I have given my best effort to this project. I hope I have achieved at least the minimum requirements or expectations of the assessment test. And I chose React because this is an opportunity for me to learn more about React's architecture, virtual DOM and it's lifecycle. Btw, you can check the time I've spent on this project [See My Wakatime](https://wakatime.com/@tzeweiwee/projects/lquatgtuis?start=2017-04-07&end=2017-04-13). I look forward to hearing from GDP again. Thank you and have a good day. :bowtie:


