/*
PricingRule.js

    -Renders a list of rules for special clients to see

by Tze Wei, 2017
https://github.com/tzeweiwee
*/

import React, { Component } from 'react';

class PricingRule extends Component {
    render() {
        return (
            <li className="PricingRule">
            	<label className="capitalize">{this.props.productname}</label>
            	{this.props.rule}
      		</li>
        );
    }
}

export default PricingRule;
