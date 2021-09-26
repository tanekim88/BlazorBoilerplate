import { Test } from '@nestjs/testing';
import { WebpackDevService } from './webpack-dev.service';
describe('WebpackDevService', () => {
    let service;
    beforeEach(async () => {
        const module = await Test.createTestingModule({
            providers: [WebpackDevService],
        }).compile();
        service = module.get(WebpackDevService);
    });
    it('should be defined', () => {
        expect(service).toBeDefined();
    });
});
//# sourceMappingURL=dev.service.spec.js.map