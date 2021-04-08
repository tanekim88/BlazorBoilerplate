"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const testing_1 = require("@nestjs/testing");
const webpack_webpack_pwa_manifest_service_1 = require("./webpack-webpack-pwa-manifest.service");
describe('WebpackWebpackPwaManifestService', () => {
    let service;
    beforeEach(async () => {
        const module = await testing_1.Test.createTestingModule({
            providers: [webpack_webpack_pwa_manifest_service_1.WebpackWebpackPwaManifestService],
        }).compile();
        service = module.get(webpack_webpack_pwa_manifest_service_1.WebpackWebpackPwaManifestService);
    });
    it('should be defined', () => {
        expect(service).toBeDefined();
    });
});
//# sourceMappingURL=webpack-webpack-pwa-manifest.service.spec.js.map