import { Test, TestingModule } from '@nestjs/testing';
import { BlazorAppWebpackXmlRulesService } from './webpack-xml-rules.service';

describe('BlazorAppWebpackXmlRulesService', () => {
    let service: BlazorAppWebpackXmlRulesService;

    beforeEach(async () => {
        const module: TestingModule = await Test.createTestingModule({
            providers: [BlazorAppWebpackXmlRulesService],
        }).compile();

        service = module.get<BlazorAppWebpackXmlRulesService>(BlazorAppWebpackXmlRulesService);
    });

    it('should be defined', () => {
        expect(service).toBeDefined();
    });
});
