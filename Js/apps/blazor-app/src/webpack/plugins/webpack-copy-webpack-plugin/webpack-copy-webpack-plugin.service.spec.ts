import { Test, TestingModule } from '@nestjs/testing';
import { BlazorAppWebpackCopyWebpackPluginService } from './webpack-copy-webpack-plugin.service';

describe('BlazorAppWebpackCopyWebpackPluginService', () => {
    let service: BlazorAppWebpackCopyWebpackPluginService;

    beforeEach(async () => {
        const module: TestingModule = await Test.createTestingModule({
            providers: [BlazorAppWebpackCopyWebpackPluginService],
        }).compile();

        service = module.get<BlazorAppWebpackCopyWebpackPluginService>(BlazorAppWebpackCopyWebpackPluginService);
    });

    it('should be defined', () => {
        expect(service).toBeDefined();
    });
});
