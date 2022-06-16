/**
 *
 * Asynchronously loads the component for Booking
 *
 */

import { lazyLoad } from 'utils/loadable';

export const Booking = lazyLoad(
  () => import('./index'),
  module => module.Booking,
);
