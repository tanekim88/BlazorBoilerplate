import { Test, TestingModule } from '@nestjs/testing';
import { WebpackRulesService } from './webpack-rules.service';

describe('WebpackRulesService', () => {
    let service: WebpackRulesService;

    beforeEach(async () => {
        const module: TestingModule = await Test.createTestingModule({
            providers: [WebpackRulesService],
        }).compile();

        service = module.get<WebpackRulesService>(WebpackRulesService);
    });

    it('should be defined', () => {
        expect(service).toBeDefined();
    });
});
