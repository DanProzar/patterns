var HeadPhonesProduct = /** @class */ (function () {
    function HeadPhonesProduct(brand, model, isWireless, weight, price) {
        this.brand = brand;
        this.model = model;
        this.isWireless = isWireless;
        this.weight = weight;
        this.price = price;
    }
    HeadPhonesProduct.prototype.accept = function (visitor) {
        return visitor.visitHeadPhones(this);
    };
    return HeadPhonesProduct;
}());
var WashingMachineProduct = /** @class */ (function () {
    function WashingMachineProduct(brand, model, isIndustrial, weight, price) {
        this.brand = brand;
        this.model = model;
        this.isIndustrial = isIndustrial;
        this.weight = weight;
        this.price = price;
    }
    WashingMachineProduct.prototype.accept = function (visitor) {
        return visitor.visitWashingMachine(this);
    };
    return WashingMachineProduct;
}());
var TVProduct = /** @class */ (function () {
    function TVProduct(brand, model, inches, os, price) {
        this.brand = brand;
        this.model = model;
        this.inches = inches;
        this.os = os;
        this.price = price;
    }
    TVProduct.prototype.accept = function (visitor) {
        return visitor.visitTV(this);
    };
    return TVProduct;
}());
var CLASS_A_SHIPPING_COST_MULTIPLIER = 10;
var CLASS_B_SHIPPING_COST_MULTIPLIER = 0.005;
var CLASS_C_SHIPPING_COST_MULTIPLIER = 25;
var INDUSTRIAL_EXTRA_SHIPPING_COST = 200;
var STANDARD_EXTRA_SHIPPING_COST = 20;
var WEBOS_EXTRA_SHIPPING_COST = 20;
var APPLE_EXTRA_SHIPPING_COST = 100;
var APPLE_BRAND_NAME = 'Apple';
var WEBOS_OS_NAME = 'webOS';
var ShippingCostCalculatorVisitor = /** @class */ (function () {
    function ShippingCostCalculatorVisitor() {
    }
    ShippingCostCalculatorVisitor.prototype.visitHeadPhones = function (headphones) {
        var shippingCost = headphones.weight * CLASS_A_SHIPPING_COST_MULTIPLIER;
        if (headphones.brand === APPLE_BRAND_NAME) {
            return shippingCost + APPLE_EXTRA_SHIPPING_COST;
        }
        return shippingCost;
    };
    ShippingCostCalculatorVisitor.prototype.visitWashingMachine = function (washingMachine) {
        var shippingCost = washingMachine.weight * CLASS_B_SHIPPING_COST_MULTIPLIER;
        if (washingMachine.isIndustrial) {
            return shippingCost + INDUSTRIAL_EXTRA_SHIPPING_COST;
        }
        return shippingCost + STANDARD_EXTRA_SHIPPING_COST;
    };
    ShippingCostCalculatorVisitor.prototype.visitTV = function (tv) {
        var shippingCost = tv.inches * CLASS_C_SHIPPING_COST_MULTIPLIER;
        if (tv.os === WEBOS_OS_NAME) {
            return shippingCost + WEBOS_EXTRA_SHIPPING_COST;
        }
        return shippingCost;
    };
    return ShippingCostCalculatorVisitor;
}());
var RECYCLABLE_ELECTRONIC_PRODUCT_SPECIAL_TAX = 25;
var VAT = 0.21;
var TaxCalculatorVisitor = /** @class */ (function () {
    function TaxCalculatorVisitor() {
    }
    TaxCalculatorVisitor.prototype.visitHeadPhones = function (headphones) {
        return headphones.price * VAT;
    };
    TaxCalculatorVisitor.prototype.visitWashingMachine = function (washingMachine) {
        return washingMachine.price * VAT +
            RECYCLABLE_ELECTRONIC_PRODUCT_SPECIAL_TAX;
    };
    TaxCalculatorVisitor.prototype.visitTV = function (tv) {
        return tv.price * VAT;
    };
    return TaxCalculatorVisitor;
}());
function calculateCosts(products, visitor) {
    return products.reduce(function (acc, curr) { return (acc + curr.accept(visitor)); }, 0);
}
var products = [
    new HeadPhonesProduct('Apple', 'Airpods', true, 50, 200),
    new WashingMachineProduct('Balay', 'C', false, 30000, 950),
    new TVProduct('LG', 'RW330', 65, 'WebOS', 350),
];
var shippingCostCalculator = new ShippingCostCalculatorVisitor();
var shippingCosts = calculateCosts(products, shippingCostCalculator);
console.log("Total shipping costs are ".concat(shippingCosts));
var taxesCalculator = new TaxCalculatorVisitor();
var taxes = calculateCosts(products, taxesCalculator);
console.log("Total taxes are ".concat(taxes));
