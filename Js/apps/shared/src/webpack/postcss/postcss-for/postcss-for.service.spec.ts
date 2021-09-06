import { Test, TestingModule } from '@nestjs/testing';
import { WebpackPostcssForService } from './webpack-postcss-for.service';

describe('WebpackPostcssForService', () => {
    let service: WebpackPostcssForService;

    beforeEach(async () => {
        const module: TestingModule = await Test.createTestingModule({
            providers: [WebpackPostcssForService],
        }).compile();

        service = module.get<WebpackPostcssForService>(WebpackPostcssForService);
    });

    it('should be defined', () => {
        expect(service).toBeDefined();
    });
});
