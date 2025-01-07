"use strict";
class StockMarket {
    constructor() {
        this.investors = [];
        this.stockPrices = new Map();
    }
    attach(observer) {
        this.investors.push(observer);
        console.log(`\nInvestor subscribed for updates.`);
    }
    detach(observer) {
        const index = this.investors.indexOf(observer);
        if (index !== -1) {
            this.investors.splice(index, 1);
            console.log(`\nInvestor unsubscribed.`);
        }
    }
    notify() {
        console.log(`Notifying ${this.investors.length} investors...`);
        for (const [stockSymbol, price] of this.stockPrices.entries()) {
            for (const investor of this.investors) {
                investor.update(stockSymbol, price);
            }
        }
    }
    updateStockPrice(stockSymbol, price) {
        this.stockPrices.set(stockSymbol, price);
        console.log(`\nStock updated: ${stockSymbol} - $${price}`);
        this.notify();
    }
}
class Investor {
    constructor(name) {
        this.name = name;
    }
    update(stockSymbol, price) {
        console.log(`${this.name} notified: Stock ${stockSymbol} is now $${price}`);
        if (price > 100) {
            console.log(`\n${this.name} is considering selling ${stockSymbol}.`);
        }
        else {
            console.log(`\n${this.name} is considering buying ${stockSymbol}.`);
        }
    }
}
const stockMarket = new StockMarket();
const investor1 = new Investor("Alice");
const investor2 = new Investor("Bob");
stockMarket.attach(investor1);
stockMarket.attach(investor2);
stockMarket.updateStockPrice("AAPL", 120);
stockMarket.updateStockPrice("GOOGL", 90);
stockMarket.detach(investor1);
stockMarket.updateStockPrice("TSLA", 150);
