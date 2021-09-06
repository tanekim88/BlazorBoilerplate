import { Test, TestingModule } from '@nestjs/testing';
import { WebpackStylelintService } from './webpack-stylelint.service';

describe('WebpackStylelintService', () => {
    let service: WebpackStylelintService;

    beforeEach(async () => {
        const module: TestingModule = await Test.createTestingModule({
            providers: [WebpackStylelintService],
        }).compile();

        service = module.get<WebpackStylelintService>(WebpackStylelintService);
    });

    it('should be defined', () => {
        expect(service).toBeDefined();
    });
});
