import { CreateSpecificationUseCase } from ".."
import { AppError } from "../../../../../shared/errors/app-error";
import { FakeSpecificationsRepository } from "../../../repositories/implementations/fake/fake-specifications-repository";
import { CreateSpecificationDTO, SpecificationsRepository } from "../../../repositories/specifications-repository";

let specificationRepository: SpecificationsRepository;
let createSpecificationUseCase: CreateSpecificationUseCase;

describe('CreateSpecificationUseCase', () => {

    beforeEach(() => {
        specificationRepository = new FakeSpecificationsRepository();
        createSpecificationUseCase = new CreateSpecificationUseCase(specificationRepository);
    })

    it("should be able to create a specification", async () => {
        const payload: CreateSpecificationDTO = {
            name: 'some-specification',
            description: 'some-description'
        }

        const response = await createSpecificationUseCase.execute(payload);

        const specificationExists = await specificationRepository.findByName('some-specification');

        expect(response).toHaveProperty("id");
        expect(specificationExists).toBeTruthy();
        expect(specificationExists).toEqual(expect.objectContaining(payload))
        expect(specificationExists).toHaveProperty("id");
        expect(specificationExists.id).toEqual(response.id);
    })

    it("should not to be able to create a duplicate specification", async () => {
        const payload: CreateSpecificationDTO = {
            name: 'some-specification',
            description: 'some-description'
        }

        // ok, first insert
        await createSpecificationUseCase.execute(payload);
        // error, duplicate specification
        const promise = createSpecificationUseCase.execute(payload);

        expect(promise).rejects.toBeInstanceOf(AppError);
    })
})