import { Test } from '@nestjs/testing';
import { VitePluginHtmlService } from './vite-plugin-html.service';
describe('VitePluginHtmlService', () => {
    let service;
    beforeEach(async () => {
        const module = await Test.createTestingModule({
            providers: [VitePluginHtmlService],
        }).compile();
        service = module.get(VitePluginHtmlService);
    });
    it('should be defined', () => {
        expect(service).toBeDefined();
    });
});
//# sourceMappingURL=vite-plugin-html.service.spec.js.map