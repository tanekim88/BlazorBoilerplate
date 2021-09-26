import _ from 'lodash';
import sharedLibraryEsLintRc from '@projects/shared/.eslintrc';
import { mergeCustomizer } from '@projects/shared/src/modules/utilities/merge/merge/merge-with-customizer';
export default _.mergeWith(sharedLibraryEsLintRc, {}, mergeCustomizer);
//# sourceMappingURL=.eslintrc.js.map