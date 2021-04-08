"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const testing_1 = require("@nestjs/testing");
const webpack_shared_base_service_1 = require("./webpack-shared-base.service");
describe('WebpackSharedBaseService', () => {
    let service;
    beforeEach(async () => {
        const module = await testing_1.Test.createTestingModule({
            providers: [webpack_shared_base_service_1.WebpackSharedBaseService],
        }).compile();
        service = module.get(webpack_shared_base_service_1.WebpackSharedBaseService);
    });
    it('should be defined', () => {
        expect(service).toBeDefined();
    });
});
//# sourceMappingURL=webpack-shared-base.service.spec.js.map