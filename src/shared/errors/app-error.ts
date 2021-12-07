export class AppError extends Error {
    private code: number;
    private msg: string;

    constructor(msg: string, statusCode = 400) {
        super(msg);
        this.msg = msg;
        this.code = statusCode;
        this.name = "AppError";
        Object.setPrototypeOf(this, new.target.prototype);
    }

    public get message(): string {
        return this.msg;
    }

    public get statusCode(): number {
        return this.code;
    }
}
