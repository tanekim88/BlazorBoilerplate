import { Test, TestingModule } from '@nestjs/testing';
import { PostcssSimpleVarsService } from './postcss-simple-vars.service';

describe('PostcssSimpleVarsService', () => {
    let service: PostcssSimpleVarsService;

    beforeEach(async () => {
        const module: TestingModule = await Test.createTestingModule({
            providers: [PostcssSimpleVarsService],
        }).compile();

        service = module.get<PostcssSimpleVarsService>(PostcssSimpleVarsService);
    });

    it('should be defined', () => {
        expect(service).toBeDefined();
    });
});
