# Decorator pattern

<b>Decorator</b> - це структурний патерн проектування, що дозволяє додавати об'єктам новий фукціонал, загортаючи його у так звані "обгортки".

Його відмінність від процедури успадкування класів відрізняється тим, що він вирішує проблему необхідності створення великої кількості класів-нажадків, коли функціонал екземпляра класу потрібно змінювати "на ходу". Також варто зазначити те, що підхід успадкування класів є статичним, тобто ми не можемо розширити функціонал існуючого об'єкта, не створивши його заново. Окрім того в наслідуванні класів є можливим використання ключового слова final для полей та методів, що не дозволяє далі успадковувати цю властивість/метод.

Він був створений задля поліпшення комбінування поведінки об’єктів, надаючи перевагу методу агрегування класів. Основною ідеєю патерна  є те, що об’єкт утримує інший об'єкт і делегує йому роботу, замість того, щоб самому успадкувати його поведінку.

## Переваги
  - Має більшу гнучкість, ніж у спадкування.
  - Можна додавати кілька нових обов’язків одразу.
  - Дозволяє мати кілька дрібних об’єктів, замість одного об’єкта "на всі випадки життя".

## Недоліки
  - Важко конфігурувати об’єкти, які загорнуто в декілька обгорток одночасно.
  - Велика кількість невеликих класів.

## Приклад використанння патерну

```ts
// Інтерфейс пристрою з методами увімкнути та вимкнути
interface Device {
  turnOn(): void;
  turnOff(): void;
}

// Базовий клас, який реалізує інтерфейс пристрою
class BasicDevice implements Device {
  turnOn(): void {
    console.log("Device is turned on");
  }

  turnOff(): void {
    console.log("Device is turned off");
  }
}

// Загальний клас декоратора
class DeviceDecorator implements Device {
  private device: Device;

  constructor(device: Device) {
    this.device = device;
  }

  // Імплементує методи Turn On і Turn Off, делегуючи виклик включеному екземпляру Device
  turnOn(): void {
    this.device.turnOn();
  }

  turnOff(): void {
    this.device.turnOff();
  }
}

// Клас SmartDevice, який розширює DeviceDecorator
// Цей клас додає додаткову функціональність для turnOn шляхом підключення до WiFi
class SmartDevice extends DeviceDecorator {
  turnOn(): void {
    this.connectToWiFi();
    super.turnOn();
  }

  private connectToWiFi(): void {
    console.log("Device is connected to WiFi");
  }
}

// Цей клас додає додаткові функції для ввімкнення шляхом активації пристрою голосом
class VoiceActivatedDevice extends DeviceDecorator {
  turnOn(): void {
    this.activateByVoice();
    super.turnOn();
  }

  private activateByVoice(): void {
    console.log("Device is activated by voice command");
  }
}

// Цей клас додає додаткову функціональність для ввімкнення та вимкнення шляхом планування дій
class ScheduledDevice extends DeviceDecorator {
  private timerId: number | null = null;

  turnOn(): void {
    this.scheduleTurnOn();
  }

  turnOff(): void {
    this.scheduleTurnOff();
  }

  private scheduleTurnOn(): void {
    this.timerId = setTimeout(() => {
      super.turnOn();
    }, 5000);
  }

  private scheduleTurnOff(): void {
    if (this.timerId) {
      clearTimeout(this.timerId);
      this.timerId = null;
    }
    super.turnOff();
  }
}

// Створення базовиого пристрою
let myDevice: Device = new BasicDevice();

// За допомогою декораторів реалізація додавання до пристрою розумних функції, керовання голосом і заплановану функціональність (таймер)
myDevice = new SmartDevice(myDevice);
myDevice = new VoiceActivatedDevice(myDevice);
myDevice = new ScheduledDevice(myDevice);

// Включаємо девайс
myDevice.turnOn();

// Включаємо девайс через 10 секунд
setTimeout(() => {
  myDevice.turnOff();
}, 10000);

// Device is activated by voice command
// Device is connected to WiFi
// Device is turned on
// Device is turned off
```