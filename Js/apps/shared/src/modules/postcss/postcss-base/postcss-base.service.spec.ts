import { Test, TestingModule } from '@nestjs/testing';
import { PostcssBaseService } from './postcss-base.service';

describe('PostcssBaseService', () => {
    let service: PostcssBaseService;

    beforeEach(async () => {
        const module: TestingModule = await Test.createTestingModule({
            providers: [PostcssBaseService],
        }).compile();

        service = module.get<PostcssBaseService>(PostcssBaseService);
    });

    it('should be defined', () => {
        expect(service).toBeDefined();
    });
});
