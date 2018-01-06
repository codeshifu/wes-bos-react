import React from 'react';
import {formatPrice} from "../helpers";

class Order extends React.Component {
    constructor(props) {
        super(props);
        this.renderOrder = this
            .renderOrder
            .bind(this);
    }

    renderOrder (key) {
        const fish = this.props.fishes[key];
        const count = this.props.order[key];

        // remove order button
        const removeButton = <button onClick={() => this.props.removeOrder(key)}>⚔️</button>

        if (!fish || fish.status === 'unavailable')
            return <li key={key}>Sorry {fish ? fish.name : 'fish'} is no longer available {removeButton}</li>

        return (
            <li key={key}>
                <span>{count}lbs {fish.name} {removeButton}</span>
                <span className="price">{formatPrice(count * fish.price)}</span>
            </li>
        )
    }

    render() {
        const orderIds = Object.keys(this.props.order);

        const total = orderIds.reduce((prevTotal, key) => {
            let fish = this.props.fishes[key];
            let orderCount = this.props.order[key];
            let isAvailable = fish && fish.status === "available";
            if (isAvailable) 
                return prevTotal + (orderCount * fish.price || 0);
            
            return prevTotal;
        }, 0);

        return (
            <div className="order-wrap">
                <h2>Your Orders</h2>
                <ul className="order">
                    {orderIds.map(key => this.renderOrder(key))}
                    <li className="total">
                        <strong>Total</strong>
                        {formatPrice(total)}
                    </li>
                </ul>
            </div>
        )
    }
}

Order.propTypes = {
    fishes: React.PropTypes.object.isRequired,
    order: React.PropTypes.object.isRequired,
    removeOrder: React.PropTypes.func.isRequired
}

export default Order;