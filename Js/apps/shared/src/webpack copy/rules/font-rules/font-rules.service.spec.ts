import { Test, TestingModule } from '@nestjs/testing';
import { WebpackFontRulesService } from './webpack-font-rules.service';

describe('WebpackFontRulesService', () => {
    let service: WebpackFontRulesService;

    beforeEach(async () => {
        const module: TestingModule = await Test.createTestingModule({
            providers: [WebpackFontRulesService],
        }).compile();

        service = module.get<WebpackFontRulesService>(WebpackFontRulesService);
    });

    it('should be defined', () => {
        expect(service).toBeDefined();
    });
});
