import { Test } from '@nestjs/testing';
import { EnvironmentService } from './environment.service';
describe('EnvironmentService', () => {
    let service;
    beforeEach(async () => {
        const module = await Test.createTestingModule({
            providers: [EnvironmentService],
        }).compile();
        service = module.get(EnvironmentService);
    });
    it('should be defined', () => {
        expect(service).toBeDefined();
    });
});
//# sourceMappingURL=environment.service.spec.js.map