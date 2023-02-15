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
// Базовий клас, який реалізує інтерфейс пристрою
var BasicDevice = /** @class */ (function () {
    function BasicDevice() {
    }
    BasicDevice.prototype.turnOn = function () {
        console.log("Device is turned on");
    };
    BasicDevice.prototype.turnOff = function () {
        console.log("Device is turned off");
    };
    return BasicDevice;
}());
// Загальний клас декоратора
var DeviceDecorator = /** @class */ (function () {
    function DeviceDecorator(device) {
        this.device = device;
    }
    // Імплементує методи Turn On і Turn Off, делегуючи виклик включеному екземпляру Device
    DeviceDecorator.prototype.turnOn = function () {
        this.device.turnOn();
    };
    DeviceDecorator.prototype.turnOff = function () {
        this.device.turnOff();
    };
    return DeviceDecorator;
}());
// Клас SmartDevice, який розширює DeviceDecorator
// Цей клас додає додаткову функціональність для turnOn шляхом підключення до WiFi
var SmartDevice = /** @class */ (function (_super) {
    __extends(SmartDevice, _super);
    function SmartDevice() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    SmartDevice.prototype.turnOn = function () {
        this.connectToWiFi();
        _super.prototype.turnOn.call(this);
    };
    SmartDevice.prototype.connectToWiFi = function () {
        console.log("Device is connected to WiFi");
    };
    return SmartDevice;
}(DeviceDecorator));
// Цей клас додає додаткові функції для ввімкнення шляхом активації пристрою голосом
var VoiceActivatedDevice = /** @class */ (function (_super) {
    __extends(VoiceActivatedDevice, _super);
    function VoiceActivatedDevice() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    VoiceActivatedDevice.prototype.turnOn = function () {
        this.activateByVoice();
        _super.prototype.turnOn.call(this);
    };
    VoiceActivatedDevice.prototype.activateByVoice = function () {
        console.log("Device is activated by voice command");
    };
    return VoiceActivatedDevice;
}(DeviceDecorator));
// Цей клас додає додаткову функціональність для ввімкнення та вимкнення шляхом планування дій
var ScheduledDevice = /** @class */ (function (_super) {
    __extends(ScheduledDevice, _super);
    function ScheduledDevice() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        _this.timerId = null;
        return _this;
    }
    ScheduledDevice.prototype.turnOn = function () {
        this.scheduleTurnOn();
    };
    ScheduledDevice.prototype.turnOff = function () {
        this.scheduleTurnOff();
    };
    ScheduledDevice.prototype.scheduleTurnOn = function () {
        var _this = this;
        this.timerId = setTimeout(function () {
            _super.prototype.turnOn.call(_this);
        }, 5000);
    };
    ScheduledDevice.prototype.scheduleTurnOff = function () {
        if (this.timerId) {
            clearTimeout(this.timerId);
            this.timerId = null;
        }
        _super.prototype.turnOff.call(this);
    };
    return ScheduledDevice;
}(DeviceDecorator));
// Створення базовиого пристрою
var myDevice = new BasicDevice();
// За допомогою декораторів реалізація додавання до пристрою розумних функції, керовання голосом і заплановану функціональність (таймер)
myDevice = new SmartDevice(myDevice);
myDevice = new VoiceActivatedDevice(myDevice);
myDevice = new ScheduledDevice(myDevice);
// Включаємо девайс
myDevice.turnOn();
// Включаємо девайс через 10 секунд
setTimeout(function () {
    myDevice.turnOff();
}, 10000);
// Device is activated by voice command
// Device is connected to WiFi
// Device is turned on
// Device is turned off
