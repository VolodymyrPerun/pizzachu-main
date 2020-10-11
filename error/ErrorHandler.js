module.exports = class ErrorHandler extends Error {
    status;
    message;
    customCode;

    constructor(status = 500, message, customCode = undefined) {
        super();
        this.status = status;
        this.message = message;
        this.customCode = customCode;

        Error.captureStackTrace(this, this.constructor)
    }
}
