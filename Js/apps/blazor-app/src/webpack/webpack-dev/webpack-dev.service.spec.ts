import { Test, TestingModule } from '@nestjs/testing';
import { BlazorAppWebpackDevService } from './webpack-dev.service';

describe('BlazorAppWebpackDevService', () => {
    let service: BlazorAppWebpackDevService;

    beforeEach(async () => {
        const module: TestingModule = await Test.createTestingModule({
            providers: [BlazorAppWebpackDevService],
        }).compile();

        service = module.get<BlazorAppWebpackDevService>(BlazorAppWebpackDevService);
    });

    it('should be defined', () => {
        expect(service).toBeDefined();
    });
});
