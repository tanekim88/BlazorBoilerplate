import { Test } from '@nestjs/testing';
import { SolidAppWebpackSharedService } from './webpack-shared.service';
describe('SolidAppWebpackSharedService', () => {
    let service;
    beforeEach(async () => {
        const module = await Test.createTestingModule({
            providers: [SolidAppWebpackSharedService],
        }).compile();
        service = module.get(SolidAppWebpackSharedService);
    });
    it('should be defined', () => {
        expect(service).toBeDefined();
    });
});
//# sourceMappingURL=webpack-shared.service.spec.js.map