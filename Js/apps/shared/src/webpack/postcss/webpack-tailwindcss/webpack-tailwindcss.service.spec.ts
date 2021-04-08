import { Test, TestingModule } from '@nestjs/testing';
import { WebpackTailwindcssService } from './webpack-tailwindcss.service';

describe('WebpackTailwindcssService', () => {
    let service: WebpackTailwindcssService;

    beforeEach(async () => {
        const module: TestingModule = await Test.createTestingModule({
            providers: [WebpackTailwindcssService],
        }).compile();

        service = module.get<WebpackTailwindcssService>(WebpackTailwindcssService);
    });

    it('should be defined', () => {
        expect(service).toBeDefined();
    });
});
