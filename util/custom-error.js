class CustomError extends Error {
    constructor(code, message) {
        super(code, message)

        if (Error.captureStackTrace) {
            Error.captureStackTrace(this, CustomError);
        }

        this.code = code;
        this.message = message;
    }
}

module.exports = CustomError;