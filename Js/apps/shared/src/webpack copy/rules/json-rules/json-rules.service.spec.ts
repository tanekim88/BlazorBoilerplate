import { Test, TestingModule } from '@nestjs/testing';
import { WebpackJsonRulesService } from './webpack-json-rules.service';

describe('WebpackJsonRulesService', () => {
    let service: WebpackJsonRulesService;

    beforeEach(async () => {
        const module: TestingModule = await Test.createTestingModule({
            providers: [WebpackJsonRulesService],
        }).compile();

        service = module.get<WebpackJsonRulesService>(WebpackJsonRulesService);
    });

    it('should be defined', () => {
        expect(service).toBeDefined();
    });
});
