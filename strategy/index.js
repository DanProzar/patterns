"use strict";
exports.__esModule = true;
var promises_1 = require("fs/promises");
var path = require("path");
var LocalUpload = /** @class */ (function () {
    function LocalUpload() {
    }
    LocalUpload.prototype.upload = function (filePath, name, content) {
        return new Promise(function (resolve, reject) {
            var result = {
                success: true,
                message: "Uploaded to local storage"
            };
            (0, promises_1.writeFile)(path.join(__dirname, filePath, name), content)
                .then(function () {
                resolve(result);
            })["catch"](function (e) {
                result.success = false;
                result.message = "Error uploading to local storage";
                reject(result);
            });
        });
    };
    return LocalUpload;
}());
var CloudUpload = /** @class */ (function () {
    function CloudUpload() {
    }
    CloudUpload.prototype.upload = function (filePath, name, content) {
        return new Promise(function (resolve, reject) {
            var result = {
                success: true,
                message: "Uploaded to cloud storage"
            };
            setTimeout(function () {
                resolve(result);
            }, 1000);
        });
    };
    return CloudUpload;
}());
var Context = /** @class */ (function () {
    function Context(strategy) {
        this.strategy = strategy;
    }
    Context.prototype.setStrategy = function (strategy) {
        this.strategy = strategy;
    };
    Context.prototype.fileUpload = function (filePath, name, content) {
        return this.strategy.upload(filePath, name, content);
    };
    return Context;
}());
var localUpload = new LocalUpload();
var cloudUpload = new CloudUpload();
var context = new Context(cloudUpload);
context
    .fileUpload("/", "Output.txt", "Some content")
    .then(function (result) {
    console.log(result);
});
