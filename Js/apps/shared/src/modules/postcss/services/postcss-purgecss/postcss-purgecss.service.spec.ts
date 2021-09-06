import { Test, TestingModule } from '@nestjs/testing';
import { PostcssPurgecssService } from './postcss-purgecss.service';

describe('PostcssPurgecssService', () => {
    let service: PostcssPurgecssService;

    beforeEach(async () => {
        const module: TestingModule = await Test.createTestingModule({
            providers: [PostcssPurgecssService],
        }).compile();

        service = module.get<PostcssPurgecssService>(PostcssPurgecssService);
    });

    it('should be defined', () => {
        expect(service).toBeDefined();
    });
});
