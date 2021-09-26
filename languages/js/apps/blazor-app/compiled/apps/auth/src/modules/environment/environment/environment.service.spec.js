import { Test } from '@nestjs/testing';
import { AuthEnvironmentService } from './environment.service';
describe('AuthEnvironmentService', () => {
    let service;
    beforeEach(async () => {
        const module = await Test.createTestingModule({
            providers: [AuthEnvironmentService],
        }).compile();
        service = module.get(AuthEnvironmentService);
    });
    it('should be defined', () => {
        expect(service).toBeDefined();
    });
});
//# sourceMappingURL=environment.service.spec.js.map