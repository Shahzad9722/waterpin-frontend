/**
 *
 * Asynchronously loads the component for Notifications
 *
 */

import { lazyLoad } from 'utils/loadable';

export const CityCard = lazyLoad(
  () => import('./index'),
  module => module.CityCard,
);
