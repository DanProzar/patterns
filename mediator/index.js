"use strict";
class User {
    constructor(name, mediator) {
        this.name = name;
        this.mediator = mediator;
        this.mediator.notify(this, 'subscribe');
    }
    receiveMessage(message) {
        console.log(`Message received by ${this.name}: ${message}`);
    }
    publishMessage(message) {
        this.mediator.notify(this, 'publish', message);
    }
}
class ChatAppMediator {
    constructor() {
        this.users = [];
    }
    notify(sender, event, payload) {
        if (event === 'subscribe') {
            const user = sender;
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
