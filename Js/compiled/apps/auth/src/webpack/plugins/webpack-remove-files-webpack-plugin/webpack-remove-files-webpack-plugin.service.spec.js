import { Test } from '@nestjs/testing';
import { AuthWebpackPreRemoveFilesWebpackPluginService } from './webpack-remove-files-webpack-plugin.service';
describe('AuthWebpackPreRemoveFilesWebpackPluginService', () => {
    let service;
    beforeEach(async () => {
        const module = await Test.createTestingModule({
            providers: [AuthWebpackPreRemoveFilesWebpackPluginService],
        }).compile();
        service = module.get(AuthWebpackPreRemoveFilesWebpackPluginService);
    });
    it('should be defined', () => {
        expect(service).toBeDefined();
    });
});
//# sourceMappingURL=webpack-remove-files-webpack-plugin.service.spec.js.map