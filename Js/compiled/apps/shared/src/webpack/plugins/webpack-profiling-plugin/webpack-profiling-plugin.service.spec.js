import { Test } from '@nestjs/testing';
import { WebpackProfilingPluginService } from './webpack-profiling-plugin.service';
describe('WebpackProfilingPluginService', () => {
    let service;
    beforeEach(async () => {
        const module = await Test.createTestingModule({
            providers: [WebpackProfilingPluginService],
        }).compile();
        service = module.get(WebpackProfilingPluginService);
    });
    it('should be defined', () => {
        expect(service).toBeDefined();
    });
});
//# sourceMappingURL=webpack-profiling-plugin.service.spec.js.map