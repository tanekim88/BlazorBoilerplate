import { Test, TestingModule } from '@nestjs/testing';
import { PostcssAdvancedVariablesService } from './postcss-advanced-variables.service';

describe('PostcssAdvancedVariablesService', () => {
    let service: PostcssAdvancedVariablesService;

    beforeEach(async () => {
        const module: TestingModule = await Test.createTestingModule({
            providers: [PostcssAdvancedVariablesService],
        }).compile();

        service = module.get<PostcssAdvancedVariablesService>(PostcssAdvancedVariablesService);
    });

    it('should be defined', () => {
        expect(service).toBeDefined();
    });
});
