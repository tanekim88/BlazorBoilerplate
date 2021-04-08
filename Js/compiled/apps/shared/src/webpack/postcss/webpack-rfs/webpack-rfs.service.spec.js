"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const testing_1 = require("@nestjs/testing");
const webpack_rfs_service_1 = require("./webpack-rfs.service");
describe('WebpackRfsService', () => {
    let service;
    beforeEach(async () => {
        const module = await testing_1.Test.createTestingModule({
            providers: [webpack_rfs_service_1.WebpackRfsService],
        }).compile();
        service = module.get(webpack_rfs_service_1.WebpackRfsService);
    });
    it('should be defined', () => {
        expect(service).toBeDefined();
    });
});
//# sourceMappingURL=webpack-rfs.service.spec.js.map