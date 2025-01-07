# Observer

<b>Observer</b> (або "Спостерігач") — це поведінковий шаблон проєктування, що забезпечує механізм підписки, дозволяючи одним об’єктам спостерігати за подіями та змінами стану інших об’єктів і відповідно реагувати на них.

Цей шаблон буде корисним, якщо:
  - Після зміни стану одного об’єкта потрібно виконати певні дії в інших об’єктах, але заздалегідь невідомо, які саме об’єкти мають реагувати.
  - Необхідно, щоб об’єкти могли спостерігати за іншими, але лише в конкретних обставинах.

Далі буде продемонстровано приклад використання цього патерну в проєкті на TypeScript.

```ts
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
```

## Переваги
  - Взаємна незалежність: видавці не залежать від конкретних класів підписників, а підписники — від видавців. Це підвищує гнучкість системи.
  - Динамічність: дозволяє додавати або видаляти підписників під час виконання програми, що робить систему більш адаптивною до змін.
  - Слідує принципу відкритості/закритості (Open/Closed Principle), дозволяючи розширювати функціональність без зміни наявного коду.


## Недоліки
  - Випадковий порядок сповіщень: підписники отримують повідомлення в довільній послідовності, що може викликати непередбачуваність у роботі.

Таким чином патерн "Спостерігач" дозволяє видавцю зберігати список посилань на підписників, не знаючи про їхню реалізацію. Ключова особливість — видавець лише надає методи для підписки та відписки, а вся логіка роботи залишається у підписників. Це робить систему гнучкою для обробки подій і змін у реальному часі.