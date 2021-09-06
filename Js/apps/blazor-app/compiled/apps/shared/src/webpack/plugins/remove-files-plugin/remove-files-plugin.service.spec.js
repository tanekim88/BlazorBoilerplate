import { Test } from '@nestjs/testing';
import { WebpackRemoveFilesWebpackPluginService } from './webpack-remove-files-webpack-plugin.service';
describe('WebpackRemoveFilesWebpackPluginService', () => {
    let service;
    beforeEach(async () => {
        const module = await Test.createTestingModule({
            providers: [WebpackRemoveFilesWebpackPluginService],
        }).compile();
        service = module.get(WebpackRemoveFilesWebpackPluginService);
    });
    it('should be defined', () => {
        expect(service).toBeDefined();
    });
});
//# sourceMappingURL=remove-files-plugin.service.spec.js.map