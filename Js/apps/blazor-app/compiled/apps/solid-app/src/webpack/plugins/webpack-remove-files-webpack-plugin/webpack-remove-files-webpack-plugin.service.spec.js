import { Test } from '@nestjs/testing';
import { SolidAppWebpackPreRemoveFilesWebpackPluginService } from './webpack-remove-files-webpack-plugin.service';
describe('SolidAppWebpackPreRemoveFilesWebpackPluginService', () => {
    let service;
    beforeEach(async () => {
        const module = await Test.createTestingModule({
            providers: [SolidAppWebpackPreRemoveFilesWebpackPluginService],
        }).compile();
        service = module.get(SolidAppWebpackPreRemoveFilesWebpackPluginService);
    });
    it('should be defined', () => {
        expect(service).toBeDefined();
    });
});
//# sourceMappingURL=webpack-remove-files-webpack-plugin.service.spec.js.map