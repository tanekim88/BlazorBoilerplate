import { Injectable, OnModuleInit } from '@nestjs/common';
import { LOCAL_CONFIG } from '@shared/configs';
import { ConfigBase } from '@shared/configs.base';
import { CustomInject, CustomInjectable } from '@shared/src/functions/process-webpack-providers';
import { MergeService } from '../../utilities/merge/merge/merge.service';
import path from 'path';
import { sharedPaths } from '@shared/paths';
import { rootPaths } from '@root/paths';

type LocalPathsType = typeof sharedPaths;

@CustomInjectable()
export class PathService implements OnModuleInit {
    @CustomInject(LOCAL_CONFIG)
    public localConfig: ConfigBase;

    @CustomInject(MergeService)
    protected mergeService: MergeService;

    localPaths: LocalPathsType;

    outputDir: string;

    logoPath: string;

    onModuleInit() {
        this.localPaths = rootPaths[path.basename(this.localConfig.rootDir)];
        this.createEnvironments();
    }

    protected createEnvironments() {
        this.outputDir = this.localPaths['wwwroot'].toAbsolutePath();
        this.logoPath = this.localPaths.src.logo['icon-512.png'].toAbsolutePath();
    }
}
