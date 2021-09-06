import { Test, TestingModule } from '@nestjs/testing';
import { PostcssConditionalsService } from './postcss-conditionals.service';

describe('PostcssConditionalsService', () => {
    let service: PostcssConditionalsService;

    beforeEach(async () => {
        const module: TestingModule = await Test.createTestingModule({
            providers: [PostcssConditionalsService],
        }).compile();

        service = module.get<PostcssConditionalsService>(PostcssConditionalsService);
    });

    it('should be defined', () => {
        expect(service).toBeDefined();
    });
});
