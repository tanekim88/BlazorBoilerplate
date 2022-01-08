import { Test } from '@nestjs/testing';
import { ReactAppEnvironmentService } from './environment.service';
describe('ReactAppEnvironmentService', () => {
    let service;
    beforeEach(async () => {
        const module = await Test.createTestingModule({
            providers: [ReactAppEnvironmentService],
        }).compile();
        service = module.get(ReactAppEnvironmentService);
    });
    it('should be defined', () => {
        expect(service).toBeDefined();
    });
});
//# sourceMappingURL=environment.service.spec.js.map