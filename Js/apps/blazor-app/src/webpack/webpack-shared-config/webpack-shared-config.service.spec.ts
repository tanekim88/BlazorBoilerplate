import { Test, TestingModule } from '@nestjs/testing';
import { BlazorAppWebpackSharedConfigService } from './webpack-shared-config.service';

describe('BlazorAppWebpackSharedConfigService', () => {
    let service: BlazorAppWebpackSharedConfigService;

    beforeEach(async () => {
        const module: TestingModule = await Test.createTestingModule({
            providers: [BlazorAppWebpackSharedConfigService],
        }).compile();

        service = module.get<BlazorAppWebpackSharedConfigService>(BlazorAppWebpackSharedConfigService);
    });

    it('should be defined', () => {
        expect(service).toBeDefined();
    });
});
