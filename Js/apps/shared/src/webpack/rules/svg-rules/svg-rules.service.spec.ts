import { Test, TestingModule } from '@nestjs/testing';
import { WebpackSvgRulesService } from './webpack-svg-rules.service';

describe('WebpackSvgRulesService', () => {
    let service: WebpackSvgRulesService;

    beforeEach(async () => {
        const module: TestingModule = await Test.createTestingModule({
            providers: [WebpackSvgRulesService],
        }).compile();

        service = module.get<WebpackSvgRulesService>(WebpackSvgRulesService);
    });

    it('should be defined', () => {
        expect(service).toBeDefined();
    });
});
