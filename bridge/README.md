# Bridge Pattern

<b>Bridge</b> - це патерн в програмуванні, що розділяє один або кілька класів на 2 окремі ієрархії - абстракцію та реалізацію.
Цим самим дозволяючи змінювати поведінку кожного класу незалежно від іншого.

Нехай ми захочемо розвивати наш клас у 2-х різних незалежних площинах, наприклад комп'ютер за типом (ігровий та для інтернету) та кольором (чорний та білий). Можна вдатись до спадкування, але тоді кількість дочірніх класів буде збільшуватись в рази, при додаванні додаткових типів або/та кольорів. Патерн пропонує замінити спадкування на делегування. Для цього необхідно винести одну з площин в окрему ієрархію (в прикладі нижче - це колір), та далі посилатися на об'єкт цієї ієрархії замість створення додаткових класів.

## Переваги
  - надає можливість створювати платформно-незалежні програми
  - передбачає менше рефакторингу в майбутньому, так як кількість класів буде збільшуватись незначною мірою
  - реалізує принцип відкритості/закритості
  - приховує зайві деталі реалізації від клієнтського коду

## Недоліки
  - може ускладнити код програми внаслідок введення додаткових класів

## Приклад використання патерну Bridge

```ts
// Оголашення базової властивості Колір
class Color {
  public name: string

  public constructor(name: string) {
    this.name = name
  }

  public getColor() {
    return this.name
  }
}

// Огололення підкласу ЧорнийКолір, що позначає собою чорний колір
class BlackColor extends Color {
  public constructor() {
    super('black')
  }
}

// Огололення підкласу БілийКолір, що позначає собою білий колір
class WhiteColor extends Color {
  public constructor() {
    super('white')
  }
}

// Оголошення класу комп'ютер, що містить в собі посилання на об'єкт кольору,
// тим самим розділяючи абстракцію та реалізацію, не створюючи нових підкласів.

class Computer {
  public type!: string
  public color: Color

  public constructor(color: Color) {
    this.color = color
  }

  // Оголошення методу, що виводить кількість кадрів за секунду в рендеренгу відео-ігор
  public provideFramerate(fps?: number): string {
    const color = this.color.getColor()
    const capitalizedColor = color.charAt(0).toUpperCase() + color.slice(1)
  
    return `${capitalizedColor} ${this.type || ''} computer providing ${fps || 0}FPS`
  }
}

// Огололення класу GamingComputer, що наслідує клас Комп'ютер,
// та перезаписує метод provideFramerate з показником fps
class GamingComputer extends Computer {
  public type = 'gaming'

  public provideFramerate(): string {
    return super.provideFramerate(144)
  }
}

class SurfingComputer extends Computer {
  public type = 'surfing'

  public provideFramerate(): string {
    return super.provideFramerate(35)
  }
}

// Створюємо різні екземпляри класів, з усіма можливими варіаціями кольору та типів комп'ютерів
const computer1 = new SurfingComputer(new WhiteColor())
const computer2 = new SurfingComputer(new BlackColor())
const computer3 = new GamingComputer(new WhiteColor())
const computer4 = new GamingComputer(new BlackColor())

// Виводимо результат
console.log(computer1.provideFramerate())
console.log(computer2.provideFramerate())

console.log(computer3.provideFramerate())
console.log(computer4.provideFramerate())

// White surfing computer providing 35FPS
// Black surfing computer providing 35FPS
// White gaming computer providing 144FPS
// Black gaming computer providing 144FPS
```