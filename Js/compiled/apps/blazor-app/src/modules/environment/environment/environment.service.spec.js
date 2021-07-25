import { Test } from '@nestjs/testing';
import { BlazorAppEnvironmentService } from './environment.service';
describe('BlazorAppEnvironmentService', () => {
    let service;
    beforeEach(async () => {
        const module = await Test.createTestingModule({
            providers: [BlazorAppEnvironmentService],
        }).compile();
        service = module.get(BlazorAppEnvironmentService);
    });
    it('should be defined', () => {
        expect(service).toBeDefined();
    });
});
//# sourceMappingURL=environment.service.spec.js.map