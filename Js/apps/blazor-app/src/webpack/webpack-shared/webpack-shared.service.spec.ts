import { Test, TestingModule } from '@nestjs/testing';
import { BlazorAppWebpackSharedService } from './webpack-shared.service';

describe('BlazorAppWebpackSharedService', () => {
    let service: BlazorAppWebpackSharedService;

    beforeEach(async () => {
        const module: TestingModule = await Test.createTestingModule({
            providers: [BlazorAppWebpackSharedService],
        }).compile();

        service = module.get<BlazorAppWebpackSharedService>(BlazorAppWebpackSharedService);
    });

    it('should be defined', () => {
        expect(service).toBeDefined();
    });
});
