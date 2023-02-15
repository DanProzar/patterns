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
// Оголашення базової властивості Колір
var Color = /** @class */ (function () {
    function Color(name) {
        this.name = name;
    }
    Color.prototype.getColor = function () {
        return this.name;
    };
    return Color;
}());
// Огололення підкласу ЧорнийКолір, що позначає собою чорний колір
var BlackColor = /** @class */ (function (_super) {
    __extends(BlackColor, _super);
    function BlackColor() {
        return _super.call(this, 'black') || this;
    }
    return BlackColor;
}(Color));
// Огололення підкласу БілийКолір, що позначає собою білий колір
var WhiteColor = /** @class */ (function (_super) {
    __extends(WhiteColor, _super);
    function WhiteColor() {
        return _super.call(this, 'white') || this;
    }
    return WhiteColor;
}(Color));
// Оголошення класу комп'ютер, що містить в собі посилання на об'єкт кольору,
// тим самим розділяючи абстракцію та реалізацію, не створюючи нових підкласів.
var Computer = /** @class */ (function () {
    function Computer(color) {
        this.color = color;
    }
    // Оголошення методу, що виводить кількість кадрів за секунду в рендеренгу відео-ігор
    Computer.prototype.provideFramerate = function (fps) {
        var color = this.color.getColor();
        var capitalizedColor = color.charAt(0).toUpperCase() + color.slice(1);
        return capitalizedColor + " " + (this.type || '') + " computer providing " + (fps || 0) + "FPS";
    };
    return Computer;
}());
// Огололення класу GamingComputer, що наслідує клас Комп'ютер,
// та перезаписує метод provideFramerate з показником fps
var GamingComputer = /** @class */ (function (_super) {
    __extends(GamingComputer, _super);
    function GamingComputer() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        _this.type = 'gaming';
        return _this;
    }
    GamingComputer.prototype.provideFramerate = function () {
        return _super.prototype.provideFramerate.call(this, 144);
    };
    return GamingComputer;
}(Computer));
var SurfingComputer = /** @class */ (function (_super) {
    __extends(SurfingComputer, _super);
    function SurfingComputer() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        _this.type = 'surfing';
        return _this;
    }
    SurfingComputer.prototype.provideFramerate = function () {
        return _super.prototype.provideFramerate.call(this, 35);
    };
    return SurfingComputer;
}(Computer));
// Створюємо різні екземпляри класів, з усіма можливими варіаціями кольору та типів комп'ютерів
var computer1 = new SurfingComputer(new WhiteColor());
var computer2 = new SurfingComputer(new BlackColor());
var computer3 = new GamingComputer(new WhiteColor());
var computer4 = new GamingComputer(new BlackColor());
// Виводимо результат
console.log(computer1.provideFramerate());
console.log(computer2.provideFramerate());
console.log(computer3.provideFramerate());
console.log(computer4.provideFramerate());
// White surfing computer providing 35FPS
// Black surfing computer providing 35FPS
// White gaming computer providing 144FPS
// Black gaming computer providing 144FPS
