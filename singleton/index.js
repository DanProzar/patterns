"use strict";
// Клас конфігурації, що містить назву бази даних
class Config {
    constructor() {
        this.dbName = 'db1';
    }
    // Публічни статичний метод Singleton класу, що повертає єдиний його екземпляр
    static getConfig() {
        if (!Config.config) {
            Config.config = new Config();
        }
        return Config.config;
    }
    getDBName() {
        return this.dbName;
    }
    setDBName(name) {
        this.dbName = name;
    }
}
// CRUD Database Singleton клас,
// який зберігає записи про продукт і має методи маніпулювання ними
class Database {
    // Приватний конструктор, що використовується нижче в публічному
    // статичному класі, що отримує єдиний екземпляр класу
    constructor(name) {
        this.records = new Map();
        this.name = name;
    }
    static getInstance(dbName) {
        if (!Database.db) {
            Database.db = new Database(dbName);
        }
        return Database.db;
    }
    // Загальні методи для маніпулювання продуктом (створення, редагування, перегляд, видалення)
    createaProduct(product) {
        if (!product) {
            console.log('The product is undefined!');
            return null;
        }
        Database.db.records.set(product.id, product);
        return true;
    }
    updateProduct(id, data) {
        if (!id) {
            console.log('The id product is undefined!');
            return null;
        }
        if (!Database.db.records.has(id)) {
            console.log(`There is no product with such id (${id})`);
            return null;
        }
        Database.db.records.set(id, Object.assign(Object.assign({}, Database.db.records.get(id)), data));
        return true;
    }
    deleteProduct(id) {
        if (!id) {
            console.log('The product id is undefined!');
        }
        if (!Database.db.records.has(id)) {
            console.log('The product is not listed in db records!');
            return null;
        }
        return Database.db.records.delete(id);
    }
    getProduct(id) {
        if (!id) {
            console.log('The product id is undefined!');
            return null;
        }
        return Database.db.records.get(id);
    }
}
// Cart Singleton клас, що додає продукти до бази даних,
// використовуючи базу даних, та її назву з класу конфігурації
class Cart {
    constructor() {
        this.config = Config.getConfig();
        this.db = Database.getInstance(this.config.getDBName());
    }
    static getCart() {
        if (!Cart.cart) {
            Cart.cart = new Cart();
        }
        return Cart.cart;
    }
    // Отримання всіх продуктів з бази даних
    getProducts() {
        return this.db.records;
    }
    // Методи для маніпулювання продуктами
    addProduct(product) {
        if (this.db.createaProduct(product)) {
            console.log('The product has been added to the cart');
        }
    }
    removeProduct(id) {
        if (this.db.deleteProduct(id)) {
            console.log('The product has been removed from cart');
        }
    }
    updateProduct(id, data) {
        if (this.db.updateProduct(id, data)) {
            console.log('The product has been udpated!');
        }
    }
}
// Отримуємо екземпляр класу Cart
const cart = Cart.getCart();
// Виконуємо маніпуляції з продуктами
cart.addProduct({
    id: 111,
    name: 'Shirt',
    data: {
        size: 'M',
    },
    qty: 1,
});
cart.addProduct({
    id: 112,
    name: 'T-Shirt',
    data: {
        size: 'L',
        price: 2.5
    },
    qty: 2,
});
cart.removeProduct(111);
cart.updateProduct(112, { qty: 9, name: 'Top' });
console.log(cart.getProducts());
// Map(1) {
//   112 => { id: 112, name: 'Top', data: { size: 'L', price: 2.5 }, qty: 9 }
// }
