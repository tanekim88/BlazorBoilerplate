import { Test, TestingModule } from '@nestjs/testing';
import { BlazorAppWebpackPreRemoveFilesWebpackPluginService } from './webpack-remove-files-webpack-plugin.service';

describe('BlazorAppWebpackPreRemoveFilesWebpackPluginService', () => {
    let service: BlazorAppWebpackPreRemoveFilesWebpackPluginService;

    beforeEach(async () => {
        const module: TestingModule = await Test.createTestingModule({
            providers: [BlazorAppWebpackPreRemoveFilesWebpackPluginService],
        }).compile();

        service = module.get<BlazorAppWebpackPreRemoveFilesWebpackPluginService>(
            BlazorAppWebpackPreRemoveFilesWebpackPluginService,
        );
    });

    it('should be defined', () => {
        expect(service).toBeDefined();
    });
});
