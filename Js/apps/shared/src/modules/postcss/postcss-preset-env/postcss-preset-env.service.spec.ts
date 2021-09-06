import { Test, TestingModule } from '@nestjs/testing';
import { PostcssPresetEnvService } from './postcss-preset-env.service';

describe('PostcssPresetEnvService', () => {
    let service: PostcssPresetEnvService;

    beforeEach(async () => {
        const module: TestingModule = await Test.createTestingModule({
            providers: [PostcssPresetEnvService],
        }).compile();

        service = module.get<PostcssPresetEnvService>(PostcssPresetEnvService);
    });

    it('should be defined', () => {
        expect(service).toBeDefined();
    });
});
