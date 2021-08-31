import _ from 'lodash';
import sharedLibraryEsLintRc from '#shared/.eslintrc';
import { mergeCustomizer } from '#shared/src/modules/utilities/merge/merge/merge-with-customizer';
import { Linter } from 'eslint';

export default _.mergeWith(sharedLibraryEsLintRc, {} as Linter.Config, mergeCustomizer);
