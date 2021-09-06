import { Test, TestingModule } from '@nestjs/testing';
import { WebpackPostcssPresetEnvService } from './webpack-postcss-preset-env.service';

describe('WebpackPostcssPresetEnvService', () => {
    let service: WebpackPostcssPresetEnvService;

    beforeEach(async () => {
        const module: TestingModule = await Test.createTestingModule({
            providers: [WebpackPostcssPresetEnvService],
        }).compile();

        service = module.get<WebpackPostcssPresetEnvService>(WebpackPostcssPresetEnvService);
    });

    it('should be defined', () => {
        expect(service).toBeDefined();
    });
});
