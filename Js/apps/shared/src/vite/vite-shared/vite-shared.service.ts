import { ViteBaseService } from '../Vite-base/Vite-base.service';


import { CustomInjectable } from '@shared/src/functions/process-providers';
import { UserConfig } from 'vite';

@CustomInjectable()
export class ViteSharedService extends ViteBaseService {
  
    createConfiguration(options?:UserConfig) {
        return this.mergeService.mergeOptions(
            super.createConfiguration(),{
                plugins:[
                    
                ],
                resolve:{
                    extensions:['.mjs', '.js', '.ts', '.jsx', '.tsx', '.json']
                },
                css:{
                    preprocessorOptions:{
                        scss: {
                            // additionalData: `$injectedColor: orange;`
                          }
                    }
                },
                json:{
                    namedExports:true,
                    stringify:false
                },
                esbuild:{
                    
                }
            } as UserConfig,
            options,
        );
    }

    createManyConfigurations(){
        return [];
    }
}
