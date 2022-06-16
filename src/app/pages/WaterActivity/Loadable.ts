/**
 *
 * Asynchronously loads the component for WaterActivity
 *
 */

import { lazyLoad } from 'utils/loadable';

export const WaterActivity = lazyLoad(
  () => import('./index'),
  module => module.WaterActivity,
);
