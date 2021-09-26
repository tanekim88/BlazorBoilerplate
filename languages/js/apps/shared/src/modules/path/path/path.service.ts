import { Injectable, OnModuleInit } from '@nestjs/common';
import { LOCAL_CONFIG } from '@projects/shared/configs';
import { ConfigBase } from '@projects/shared/configs.base';
import { CustomInject, CustomInjectable } from '@projects/shared/src/functions/process-providers';
import { MergeService } from '../../utilities/modules/merge/merge/merge.service';
import path from 'path';
import { sharedPaths } from '@projects/shared/paths';
import { rootPaths } from '@projects/root/paths';

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
