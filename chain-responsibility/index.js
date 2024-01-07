/**
 * 1. Add product to a card
 * 2. Input your address
 * 3. Select payment method
 * 4. Click order button
 */
var __extends = (this && this.__extends) || (function () {
    var extendStatics = function (d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b) if (Object.prototype.hasOwnProperty.call(b, p)) d[p] = b[p]; };
        return extendStatics(d, b);
    };
    return function (d, b) {
        if (typeof b !== "function" && b !== null)
            throw new TypeError("Class extends value " + String(b) + " is not a constructor or null");
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
var OrderHandler = /** @class */ (function () {
    function OrderHandler() {
        this.successor = null;
    }
    OrderHandler.prototype.setSuccessor = function (successor) {
        this.successor = successor;
        return successor;
    };
    return OrderHandler;
}());
var AddToCartHandler = /** @class */ (function (_super) {
    __extends(AddToCartHandler, _super);
    function AddToCartHandler() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    AddToCartHandler.prototype.handleRequest = function (request) {
        if (request.action === 'add_to_cart') {
            console.log("Adding product " + request.data.productId + " to the cart.");
        }
        else if (this.successor) {
            this.successor.handleRequest(request);
        }
    };
    return AddToCartHandler;
}(OrderHandler));
var ShippingHandler = /** @class */ (function (_super) {
    __extends(ShippingHandler, _super);
    function ShippingHandler() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    ShippingHandler.prototype.handleRequest = function (request) {
        if (request.action === 'input_shipping_address') {
            console.log("Inputting shipping address: " + JSON.stringify(request.data.address));
        }
        else if (this.successor) {
            this.successor.handleRequest(request);
        }
    };
    return ShippingHandler;
}(OrderHandler));
var PaymentHandler = /** @class */ (function (_super) {
    __extends(PaymentHandler, _super);
    function PaymentHandler() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    PaymentHandler.prototype.handleRequest = function (request) {
        if (request.action === 'choose_payment_method') {
            console.log("Choosing payment method: " + request.data.paymentMethod);
        }
        else if (this.successor) {
            this.successor.handleRequest(request);
        }
    };
    return PaymentHandler;
}(OrderHandler));
var ConfirmOrderHandler = /** @class */ (function (_super) {
    __extends(ConfirmOrderHandler, _super);
    function ConfirmOrderHandler() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    ConfirmOrderHandler.prototype.handleRequest = function (request) {
        if (request.action === 'confirm_order') {
            console.log('Order confirmed. Processing...');
            console.log('Order processed successfully!');
        }
        else {
            console.log('Invalid order action.');
        }
    };
    return ConfirmOrderHandler;
}(OrderHandler));
// Usage
var addToCartHandler = new AddToCartHandler();
var shippingHandler = new ShippingHandler();
var paymentHandler = new PaymentHandler();
var confirmOrderHandler = new ConfirmOrderHandler();
addToCartHandler
    .setSuccessor(shippingHandler)
    .setSuccessor(paymentHandler)
    .setSuccessor(confirmOrderHandler);
// Simulating the order process
var orderRequest1 = { action: 'add_to_cart', data: { productId: '12345' } };
var orderRequest2 = { action: 'input_shipping_address', data: { address: '123 Shipping St.' } };
var orderRequest3 = { action: 'choose_payment_method', data: { paymentMethod: 'Credit Card' } };
var orderRequest4 = { action: 'confirm_order' };
var invalidRequest = { action: 'invalid_action' };
addToCartHandler.handleRequest(orderRequest1);
addToCartHandler.handleRequest(orderRequest2);
addToCartHandler.handleRequest(invalidRequest);
addToCartHandler.handleRequest(orderRequest3);
addToCartHandler.handleRequest(orderRequest4);
