"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const testing_1 = require("@nestjs/testing");
const webpack_shared_aspnetcore_service_1 = require("./webpack-shared-aspnetcore.service");
describe('WebpackSharedAspnetcoreService', () => {
    let service;
    beforeEach(async () => {
        const module = await testing_1.Test.createTestingModule({
            providers: [webpack_shared_aspnetcore_service_1.WebpackSharedAspnetcoreService],
        }).compile();
        service = module.get(webpack_shared_aspnetcore_service_1.WebpackSharedAspnetcoreService);
    });
    it('should be defined', () => {
        expect(service).toBeDefined();
    });
});
//# sourceMappingURL=webpack-shared-aspnetcore.service.spec.js.map