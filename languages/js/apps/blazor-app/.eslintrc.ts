import _ from 'lodash';
import sharedLibraryEsLintRc from '@projects/shared/.eslintrc';
import { mergeCustomizer } from '@projects/shared/src/modules/utilities/merge/merge/merge-with-customizer';
import { Linter } from 'eslint';

export default _.mergeWith(sharedLibraryEsLintRc, {} as Linter.Config, mergeCustomizer);
