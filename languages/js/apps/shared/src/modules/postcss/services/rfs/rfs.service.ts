import { PostcssBaseService } from '../../postcss-base/postcss-base.service';
import Rfs from 'rfs';
import { CustomInjectable } from '#shared/src/functions/process-providers';

@CustomInjectable()
export class RfsService extends PostcssBaseService {
    constructor() {
        super(Rfs);
    }

    createOptions(options?: any): any {
        return this.mergeService.mergeOptions(super.createOptions(), {}, options);
    }
}
