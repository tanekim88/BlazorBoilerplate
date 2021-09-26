import { OnModuleInit } from '@nestjs/common';
import path from 'path';
import { LOCAL_CONFIG } from '../../../../configs';
import { MergeService } from '../../utilities/modules/merge/merge/merge.service';

import { CustomInject, CustomInjectable } from '@projects/shared/src/functions/process-providers';
import { ConfigBase } from '../../../../configs.base';
import { RootPaths, rootPaths } from '@projects/root/paths';
import { sharedPaths } from '@projects/shared/paths';

type LocalPathsType = typeof sharedPaths;

@CustomInjectable()
export class EnvironmentService implements OnModuleInit {

    @CustomInject(LOCAL_CONFIG)
    public localConfig: ConfigBase;

    @CustomInject(MergeService)
    protected mergeService: MergeService;

    public isProduction: boolean;

    public isDevelopment: boolean;

    localPaths: LocalPathsType;

    LocalPaths: LocalPathsType;

    outputDir: string;

    logoPath: string;

    onModuleInit() {
        const relPath = path.relative(rootPaths.toAbsolutePath(), this.localConfig.rootDir);
        const splitted = relPath.split(path.sep);

        this.localPaths = splitted.reduce((acc, curr) => {
            acc = acc[curr];
            return acc;
        }, rootPaths as any);

        const RelPath = path.relative(RootPaths.toAbsolutePath(), this.localConfig.RootDir);
        const Splitted = RelPath.split(path.sep);

        this.LocalPaths = Splitted.reduce((acc, curr) => {
            acc = acc[curr];
            return acc;
        }, RootPaths as any);
        this.createEnvironments();
    }

    protected createEnvironments() {
        this.isProduction = process.env.NODE_ENV === 'production';
        this.isDevelopment = process.env.NODE_ENV === 'development';
        
        try {
            if (this.LocalPaths['wwwroot']) {
                this.outputDir = this.LocalPaths['wwwroot'].toAbsolutePath();
            }
        }catch(e){
        }

        this.logoPath = this.localPaths.src.logo['icon-512.png'].toAbsolutePath();
    }
}
