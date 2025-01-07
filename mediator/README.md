# Mediator

<b>Mediator</b> (або "Посередник") — це поведінковий патерн проектування, що дає змогу зменшити зв’язаність великої кількості класів між собою, завдяки переміщенню цих зв’язків до одного класу-посередника.

Цей шаблон буде корисним, якщо:
	-	складно змінювати деякі класи через те, що вони мають величезну кількість хаотичних зв’язків з іншими класами.
	-	немає можливості повторно використовувати клас, оскільки він залежить від безлічі інших класів.
	- доводиться створювати багато підкласів компонентів, щоб використовувати одні й ті самі компоненти в різних контекстах.

Далі буде продемонстровано приклад використання цього патерну в проєкті на TypeScript.

```ts
interface Mediator {
	notify(sender: object, event: string, payload?: string): void;
}

class User {
	constructor(public name: string, private mediator: Mediator) {
		this.mediator.notify(this, 'subscribe');
	}

	receiveMessage(message: string) {
		console.log(`Message received by ${this.name}: ${message}`);
	}

	publishMessage(message: string) {
		this.mediator.notify(this, 'publish', message);
	}
}

class ChatAppMediator implements Mediator {
	private users: User[] = [];

	public notify(sender: object, event: string, payload?: string): void {
		if (event === 'subscribe') {
			const user = sender as User;
			console.log(`Subscribing ${user.name}`);
			this.users.push(user);
		}

		if (event === 'publish' && payload) {
			console.log(`Publishing message "${payload}" to the group`);
			const usersExcludingSender = this.users.filter(u => u !== sender);
			for (const user of usersExcludingSender) {
				user.receiveMessage(payload);
			}
		}
	}
}

const chatAppMediator = new ChatAppMediator();
const user1 = new User('John', chatAppMediator);
const user2 = new User('Mary', chatAppMediator);
const user3 = new User('Nick', chatAppMediator);

user1.publishMessage('Hi');
user2.publishMessage('Hola');
user3.publishMessage('Hallo');
```

## Переваги
  - Усуває залежності між компонентами, дозволяючи використовувати їх повторно.
	- Спрощує взаємодію між компонентами.
	- Централізує керування в одному місці.


## Недоліки
  - Посередник може сильно «роздутися».

Таким чином патерн Посередник змушує об’єкти спілкуватися через окремий об’єкт-посередник, який знає, кому потрібно перенаправити той або інший запит. Завдяки цьому компоненти системи залежатимуть тільки від посередника, а не від десятків інших компонентів.