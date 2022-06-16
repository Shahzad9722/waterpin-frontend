/**
 *
 * Asynchronously loads the component for Destinations
 *
 */

import { lazyLoad } from 'utils/loadable';

export const Destinations = lazyLoad(
  () => import('./index'),
  module => module.Destinations,
);
