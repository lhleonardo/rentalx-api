import { ListSpecificationsUseCase } from "..";

import { FakeSpecificationsRepository } from "../../../repositories/implementations/fake/fake-specifications-repository";
import { SpecificationsRepository } from "../../../repositories/specifications-repository";

let repository: SpecificationsRepository;
let usecase: ListSpecificationsUseCase;

describe("List Specifications UseCase", () => {
    beforeEach(() => {
        repository = new FakeSpecificationsRepository();
        usecase = new ListSpecificationsUseCase(repository);
    });

    it("should be able to returns empty if no specification exists", () => {
        const response = usecase.execute();
        expect(response).resolves.toEqual([]);
    });

    it("should be able to return the correct items", async () => {
        const spec1 = await repository.create({
            name: "specification-1",
            description: "some-description",
        });
        expect(await usecase.execute()).toEqual(
            expect.arrayContaining([spec1])
        );

        const spec2 = await repository.create({
            name: "specification-2",
            description: "some-description",
        });
        expect(await usecase.execute()).toEqual(
            expect.arrayContaining([spec1, spec2])
        );
    });

    it("should be able to return the correct count of items", async () => {
        // adiciona uma quantidade arbitrária de elementos
        const operations = [];
        for (let i = 1; i <= 10; i += 1) {
            const promise = repository.create({
                name: `specification-${i}`,
                description: "some-description",
            });

            operations.push(promise);
        }
        Promise.all(operations);

        const response = await usecase.execute();

        expect(response).toBeTruthy();
        expect(response).toBeInstanceOf(Array);
        expect(response.length).toBe(10);
    });
});
