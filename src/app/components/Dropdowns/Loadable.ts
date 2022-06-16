/**
 *
 * Asynchronously loads the component for Dropdowns
 *
 */

import { lazyLoad } from 'utils/loadable';

export const Dropdowns = lazyLoad(
  () => import('./index'),
  module => module.Dropdowns,
);
