import { MergeCommandOption } from './merge-command-option';
import _ from 'lodash';

export function mergeCustomizer(mergeDefault: MergeCommandOption = MergeCommandOption.append) {
    return (objValue, srcValue, key, object, source, stack) => {
        // if (srcValue && srcValue[0]?.name === 'prepend') {
        //     debugger;
        // }

        if (_.isNil(objValue)) {
            return srcValue;
        }

        if (_.isObject(objValue) && _.isObject(srcValue)) {
            if ((_.isArray(objValue) && !_.isArray(srcValue)) || (!_.isArray(objValue) && _.isArray(srcValue))) {
                throw new Error('Property type mismatch.');
            }
        }

        if (typeof srcValue === 'string') {
            return srcValue;
        }

        if (_.isArray(objValue)) {
            if (objValue.length > 0) {
                let toReturn = [];

                objValue.forEach((s) => {
                    if (s[0]?.token !== MergeCommandOption.token) {
                        s = [mergeDefault, [s]];
                    }

                    const command = s[0];

                    switch (command) {
                        case MergeCommandOption.prepend:
                            toReturn = [].concat(s[1]).concat(toReturn);
                            break;
                        case MergeCommandOption.overwrite:
                            toReturn = [];
                            toReturn = toReturn.concat(s[1]);
                            break;
                        case MergeCommandOption.overwriteCommandsOnly:
                            toReturn = toReturn.filter((t) => t[0]?.token !== MergeCommandOption.token);
                            toReturn = toReturn.concat(s[1]);
                            break;
                        case MergeCommandOption.getOverwritten:
                            break;
                        case MergeCommandOption.append:
                            toReturn = toReturn.concat(s[1]);
                            break;
                        case MergeCommandOption.deleteFirstOne:
                            toReturn.shift();
                            break;
                        case MergeCommandOption.deleteFirstN:
                            toReturn.splice(0, s[1][0]);
                            break;
                        case MergeCommandOption.deleteLastOne:
                            toReturn.pop();
                            break;
                        case MergeCommandOption.deleteLastN:
                            toReturn.splice(toReturn.length - s[1][0]);
                            break;
                        case MergeCommandOption.makeThemUnique:
                            toReturn = _.uniq(toReturn);
                            break;
                        case MergeCommandOption.customMerge:
                            toReturn = s[1][0](toReturn);
                            break;
                        default:
                            toReturn.push(s[1][0]);
                            break;
                    }
                });

                objValue = toReturn;
            }

            if (_.isArray(srcValue) && srcValue.length > 0) {
                let toReturn = objValue;

                srcValue.forEach((s) => {
                    if (s[0]?.token !== MergeCommandOption.token) {
                        s = [mergeDefault, s];
                    }

                    const command = s[0];

                    switch (command) {
                        case MergeCommandOption.prepend:
                            toReturn = [].concat(s[1]).concat(toReturn);
                            break;
                        case MergeCommandOption.overwrite:
                            toReturn = [];
                            toReturn = toReturn.concat(s[1]);
                            break;
                        case MergeCommandOption.overwriteCommandsOnly:
                            toReturn = toReturn.filter((t) => t[0]?.token !== MergeCommandOption.token);
                            toReturn = toReturn.concat(s[1]);
                            break;
                        case MergeCommandOption.getOverwritten:
                            break;
                        case MergeCommandOption.append:
                            toReturn = toReturn.concat(s[1]);
                            break;
                        case MergeCommandOption.deleteFirstOne:
                            toReturn.shift();
                            break;
                        case MergeCommandOption.deleteFirstN:
                            toReturn.splice(0, s[1][0]);
                            break;
                        case MergeCommandOption.deleteLastOne:
                            toReturn.pop();
                            break;
                        case MergeCommandOption.deleteLastN:
                            toReturn.splice(toReturn.length - s[1][0]);
                            break;
                        case MergeCommandOption.makeThemUnique:
                            toReturn = _.uniq(toReturn);
                            break;
                        case MergeCommandOption.customMerge:
                            toReturn = s[1][0](toReturn);
                            break;
                        default:
                            toReturn.push(s[1][0]);
                            break;
                    }
                });

                return toReturn;
            }
        }
    };
}
