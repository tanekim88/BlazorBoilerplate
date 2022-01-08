import { Test } from '@nestjs/testing';
import { PostcssPresetEnvService } from './postcss-preset-env.service';
describe('PostcssPresetEnvService', () => {
    let service;
    beforeEach(async () => {
        const module = await Test.createTestingModule({
            providers: [PostcssPresetEnvService],
        }).compile();
        service = module.get(PostcssPresetEnvService);
    });
    it('should be defined', () => {
        expect(service).toBeDefined();
    });
});
//# sourceMappingURL=postcss-preset-env.service.spec.js.map