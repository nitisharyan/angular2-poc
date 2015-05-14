/**
 * Registry pattern implemented simple Register class
 */
export default class Register {
    constructor(defaultValue) {
        this._defaultValue = defaultValue;
        this._values = Object.create(null);
    }
    register(name, value) {
        this._values[name] = value;
    }
    getValue(name) {
        var value;
        if (Object.prototype.hasOwnProperty.call(this._values, name)) {
            value = this._values[name];
        } else {
            value = this._defaultValue;
        }
        return value;
    }
}
