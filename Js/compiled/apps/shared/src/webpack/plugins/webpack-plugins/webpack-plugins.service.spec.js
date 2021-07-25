import { Test } from '@nestjs/testing';
import { WebpackPluginsService } from './webpack-plugins.service';
describe('WebpackPluginsService', () => {
    let service;
    beforeEach(async () => {
        const module = await Test.createTestingModule({
            providers: [WebpackPluginsService],
        }).compile();
        service = module.get(WebpackPluginsService);
    });
    it('should be defined', () => {
        expect(service).toBeDefined();
    });
});
//# sourceMappingURL=webpack-plugins.service.spec.js.map