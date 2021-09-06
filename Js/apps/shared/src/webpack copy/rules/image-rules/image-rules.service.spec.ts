import { Test, TestingModule } from '@nestjs/testing';
import { WebpackImageRulesService } from './webpack-image-rules.service';

describe('WebpackImageRulesService', () => {
    let service: WebpackImageRulesService;

    beforeEach(async () => {
        const module: TestingModule = await Test.createTestingModule({
            providers: [WebpackImageRulesService],
        }).compile();

        service = module.get<WebpackImageRulesService>(WebpackImageRulesService);
    });

    it('should be defined', () => {
        expect(service).toBeDefined();
    });
});
