import { Test, TestingModule } from '@nestjs/testing';
import { PostcssForService } from './postcss-for.service';

describe('PostcssForService', () => {
    let service: PostcssForService;

    beforeEach(async () => {
        const module: TestingModule = await Test.createTestingModule({
            providers: [PostcssForService],
        }).compile();

        service = module.get<PostcssForService>(PostcssForService);
    });

    it('should be defined', () => {
        expect(service).toBeDefined();
    });
});
