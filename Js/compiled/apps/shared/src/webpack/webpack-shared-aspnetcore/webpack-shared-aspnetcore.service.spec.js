import { Test } from '@nestjs/testing';
import { WebpackSharedAspnetcoreService } from './webpack-shared-aspnetcore.service';
describe('WebpackSharedAspnetcoreService', () => {
    let service;
    beforeEach(async () => {
        const module = await Test.createTestingModule({
            providers: [WebpackSharedAspnetcoreService],
        }).compile();
        service = module.get(WebpackSharedAspnetcoreService);
    });
    it('should be defined', () => {
        expect(service).toBeDefined();
    });
});
//# sourceMappingURL=webpack-shared-aspnetcore.service.spec.js.map