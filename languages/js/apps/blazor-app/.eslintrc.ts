import _ from 'lodash';
import sharedLibraryEsLintRc from '#shared/.eslintrc';
import { Linter } from 'eslint';
import { mergeCustomizer } from '../shared/src/modules/utilities/modules/merge/merge/merge-with-customizer';

export default _.mergeWith(sharedLibraryEsLintRc, {} as Linter.Config, mergeCustomizer);
