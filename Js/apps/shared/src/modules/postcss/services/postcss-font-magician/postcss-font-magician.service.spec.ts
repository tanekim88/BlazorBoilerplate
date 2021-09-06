import { Test, TestingModule } from '@nestjs/testing';
import { PostcssFontMagicianService } from './postcss-font-magician.service';

describe('PostcssFontMagicianService', () => {
    let service: PostcssFontMagicianService;

    beforeEach(async () => {
        const module: TestingModule = await Test.createTestingModule({
            providers: [PostcssFontMagicianService],
        }).compile();

        service = module.get<PostcssFontMagicianService>(PostcssFontMagicianService);
    });

    it('should be defined', () => {
        expect(service).toBeDefined();
    });
});
