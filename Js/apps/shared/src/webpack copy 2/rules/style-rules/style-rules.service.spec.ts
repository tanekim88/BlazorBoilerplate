import { Test, TestingModule } from '@nestjs/testing';
import { WebpackStyleRulesService } from './webpack-style-rules.service';

describe('WebpackStyleRulesService', () => {
    let service: WebpackStyleRulesService;

    beforeEach(async () => {
        const module: TestingModule = await Test.createTestingModule({
            providers: [WebpackStyleRulesService],
        }).compile();

        service = module.get<WebpackStyleRulesService>(WebpackStyleRulesService);
    });

    it('should be defined', () => {
        expect(service).toBeDefined();
    });
});
