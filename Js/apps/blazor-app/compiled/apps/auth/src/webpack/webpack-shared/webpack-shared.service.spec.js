import { Test } from '@nestjs/testing';
import { AuthWebpackSharedService } from './webpack-shared.service';
describe('AuthWebpackSharedService', () => {
    let service;
    beforeEach(async () => {
        const module = await Test.createTestingModule({
            providers: [AuthWebpackSharedService],
        }).compile();
        service = module.get(AuthWebpackSharedService);
    });
    it('should be defined', () => {
        expect(service).toBeDefined();
    });
});
//# sourceMappingURL=webpack-shared.service.spec.js.map