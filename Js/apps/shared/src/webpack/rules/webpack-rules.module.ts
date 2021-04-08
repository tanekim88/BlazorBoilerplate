import { WebpackCsvRulesService } from './webpack-csv-rules/webpack-csv-rules.service';
import { WebpackFontRulesService } from './webpack-font-rules/webpack-font-rules.service';
import { WebpackImageRulesService } from './webpack-image-rules/webpack-image-rules.service';
import { WebpackJsonRulesService } from './webpack-json-rules/webpack-json-rules.service';
import { WebpackStyleRulesService } from './webpack-style-rules/webpack-style-rules.service';
import { WebpackSvgRulesService } from './webpack-svg-rules/webpack-svg-rules.service';
import { WebpackTsRulesService } from './webpack-ts-rules/webpack-ts-rules.service';
import { WebpackXmlRulesService } from './webpack-xml-rules/webpack-xml-rules.service';
import { WebpackRulesConfigService, WebpackRulesService } from './webpack-rules/webpack-rules.service';
import { CustomModule } from '../../functions/process-webpack-providers';
import { WebpackRulesBaseService } from './webpack-rules-base/webpack-rules-base.service';

@CustomModule({
    providers: [
        WebpackRulesConfigService,
        WebpackRulesService,
        WebpackRulesBaseService,
        WebpackCsvRulesService,
        WebpackFontRulesService,
        WebpackImageRulesService,
        WebpackJsonRulesService,
        WebpackStyleRulesService,
        WebpackSvgRulesService,
        WebpackTsRulesService,
        WebpackXmlRulesService,
    ],
    imports: [],
})
export class WebpackRulesModule {}
