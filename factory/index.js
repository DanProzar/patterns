// Приклад використання фабрики у ООП-стилі
var __extends = (this && this.__extends) || (function () {
    var extendStatics = function (d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b) if (Object.prototype.hasOwnProperty.call(b, p)) d[p] = b[p]; };
        return extendStatics(d, b);
    };
    return function (d, b) {
        if (typeof b !== "function" && b !== null)
            throw new TypeError("Class extends value " + String(b) + " is not a constructor or null");
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
// Створюємо клас фабрики, в якому описана типову реалізацію
var FabricDevice = /** @class */ (function () {
    function FabricDevice() {
    }
    FabricDevice.prototype.deliverDevice = function () {
        var device = this.createDevice();
        device.deliver();
    };
    return FabricDevice;
}());
// Додаємо новий продукт Комп'ютер, що імплементує інтерфейс IDevice
var Computer = /** @class */ (function () {
    function Computer() {
        this.name = 'Computer';
    }
    Computer.prototype.deliver = function () {
        console.log("Delivering " + this.name + ", will arrive in 2 weeks");
    };
    return Computer;
}());
// Додаємо новий продукт Ноутбук, що імплементує інтерфейс IDevice
var Laptop = /** @class */ (function () {
    function Laptop() {
        this.name = 'Laptop';
    }
    Laptop.prototype.deliver = function () {
        console.log("Delivering " + this.name + ", will arrive in 4 days");
    };
    return Laptop;
}());
// Створюємо фабрику для створення Комп'ютерів, наслідуючи основний клас фабрик,
// де перевизначаємо метод createDevice
var FabricComputer = /** @class */ (function (_super) {
    __extends(FabricComputer, _super);
    function FabricComputer() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    FabricComputer.prototype.createDevice = function () {
        return new Computer();
    };
    return FabricComputer;
}(FabricDevice));
// Створюємо фабрику для створення Ноутбуків
var FabricLaptop = /** @class */ (function (_super) {
    __extends(FabricLaptop, _super);
    function FabricLaptop() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    FabricLaptop.prototype.createDevice = function () {
        return new Laptop();
    };
    return FabricLaptop;
}(FabricDevice));
var deviceFabric;
// Випадковим чином присвоюємо фабрику або Комп'ютерів, або Ноутбуків до фабрики deviceFabric.
// Це просто приклад, у реальних випадках треба вказувати більш очевидні і передбачувані умови для обирання фабрики
if (Math.random() > 0.5) {
    deviceFabric = new FabricComputer();
}
else {
    deviceFabric = new FabricLaptop();
}
// Викликаємо загальний метод доставки пристрою
deviceFabric.deliverDevice();
// Приклад використання фабрики у функціональному стилі
// Оголошення функції createCar, що повертає функцію getDetail 
function createCar(mark, model, year) {
    // Виводимо загальну інформацію про автомобіль
    function getDetails() {
        return "Mark:" + mark + ";\nModel: " + model + ";\nIssued at: " + year + ";\n";
    }
    // Лагодимо автомобіль, і повертаємо успішене повідомлення через час,
    // що залежить року випуску автомобіля
    function fix() {
        return new Promise(function (resolve) {
            setTimeout(function () {
                resolve("The car " + mark + " " + model + " has been fixed!");
            }, year > 2015 ? 1000 : year > 1999 ? 3000 : 5000);
        });
    }
    return { getDetails: getDetails, fix: fix };
}
// Створюємо 2 екзепляри автомобіля, використовуючи фабрику createCar
var car1 = createCar('Mercedes-Benz', 'E220', 2010);
var car2 = createCar('Honda', 'Civic', 2021);
// Логуємо деталі
console.log(car1.getDetails());
console.log(car2.getDetails());
// Лагодимо автомобіль та виводимо успішне повідомленя по завершенні
car1.fix().then(function (msg) { return console.log(msg); });
