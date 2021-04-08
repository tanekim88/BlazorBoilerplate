import { Test, TestingModule } from '@nestjs/testing';
import { WebpackRemoveFilesWebpackPluginService } from './webpack-remove-files-webpack-plugin.service';

describe('WebpackRemoveFilesWebpackPluginService', () => {
    let service: WebpackRemoveFilesWebpackPluginService;

    beforeEach(async () => {
        const module: TestingModule = await Test.createTestingModule({
            providers: [WebpackRemoveFilesWebpackPluginService],
        }).compile();

        service = module.get<WebpackRemoveFilesWebpackPluginService>(WebpackRemoveFilesWebpackPluginService);
    });

    it('should be defined', () => {
        expect(service).toBeDefined();
    });
});
