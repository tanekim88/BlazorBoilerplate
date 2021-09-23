import { Test } from '@nestjs/testing';
import { SolidAppEnvironmentService } from './environment.service';
describe('SolidAppEnvironmentService', () => {
    let service;
    beforeEach(async () => {
        const module = await Test.createTestingModule({
            providers: [SolidAppEnvironmentService],
        }).compile();
        service = module.get(SolidAppEnvironmentService);
    });
    it('should be defined', () => {
        expect(service).toBeDefined();
    });
});
//# sourceMappingURL=environment.service.spec.js.map