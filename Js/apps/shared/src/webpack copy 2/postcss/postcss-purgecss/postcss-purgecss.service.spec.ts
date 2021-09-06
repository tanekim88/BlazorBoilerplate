import { Test, TestingModule } from '@nestjs/testing';
import { WebpackPostcssPurgecssService } from './webpack-postcss-purgecss.service';

describe('WebpackPostcssPurgecssService', () => {
    let service: WebpackPostcssPurgecssService;

    beforeEach(async () => {
        const module: TestingModule = await Test.createTestingModule({
            providers: [WebpackPostcssPurgecssService],
        }).compile();

        service = module.get<WebpackPostcssPurgecssService>(WebpackPostcssPurgecssService);
    });

    it('should be defined', () => {
        expect(service).toBeDefined();
    });
});
