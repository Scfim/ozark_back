export default function validator(value) {
    const app = {}
    app.error = {}
    app.isNotEmpty = function () {
        if (value === "") {
            app.error = {
                type: "Type Error",
                reason: "Value cannot be empty"
            }
        }
        else if (value === "undefined") {
            app.error = {
                type: "Type Error",
                reason: "Value cannot be undefined"
            }
        }
        else if (value == null) {
            app.error = {
                type: "Type Error",
                reason: "Value cannot be null"
            }
        }
        else {
            app.value = value
        }
        return app
    }

    app.loadValue = function () {

        return app.value !== undefined ? app.value : app
    }
    app.isNumber = function () {
        const regexNumber = /^[0-9]/
        const regex = new RegExp(regexNumber)
        regex.test(value) ? app.value = value : app.error = {
            type: "Type error",
            reason: "isNumber() function accepts only numbers as argument"
        }
        return this
    }
    app.isString = function () {
        const regexString = /^\w/
        const regex = new RegExp(regexString)
        if (typeof value == "string" && regex.test(value)) {
            app.value = value
        } else
            app.error = {
                type: "Type error",
                reason: "isString() function accepts only string as argument"
            }
        return this
    }
    app.isDate  = function(){
        const dateRegex = /(^([\d]){4}(\-)([\d]{2})(\-)([\d]{2})$)|(^([\d]){2}(\-)([\d]{2})(\-)([\d]{4})$)/i
        const regex = new RegExp(dateRegex)
        if (typeof value == "string" && regex.test(value)) {
            app.value = value
        } else
            app.error = {
                type: "Insufficient Error ",
                reason: "isDate() function accepts only date as parameter"
            }
        return this
    }
    app.isEmailAddress = function () {
        const regexEmail = /^[\w._-]+@[a-zA-Z_]+?\.[a-zA-Z]{2,3}$/gm
        const regex = new RegExp(regexEmail)
        if (typeof value == "string" && regex.test(value)) {
            app.value = value
        } else
            app.error = {
                type: "Insufficient Error ",
                reason: "isEmailAddress() function accepts only email as argument"
            }
        return this
    }
    app.isPhoneNumber = function () {
        ///(^(\+)[\d]{10,12}$)|(^(0)[\d]{9}$)/gm
        const regexPhoneNumber = /(^(\+)[\d]{10,12}$)|(^(0)[\d]{9}$)/g
        const regex = new RegExp(regexPhoneNumber)
        if (typeof value == "string" && regex.test(value)) {
            app.value = value
        } else
            app.error = {
                type: "Insufficient Error ",
                reason: "isPhoneNumber() function accepts only a phone  number as argument"
            }
        return this
    }
    app.canTestRegex = function(regex){
        const newRegex = new RegExp(regex) 
        typeof value === "string" && newRegex.test(value) ? app.value = value : app.error= {
            type: "Regex Error ",
                reason: "canTestRegex() function issue"
        }
    }
    app.isMoreThan = function (length) {
        const valueLength = value.length
        if (typeof length === "number") {
            if (valueLength > length) {
                app.value = value
            } else {
                app.error = {
                    type: "Insufficient Error ",
                    reason: "Your value's length must be more than " + length + " caracters"
                }
            }
        } else app.error = {
            type: "Type Error ",
            reason: "isMoreThan() function accepts only numbers as argument"
        }
        return this
    }
    app.isLessThan = function (length) {
        const valueLength = value.length
        if (typeof length === "number") {
            if (valueLength < length) {
                app.value = value
            } else {
                app.error = {
                    type: "Insufficient Error ",
                    reason: "Your value's length must be less than " + length + " caracters"
                }
            }
        } else app.error = {
            type: "Type Error ",
            reason: "isMoreThan() function accepts only numbers as argument"
        }
        return this
    }
    app.isBetween = function (length) {
        const valueLength = value.length
        if (typeof length === "object") {
            if(length.start <= length.end){
                if (valueLength >= length.start && valueLength <= length.end) {
                    app.value = value
                } else {
                    app.error = {
                        type: "Insufficient Error ",
                        reason: "Your value's length must be between " + length.start +" and "+length.end+ " caracters"
                    }
                }
            }else app.error = {
                type: "Type Error ",
                reason: "isBetween() function accepts only object as argument with start value less than end value"
            }
        } else app.error = {
            type: "Type Error ",
            reason: "isMoreThan() function accepts only numbers as argument"
        }
        return this
    }

    app.check = function(getError){
        
        if(app.value !== undefined){
            return true
        }else{
            return false
        }
        
        
    }
    app.getError = function(){
        return app.error
    }

    return app
}

// const test = validator('iiui').isNumber().check()
// console.log(test)