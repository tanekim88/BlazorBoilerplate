import { Test, TestingModule } from '@nestjs/testing';
import { PostcssFunctionsService } from './postcss-functions.service';

describe('PostcssFunctionsService', () => {
    let service: PostcssFunctionsService;

    beforeEach(async () => {
        const module: TestingModule = await Test.createTestingModule({
            providers: [PostcssFunctionsService],
        }).compile();

        service = module.get<PostcssFunctionsService>(PostcssFunctionsService);
    });

    it('should be defined', () => {
        expect(service).toBeDefined();
    });
});
