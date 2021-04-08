import { Test, TestingModule } from '@nestjs/testing';
import { BlazorAppWebpackProdService } from './webpack-prod.service';

describe('BlazorAppWebpackProdService', () => {
    let service: BlazorAppWebpackProdService;

    beforeEach(async () => {
        const module: TestingModule = await Test.createTestingModule({
            providers: [BlazorAppWebpackProdService],
        }).compile();

        service = module.get<BlazorAppWebpackProdService>(BlazorAppWebpackProdService);
    });

    it('should be defined', () => {
        expect(service).toBeDefined();
    });
});
