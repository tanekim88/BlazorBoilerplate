import { Test, TestingModule } from '@nestjs/testing';
import { WebpackPostcssService } from './webpack-postcss.service';

describe('WebpackPostcssService', () => {
    let service: WebpackPostcssService;

    beforeEach(async () => {
        const module: TestingModule = await Test.createTestingModule({
            providers: [WebpackPostcssService],
        }).compile();

        service = module.get<WebpackPostcssService>(WebpackPostcssService);
    });

    it('should be defined', () => {
        expect(service).toBeDefined();
    });
});
