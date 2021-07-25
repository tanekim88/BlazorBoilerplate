import { CustomInjectable } from '@shared/src/functions/process-providers';

import {
    WebpackWatchEntriesPluginConfigService,
    WebpackWatchEntriesPluginService,
} from '@shared/src/webpack/plugins/webpack-watch-entries-plugin/webpack-watch-entries-plugin.service';

@CustomInjectable()
export class BlazorAppWebpackWatchEntriesPluginConfigService extends WebpackWatchEntriesPluginConfigService {
    createOptions(options?) {
        return this.mergeService.mergeOptions(
            super.createOptions(),
            {
                id: WebpackWatchEntriesPluginConfigService.name,
                outputPath: this.environmentService.outputDir,
            },
            options,
        );
    }
}

@CustomInjectable()
export class BlazorAppWebpackWatchEntriesPluginService extends WebpackWatchEntriesPluginService {
    createOptions(options?) {
        return this.mergeService.mergeOptions(
            super.createOptions(),
            {
                id: WebpackWatchEntriesPluginService.name,
                outputPath: this.environmentService.outputDir,
            },
            options,
        );
    }
}
