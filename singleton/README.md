# Singleton pattern

<b>Singleton</b> (або Одинак) - це патерн програмування, основною ціллю якого, є надання "глобальної точки доступу" до єдиного екземпляру класа. Патерн гарантує що екземпляр класу є єдиним, зазвичай роблячи його конструктор приватним, маючи статичне приватне поле єдиного екземляру, та статичний метод, через який цей екземпляр повертається. Через те що патерн вирішує 2 проблеми одночасно, він
цим самим порушує перший принцип SOLID - single responsibility.

Зазвичай патерн використовується у наступних випадках
- коли в програмі повинен бути єдиний екземпляр якого-небудь класу, доступний усім клієнтам (наприклад, конфігурація проекту з різних частин програми).
- коли розробник хоче мати більше контролю над глобальними змінними

## Переваги використання Singleton
- надає та гарантує наявність єдиного екземпляра класу та глобальну точку до нього.
- реалізує відкладену ініціалізацію об’єкта-одинака.
- легкий в імплементації

## Недоліки використання Singleton

- обмежує гнучкість - тоді як в нас є лише один екземпляр класу, може бути складно додавати зміни до його роботи
- порушує принцип єдиного обов’язку класу (S в SOLID)
- проблеми з впровадженням залежностей (dependency injection): патерн може ускладнити тестування фреймворків, що
  використовують впроваждення залежностей

## Приклад використання патерну Singleton.

```ts
// Інтерфейс продукту
interface Product {
  id: number
  name: string
  data: any
  qty: number
}

// Клас конфігурації, що містить назву бази даних
class Config {
  public static config: Config
  private dbName: string

  constructor () {
    this.dbName = 'db1'
  }

  // Публічни статичний метод Singleton класу, що повертає єдиний його екземпляр
  public static getConfig (): Config {
    if (!Config.config) {
      Config.config = new Config()
    }

    return Config.config
  }

  public getDBName () {
    return this.dbName
  }

  public setDBName (name: string) {
    this.dbName = name
  }
}

// CRUD Database Singleton клас,
// який зберігає записи про продукт і має методи маніпулювання ними
class Database {
  private static db: Database

  public readonly name: string
  public records: Map<number, Product>

  // Приватний конструктор, що використовується нижче в публічному
  // статичному класі, що отримує єдиний екземпляр класу
  private constructor (name: string) {
    this.records = new Map()
    this.name = name
  }

  public static getInstance (dbName: string): Database {
    if (!Database.db) {
      Database.db = new Database(dbName)
    }

    return Database.db
  }

  // Загальні методи для маніпулювання продуктом (створення, редагування, перегляд, видалення)
  public createaProduct (product: Product) {
    if (!product) {
      console.log('The product is undefined!')
      return null
    }
    
    Database.db.records.set(product.id, product)

    return true
  }

  public updateProduct (id: number, data: Partial<Product>) {
    if (!id) {
      console.log('The id product is undefined!')
      return null
    }

    if (!Database.db.records.has(id)) {
      console.log(`There is no product with such id (${id})`)
      return null
    }

    Database.db.records.set(id, {
      ...Database.db.records.get(id)!,
      ...data,
    })
    
    return true
  }

  public deleteProduct (id: Product['id']) {
    if (!id) {
      console.log('The product id is undefined!')
    }

    if (!Database.db.records.has(id)) {
      console.log('The product is not listed in db records!')
      return null
    }

    return Database.db.records.delete(id)
  }

  public getProduct (id: Product['id']) {
    if (!id) {
      console.log('The product id is undefined!')
      return null
    }

    return Database.db.records.get(id)
  }
}

// Cart Singleton клас, що додає продукти до бази даних,
// використовуючи базу даних, та її назву з класу конфігурації
class Cart {
  private static cart: Cart
  private db: Database
  private config: Config

  private constructor () {
    this.config = Config.getConfig()
    this.db = Database.getInstance(this.config.getDBName())
  }

  public static getCart (): Cart {
    if (!Cart.cart) {
      Cart.cart = new Cart()
    }

    return Cart.cart
  }

  // Отримання всіх продуктів з бази даних
  public getProducts (): Map<number, Product> {
    return this.db.records
  }

  // Методи для маніпулювання продуктами
  public addProduct (product: Product) {
    if (this.db.createaProduct(product)) {
      console.log('The product has been added to the cart')
    }
  }

  public removeProduct (id: Product['id']) {
    if (this.db.deleteProduct(id)) {
      console.log('The product has been removed from cart')
    }
  }

  public updateProduct (id: number, data: Partial<Product>) {
    if (this.db.updateProduct(id, data)) {
      console.log('The product has been udpated!')
    }
  }
}

// Отримуємо екземпляр класу Cart
const cart = Cart.getCart()

// Виконуємо маніпуляції з продуктами
cart.addProduct({
  id: 111,
  name: 'Shirt',
  data: {
    size: 'M',
  },
  qty: 1,
})

cart.addProduct({
  id: 112,
  name: 'T-Shirt',
  data: {
    size: 'L',
    price: 2.5
  },
  qty: 2,
})

cart.removeProduct(111)
cart.updateProduct(112, { qty: 9, name: 'Top' })

console.log(cart.getProducts())

// Map(1) {
//   112 => { id: 112, name: 'Top', data: { size: 'L', price: 2.5 }, qty: 9 }
// }

```
