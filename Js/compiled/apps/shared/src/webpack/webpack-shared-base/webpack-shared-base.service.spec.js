import { Test } from '@nestjs/testing';
import { WebpackSharedBaseService } from './webpack-shared-base.service';
describe('WebpackSharedBaseService', () => {
    let service;
    beforeEach(async () => {
        const module = await Test.createTestingModule({
            providers: [WebpackSharedBaseService],
        }).compile();
        service = module.get(WebpackSharedBaseService);
    });
    it('should be defined', () => {
        expect(service).toBeDefined();
    });
});
//# sourceMappingURL=webpack-shared-base.service.spec.js.map