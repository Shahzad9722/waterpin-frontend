/**
 *
 * Asynchronously loads the component for Maps
 *
 */

import { lazyLoad } from 'utils/loadable';

export const Maps = lazyLoad(
  () => import('./index'),
  module => module.Maps,
);
