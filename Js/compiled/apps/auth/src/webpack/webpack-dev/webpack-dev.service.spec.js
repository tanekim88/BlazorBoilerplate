"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const testing_1 = require("@nestjs/testing");
const webpack_dev_service_1 = require("./webpack-dev.service");
describe('AuthWebpackDevService', () => {
    let service;
    beforeEach(async () => {
        const module = await testing_1.Test.createTestingModule({
            providers: [webpack_dev_service_1.AuthWebpackDevService],
        }).compile();
        service = module.get(webpack_dev_service_1.AuthWebpackDevService);
    });
    it('should be defined', () => {
        expect(service).toBeDefined();
    });
});
//# sourceMappingURL=webpack-dev.service.spec.js.map