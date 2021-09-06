import { Test, TestingModule } from '@nestjs/testing';
import { WebpackXmlRulesService } from './webpack-xml-rules.service';

describe('WebpackXmlRulesService', () => {
    let service: WebpackXmlRulesService;

    beforeEach(async () => {
        const module: TestingModule = await Test.createTestingModule({
            providers: [WebpackXmlRulesService],
        }).compile();

        service = module.get<WebpackXmlRulesService>(WebpackXmlRulesService);
    });

    it('should be defined', () => {
        expect(service).toBeDefined();
    });
});
