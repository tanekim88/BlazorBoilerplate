import { CustomInjectable } from '#shared/src/functions/process-providers';
import _ from 'lodash';
import { mergeCustomizer } from './merge-with-customizer';

@CustomInjectable()
export class MergeService {
    mergeOptions(...objs: any[]) {
        if(Array.isArray(objs[0])){
            return objs.reduce((acc, curr) => {
                return _.mergeWith(acc, curr, mergeCustomizer());
            }, []);
        }

        return objs.reduce((acc, curr) => {
            return _.mergeWith(acc, curr, mergeCustomizer());
        }, {});
    }

    smartlyMergeOptions(obj1: any, obj2: any) {
        const toMerge = [obj1, obj2].flat(Infinity);

        return this.mergeOptions(...toMerge);
    }
}
