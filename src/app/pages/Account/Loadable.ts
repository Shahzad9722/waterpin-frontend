/**
 *
 * Asynchronously loads the component for Account
 *
 */

import { lazyLoad } from 'utils/loadable';

export const Account = lazyLoad(
  () => import('./index'),
  module => module.Account,
);
