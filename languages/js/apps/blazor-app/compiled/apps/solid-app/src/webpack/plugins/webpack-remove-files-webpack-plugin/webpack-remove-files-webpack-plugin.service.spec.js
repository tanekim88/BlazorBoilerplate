import { Test } from '@nestjs/testing';
import { BlazorAppWebpackPreRemoveFilesWebpackPluginService } from './webpack-remove-files-webpack-plugin.service';
describe('BlazorAppWebpackPreRemoveFilesWebpackPluginService', () => {
    let service;
    beforeEach(async () => {
        const module = await Test.createTestingModule({
            providers: [BlazorAppWebpackPreRemoveFilesWebpackPluginService],
        }).compile();
        service = module.get(BlazorAppWebpackPreRemoveFilesWebpackPluginService);
    });
    it('should be defined', () => {
        expect(service).toBeDefined();
    });
});
//# sourceMappingURL=webpack-remove-files-webpack-plugin.service.spec.js.map