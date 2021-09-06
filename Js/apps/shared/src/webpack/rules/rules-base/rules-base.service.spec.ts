import { Test, TestingModule } from '@nestjs/testing';
import { WebpackRulesBaseService } from './webpack-rules-base.service';

describe('WebpackRulesBaseService', () => {
    let service: WebpackRulesBaseService;

    beforeEach(async () => {
        const module: TestingModule = await Test.createTestingModule({
            providers: [WebpackRulesBaseService],
        }).compile();

        service = module.get<WebpackRulesBaseService>(WebpackRulesBaseService);
    });

    it('should be defined', () => {
        expect(service).toBeDefined();
    });
});
