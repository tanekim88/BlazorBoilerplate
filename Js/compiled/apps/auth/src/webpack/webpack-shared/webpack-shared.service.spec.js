"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const testing_1 = require("@nestjs/testing");
const webpack_shared_service_1 = require("./webpack-shared.service");
describe('AuthWebpackSharedService', () => {
    let service;
    beforeEach(async () => {
        const module = await testing_1.Test.createTestingModule({
            providers: [webpack_shared_service_1.AuthWebpackSharedService],
        }).compile();
        service = module.get(webpack_shared_service_1.AuthWebpackSharedService);
    });
    it('should be defined', () => {
        expect(service).toBeDefined();
    });
});
//# sourceMappingURL=webpack-shared.service.spec.js.map