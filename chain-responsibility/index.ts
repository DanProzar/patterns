/**
 * 1. Add product to a card
 * 2. Input your address
 * 3. Select payment method
 * 4. Click order button
 */

interface OrderRequest {
  action: string;
  data?: any;
}

abstract class OrderHandler {
  protected successor: OrderHandler | null = null;

  public setSuccessor(successor: OrderHandler): OrderHandler {
    this.successor = successor;
    return successor;
  }

  public abstract handleRequest(request: OrderRequest): void;
}

class AddToCartHandler extends OrderHandler {
  public handleRequest(request: OrderRequest): void {
    if (request.action === 'add_to_cart') {
      console.log(`Adding product ${request.data.productId} to the cart.`);
    } else if (this.successor) {
      this.successor.handleRequest(request);
    }
  }
}

class ShippingHandler extends OrderHandler {
  public handleRequest(request: OrderRequest): void {
    if (request.action === 'input_shipping_address') {
      console.log(`Inputting shipping address: ${JSON.stringify(request.data.address)}`);
    } else if (this.successor) {
      this.successor.handleRequest(request);
    }
  }
}

class PaymentHandler extends OrderHandler {
  public handleRequest(request: OrderRequest): void {
    if (request.action === 'choose_payment_method') {
      console.log(`Choosing payment method: ${request.data.paymentMethod}`);
    } else if (this.successor) {
      this.successor.handleRequest(request);
    }
  }
}

class ConfirmOrderHandler extends OrderHandler {
  public handleRequest(request: OrderRequest): void {
    if (request.action === 'confirm_order') {
      console.log('Order confirmed. Processing...');
      console.log('Order processed successfully!');
    } else {
      console.log('Invalid order action.');
    }
  }
}

// Usage
const addToCartHandler = new AddToCartHandler();
const shippingHandler = new ShippingHandler();
const paymentHandler = new PaymentHandler();
const confirmOrderHandler = new ConfirmOrderHandler();

addToCartHandler
  .setSuccessor(shippingHandler)
  .setSuccessor(paymentHandler)
  .setSuccessor(confirmOrderHandler);

// Simulating the order process
const orderRequest1: OrderRequest = { action: 'add_to_cart', data: { productId: '12345' } };
const orderRequest2: OrderRequest = { action: 'input_shipping_address', data: { address: '123 Shipping St.' } };
const orderRequest3: OrderRequest = { action: 'choose_payment_method', data: { paymentMethod: 'Credit Card' } };
const orderRequest4: OrderRequest = { action: 'confirm_order' };
const invalidRequest: OrderRequest = { action: 'invalid_action' };

addToCartHandler.handleRequest(orderRequest1);
addToCartHandler.handleRequest(orderRequest2);
addToCartHandler.handleRequest(invalidRequest);
addToCartHandler.handleRequest(orderRequest3);
addToCartHandler.handleRequest(orderRequest4);
