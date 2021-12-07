export interface BasicUsecase<Input, Output> {
    execute(data: Input): Promise<Output>;
}
