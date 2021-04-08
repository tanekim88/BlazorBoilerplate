import { Test, TestingModule } from '@nestjs/testing';
import { AuthWebpackXmlRulesService } from './webpack-xml-rules.service';

describe('AuthWebpackXmlRulesService', () => {
    let service: AuthWebpackXmlRulesService;

    beforeEach(async () => {
        const module: TestingModule = await Test.createTestingModule({
            providers: [AuthWebpackXmlRulesService],
        }).compile();

        service = module.get<AuthWebpackXmlRulesService>(AuthWebpackXmlRulesService);
    });

    it('should be defined', () => {
        expect(service).toBeDefined();
    });
});
