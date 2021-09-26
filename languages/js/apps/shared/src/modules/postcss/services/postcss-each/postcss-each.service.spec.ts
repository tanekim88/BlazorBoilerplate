import { Test, TestingModule } from '@nestjs/testing';
import { PostcssEachService } from './postcss-each.service';

describe('PostcssEachService', () => {
    let service: PostcssEachService;

    beforeEach(async () => {
        const module: TestingModule = await Test.createTestingModule({
            providers: [PostcssEachService],
        }).compile();

        service = module.get<PostcssEachService>(PostcssEachService);
    });

    it('should be defined', () => {
        expect(service).toBeDefined();
    });
});
