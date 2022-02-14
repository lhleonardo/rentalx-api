import { HasherProvider } from "../../../../../core/providers/criptography/hasher";
import { FakeHasherProvider } from "../../../../../core/providers/criptography/implementations/fake/fake-hasher-provider";
import { ConfirmPasswordError } from "../../../../../shared/errors/confirm-password-error";
import { DuplicateEmailError } from "../../../errors/duplicate-email-error";
import { FakeUsersRepository } from "../../../repositories/implementations/fake-users-repository";
import { UsersRepository } from "../../../repositories/users-repository";
import { CreateUserUsecase } from "../create-user-usecase";

let usecase: CreateUserUsecase;
let usersRepo: UsersRepository;
let hashProvider: HasherProvider;

describe("Create User Usecase", () => {
    beforeEach(() => {
        hashProvider = new FakeHasherProvider();
        usersRepo = new FakeUsersRepository();
        usecase = new CreateUserUsecase(usersRepo, hashProvider);
    });

    it("should not be able to create an user with duplicate e-mail", async () => {
        await usecase.execute({
            email: "some-email@example.com",
            name: "some-name",
            password: "some-password",
            confirmPassword: "some-password",
        });

        const response = usecase.execute({
            email: "some-email@example.com",
            name: "some-name",
            password: "some-password",
            confirmPassword: "some-password",
        });

        expect(response).rejects.toThrow(DuplicateEmailError);
    });

    it("should not be able to create an user with bad password confirmation", async () => {
        const response = usecase.execute({
            email: "some-email@example.com",
            name: "some-name",
            password: "some-password",
            confirmPassword: "wrong-password-confirmation",
        });

        expect(response).rejects.toThrow(ConfirmPasswordError);
    });

    it("should confirm if usecases uses HasherProvider", async () => {
        const hasherStub: HasherProvider = {
            compare: jest.fn(),
            hash: jest.fn(),
        };

        usecase = new CreateUserUsecase(usersRepo, hasherStub);

        await usecase.execute({
            email: "some-email@example.com",
            name: "some-name",
            password: "some-password",
            confirmPassword: "some-password",
        });

        expect(hasherStub.hash).toHaveBeenCalledTimes(1);
        expect(hasherStub.hash).toHaveBeenCalledWith("some-password");
    });

    it("should confirm usecases call UsersRepository:create with hashedPassword", async () => {
        const createSpy = jest.spyOn(usersRepo, "create");

        jest.spyOn(hashProvider, "hash").mockImplementation(
            () => new Promise((resolve) => resolve("hashed-password"))
        );

        await usecase.execute({
            email: "some-email@example.com",
            name: "some-name",
            password: "some-password",
            confirmPassword: "some-password",
        });

        expect(createSpy).toHaveBeenCalledWith(
            expect.objectContaining({ password: "hashed-password" })
        );
    });
});
