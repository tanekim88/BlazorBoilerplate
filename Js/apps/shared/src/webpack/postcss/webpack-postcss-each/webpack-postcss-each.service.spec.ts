import { Test, TestingModule } from '@nestjs/testing';
import { WebpackPostcssEachService } from './webpack-postcss-each.service';

describe('WebpackPostcssEachService', () => {
    let service: WebpackPostcssEachService;

    beforeEach(async () => {
        const module: TestingModule = await Test.createTestingModule({
            providers: [WebpackPostcssEachService],
        }).compile();

        service = module.get<WebpackPostcssEachService>(WebpackPostcssEachService);
    });

    it('should be defined', () => {
        expect(service).toBeDefined();
    });
});
