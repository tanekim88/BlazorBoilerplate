import { Test, TestingModule } from '@nestjs/testing';
import { WebpackPostcssAdvancedVariablesService } from './webpack-postcss-advanced-variables.service';

describe('WebpackPostcssAdvancedVariablesService', () => {
    let service: WebpackPostcssAdvancedVariablesService;

    beforeEach(async () => {
        const module: TestingModule = await Test.createTestingModule({
            providers: [WebpackPostcssAdvancedVariablesService],
        }).compile();

        service = module.get<WebpackPostcssAdvancedVariablesService>(WebpackPostcssAdvancedVariablesService);
    });

    it('should be defined', () => {
        expect(service).toBeDefined();
    });
});
