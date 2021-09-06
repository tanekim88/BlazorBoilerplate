import { Test, TestingModule } from '@nestjs/testing';
import { PostcssCombineDuplicatedSelectorsService } from './postcss-combine-duplicated-selectors.service';

describe('PostcssCombineDuplicatedSelectorsService', () => {
    let service: PostcssCombineDuplicatedSelectorsService;

    beforeEach(async () => {
        const module: TestingModule = await Test.createTestingModule({
            providers: [PostcssCombineDuplicatedSelectorsService],
        }).compile();

        service = module.get<PostcssCombineDuplicatedSelectorsService>(
            PostcssCombineDuplicatedSelectorsService,
        );
    });

    it('should be defined', () => {
        expect(service).toBeDefined();
    });
});
