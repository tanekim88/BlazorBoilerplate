import { Test } from '@nestjs/testing';
import { WebpackPostcssPresetEnvService } from './webpack-postcss-preset-env.service';
describe('WebpackPostcssPresetEnvService', () => {
    let service;
    beforeEach(async () => {
        const module = await Test.createTestingModule({
            providers: [WebpackPostcssPresetEnvService],
        }).compile();
        service = module.get(WebpackPostcssPresetEnvService);
    });
    it('should be defined', () => {
        expect(service).toBeDefined();
    });
});
//# sourceMappingURL=postcss-preset-env.service.spec.js.map