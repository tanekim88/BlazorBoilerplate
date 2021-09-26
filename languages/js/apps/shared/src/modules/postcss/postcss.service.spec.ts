import { Test, TestingModule } from '@nestjs/testing';
import { PostcssService } from './postcss.service';

describe('PostcssService', () => {
    let service: PostcssService;

    beforeEach(async () => {
        const module: TestingModule = await Test.createTestingModule({
            providers: [PostcssService],
        }).compile();

        service = module.get<PostcssService>(PostcssService);
    });

    it('should be defined', () => {
        expect(service).toBeDefined();
    });
});
