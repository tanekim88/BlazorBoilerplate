import { Test, TestingModule } from '@nestjs/testing';
import { WebpackPostcssSimpleVarsService } from './webpack-postcss-simple-vars.service';

describe('WebpackPostcssSimpleVarsService', () => {
    let service: WebpackPostcssSimpleVarsService;

    beforeEach(async () => {
        const module: TestingModule = await Test.createTestingModule({
            providers: [WebpackPostcssSimpleVarsService],
        }).compile();

        service = module.get<WebpackPostcssSimpleVarsService>(WebpackPostcssSimpleVarsService);
    });

    it('should be defined', () => {
        expect(service).toBeDefined();
    });
});
