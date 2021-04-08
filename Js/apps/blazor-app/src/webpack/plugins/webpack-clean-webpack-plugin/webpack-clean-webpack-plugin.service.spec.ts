import { Test, TestingModule } from '@nestjs/testing';
import { BlazorAppWebpackCleanWebpackPluginService } from './webpack-clean-webpack-plugin.service';

describe('BlazorAppWebpackCleanWebpackPluginService', () => {
    let service: BlazorAppWebpackCleanWebpackPluginService;

    beforeEach(async () => {
        const module: TestingModule = await Test.createTestingModule({
            providers: [BlazorAppWebpackCleanWebpackPluginService],
        }).compile();

        service = module.get<BlazorAppWebpackCleanWebpackPluginService>(BlazorAppWebpackCleanWebpackPluginService);
    });

    it('should be defined', () => {
        expect(service).toBeDefined();
    });
});
