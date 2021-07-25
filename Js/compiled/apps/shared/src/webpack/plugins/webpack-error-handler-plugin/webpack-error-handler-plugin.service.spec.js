import { Test } from '@nestjs/testing';
import { WebpackErrorHandlerPluginService } from './webpack-error-handler-plugin.service';
describe('WebpackErrorHandlerPluginService', () => {
    let service;
    beforeEach(async () => {
        const module = await Test.createTestingModule({
            providers: [WebpackErrorHandlerPluginService],
        }).compile();
        service = module.get(WebpackErrorHandlerPluginService);
    });
    it('should be defined', () => {
        expect(service).toBeDefined();
    });
});
//# sourceMappingURL=webpack-error-handler-plugin.service.spec.js.map