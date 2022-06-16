/**
 *
 * Asynchronously loads the component for SubFooter
 *
 */

import { lazyLoad } from 'utils/loadable';

export const SubFooter = lazyLoad(
  () => import('./index'),
  module => module.SubFooter,
);
