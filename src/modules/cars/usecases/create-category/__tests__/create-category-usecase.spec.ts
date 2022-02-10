import { CreateCategoryUseCase } from "..";
import { Category } from "../../../models/category";
import { CategoriesRepository, CreateCategoryDTO } from "../../../repositories/categories-repository";
import { FakeCategoriesRepository } from "../../../repositories/implementations/fake/fake-categories-repository";

let categoriesRepository: CategoriesRepository;
let createCategoryUseCase: CreateCategoryUseCase;

describe("CreateCategoryUseCase", () => {

    beforeEach(() => {
        categoriesRepository = new FakeCategoriesRepository();
        createCategoryUseCase = new CreateCategoryUseCase(categoriesRepository);
    })

    it("should be able to create a new category", async () => {
        const payload: CreateCategoryDTO = {
            name: 'some-name',
            description: "some-description"
        }

        const created = await createCategoryUseCase.execute(payload);

        expect(created.id).toBeTruthy();
    });

})