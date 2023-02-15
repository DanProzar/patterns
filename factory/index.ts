// Приклад використання фабрики у ООП-стилі

// Створюємо загальний інтерфейс для об'єктів
interface IDevice {
  name: string
  deliver: () => void
}

// Створюємо клас фабрики, в якому описана типову реалізацію
abstract class FabricDevice {
  protected abstract createDevice (): IDevice

  deliverDevice () {
    const device = this.createDevice()

    device.deliver()
  }
}

// Додаємо новий продукт Комп'ютер, що імплементує інтерфейс IDevice
class Computer implements IDevice {
  name = 'Computer'
  deliver () {
    console.log(`Delivering ${this.name}, will arrive in 2 weeks`)
  }
}

// Додаємо новий продукт Ноутбук, що імплементує інтерфейс IDevice
class Laptop implements IDevice {
  name = 'Laptop'
  deliver () {
    console.log(`Delivering ${this.name}, will arrive in 4 days`)
  }
}


// Створюємо фабрику для створення Комп'ютерів, наслідуючи основний клас фабрик,
// де перевизначаємо метод createDevice
class FabricComputer extends FabricDevice {
  protected createDevice(): IDevice {
    return new Computer()
  }
}

// Створюємо фабрику для створення Ноутбуків
class FabricLaptop extends FabricDevice {
  protected createDevice(): IDevice {
    return new Laptop()
  }
}

let deviceFabric: FabricDevice

// Випадковим чином присвоюємо фабрику або Комп'ютерів, або Ноутбуків до фабрики deviceFabric.
// Це просто приклад, у реальних випадках треба вказувати більш очевидні і передбачувані умови для обирання фабрики
if (Math.random() > 0.5) {
  deviceFabric = new FabricComputer()
} else {
  deviceFabric = new FabricLaptop()
}

// Викликаємо загальний метод доставки пристрою
deviceFabric.deliverDevice()





// Приклад використання фабрики у функціональному стилі

// Оголошення функції createCar, що повертає функцію getDetail 
function createCar(mark: string, model :string, year: number) {
  // Виводимо загальну інформацію про автомобіль
  function getDetails() {
    return `Mark:${mark};\nModel: ${model};\nIssued at: ${year};\n`;
  }

  // Лагодимо автомобіль, і повертаємо успішене повідомлення через час,
  // що залежить року випуску автомобіля
  function fix () {
    return new Promise((resolve) => {
      setTimeout(() => {
        resolve(`The car ${mark} ${model} has been fixed!`)
      }, year > 2015 ? 1000 : year > 1999 ? 3000 : 5000)
    })
  }
  
  return { getDetails, fix };
}


// Створюємо 2 екзепляри автомобіля, використовуючи фабрику createCar
const car1 = createCar('Mercedes-Benz', 'E220', 2010);
const car2 = createCar('Honda', 'Civic', 2021);

// Логуємо деталі
console.log(car1.getDetails());
console.log(car2.getDetails());

// Лагодимо автомобіль та виводимо успішне повідомленя по завершенні
car1.fix().then(msg => console.log(msg))