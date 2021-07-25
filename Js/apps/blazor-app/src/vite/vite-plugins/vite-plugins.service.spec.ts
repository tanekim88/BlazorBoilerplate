import { Test, TestingModule } from '@nestjs/testing';
import { BlazorAppWebpackPluginsConfigService } from './webpack-plugins.service';

describe('BlazorAppWebpackPluginsConfigService', () => {
    let service: BlazorAppWebpackPluginsConfigService;

    beforeEach(async () => {
        const module: TestingModule = await Test.createTestingModule({
            providers: [BlazorAppWebpackPluginsConfigService],
        }).compile();

        service = module.get<BlazorAppWebpackPluginsConfigService>(BlazorAppWebpackPluginsConfigService);
    });

    it('should be defined', () => {
        expect(service).toBeDefined();
    });
});
