import { Test } from '@nestjs/testing';
import { WebpackSharedService } from './webpack-shared.service';
describe('WebpackSharedService', () => {
    let service;
    beforeEach(async () => {
        const module = await Test.createTestingModule({
            providers: [WebpackSharedService],
        }).compile();
        service = module.get(WebpackSharedService);
    });
    it('should be defined', () => {
        expect(service).toBeDefined();
    });
});
//# sourceMappingURL=webpack-shared.service.spec.js.map