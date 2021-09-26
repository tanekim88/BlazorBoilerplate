import { Test } from '@nestjs/testing';
import { BlazorAppWebpackDevService } from './webpack-dev.service';
describe('BlazorAppWebpackDevService', () => {
    let service;
    beforeEach(async () => {
        const module = await Test.createTestingModule({
            providers: [BlazorAppWebpackDevService],
        }).compile();
        service = module.get(BlazorAppWebpackDevService);
    });
    it('should be defined', () => {
        expect(service).toBeDefined();
    });
});
//# sourceMappingURL=webpack-dev.service.spec.js.map