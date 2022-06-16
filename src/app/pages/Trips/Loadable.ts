/**
 *
 * Asynchronously loads the component for Trips
 *
 */

import { lazyLoad } from 'utils/loadable';

export const Trips = lazyLoad(
  () => import('./index'),
  module => module.Trips,
);
