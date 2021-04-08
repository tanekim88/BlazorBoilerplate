import { Test, TestingModule } from '@nestjs/testing';
import { WebpackPostcssFontMagicianService } from './webpack-postcss-font-magician.service';

describe('WebpackPostcssFontMagicianService', () => {
    let service: WebpackPostcssFontMagicianService;

    beforeEach(async () => {
        const module: TestingModule = await Test.createTestingModule({
            providers: [WebpackPostcssFontMagicianService],
        }).compile();

        service = module.get<WebpackPostcssFontMagicianService>(WebpackPostcssFontMagicianService);
    });

    it('should be defined', () => {
        expect(service).toBeDefined();
    });
});
