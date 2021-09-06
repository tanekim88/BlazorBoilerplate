import { Test } from '@nestjs/testing';
import { SolidAppWebpackDevService } from './webpack-dev.service';
describe('SolidAppWebpackDevService', () => {
    let service;
    beforeEach(async () => {
        const module = await Test.createTestingModule({
            providers: [SolidAppWebpackDevService],
        }).compile();
        service = module.get(SolidAppWebpackDevService);
    });
    it('should be defined', () => {
        expect(service).toBeDefined();
    });
});
//# sourceMappingURL=webpack-dev.service.spec.js.map