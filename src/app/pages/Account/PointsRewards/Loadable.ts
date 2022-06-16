/**
 *
 * Asynchronously loads the component for Account
 *
 */

import { lazyLoad } from 'utils/loadable';

export const PointsRewards = lazyLoad(
  () => import('./index'),
  module => module.PointsRewards,
);
