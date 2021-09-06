import { Test } from '@nestjs/testing';
import { AuthWebpackDevService } from './webpack-dev.service';
describe('AuthWebpackDevService', () => {
    let service;
    beforeEach(async () => {
        const module = await Test.createTestingModule({
            providers: [AuthWebpackDevService],
        }).compile();
        service = module.get(AuthWebpackDevService);
    });
    it('should be defined', () => {
        expect(service).toBeDefined();
    });
});
//# sourceMappingURL=webpack-dev.service.spec.js.map