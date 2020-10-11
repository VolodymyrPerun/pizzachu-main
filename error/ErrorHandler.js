module.exports = class ErrorHandler extends Error {
    status;
    message;
    customCode;

    constructor(message, status = 500, customCode = undefined) {
        super();
        this.message = message;
        this.status = status;
        this.customCode = customCode;

        Error.captureStackTrace(this, this.constructor)
    }
}
