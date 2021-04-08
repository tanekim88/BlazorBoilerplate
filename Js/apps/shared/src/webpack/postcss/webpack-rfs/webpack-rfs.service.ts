import { WebpackPostcssBaseService } from '../webpack-postcss-base/webpack-postcss-base.service';
import Rfs from 'rfs';
import { CustomInjectable } from '@shared/src/functions/process-webpack-providers';

@CustomInjectable()
export class WebpackRfsService extends WebpackPostcssBaseService {
    constructor() {
        super(Rfs);
    }

    createOptions(options?: any): any {
        return this.mergeService.mergeOptions(super.createOptions(), {}, options);
    }
}
