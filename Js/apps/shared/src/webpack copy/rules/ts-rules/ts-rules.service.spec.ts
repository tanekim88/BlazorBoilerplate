import { Test, TestingModule } from '@nestjs/testing';
import { WebpackTsRulesService } from './webpack-ts-rules.service';

describe('WebpackTsRulesService', () => {
    let service: WebpackTsRulesService;

    beforeEach(async () => {
        const module: TestingModule = await Test.createTestingModule({
            providers: [WebpackTsRulesService],
        }).compile();

        service = module.get<WebpackTsRulesService>(WebpackTsRulesService);
    });

    it('should be defined', () => {
        expect(service).toBeDefined();
    });
});
