export class AppError {
    private code: number;
    private msg: string;

    constructor(msg: string, statusCode = 400) {
        this.msg = msg;
        this.code = statusCode;
    }

    public get message(): string {
        return this.msg;
    }

    public get statusCode(): number {
        return this.code;
    }
}
