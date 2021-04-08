"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const testing_1 = require("@nestjs/testing");
const merge_service_1 = require("./merge.service");
describe('BlazorAppMergeService', () => {
    let service;
    beforeEach(async () => {
        const module = await testing_1.Test.createTestingModule({
            providers: [merge_service_1.BlazorAppMergeService],
        }).compile();
        service = module.get(merge_service_1.BlazorAppMergeService);
    });
    it('should be defined', () => {
        expect(service).toBeDefined();
    });
});
//# sourceMappingURL=merge.service.spec.js.map