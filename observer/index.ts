interface StockMarketSubject {
	attach(observer: InvestorObserver): void;
	detach(observer: InvestorObserver): void;
	notify(): void;
}

interface InvestorObserver {
	update(stockSymbol: string, price: number): void;
}

class StockMarket implements StockMarketSubject {
	private investors: InvestorObserver[] = [];
	private stockPrices: Map<string, number> = new Map();

	attach(observer: InvestorObserver): void {
		this.investors.push(observer);
		console.log(`\nInvestor subscribed for updates.`);
	}

	detach(observer: InvestorObserver): void {
		const index = this.investors.indexOf(observer);
		if (index !== -1) {
			this.investors.splice(index, 1);
			console.log(`\nInvestor unsubscribed.`);
		}
	}

	notify(): void {
		console.log(`Notifying ${this.investors.length} investors...`);
		for (const [stockSymbol, price] of this.stockPrices.entries()) {
			for (const investor of this.investors) {
				investor.update(stockSymbol, price);
			}
		}
	}

	updateStockPrice(stockSymbol: string, price: number): void {
		this.stockPrices.set(stockSymbol, price);
		console.log(`\nStock updated: ${stockSymbol} - $${price}`);
		this.notify();
	}
}

class Investor implements InvestorObserver {
	private name: string;

	constructor(name: string) {
		this.name = name;
	}

	update(stockSymbol: string, price: number): void {
		console.log(`${this.name} notified: Stock ${stockSymbol} is now $${price}`);
		if (price > 100) {
			console.log(`\n${this.name} is considering selling ${stockSymbol}.`);
		} else {
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