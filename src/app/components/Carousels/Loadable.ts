/**
 *
 * Asynchronously loads the component for Notifications
 *
 */

import { lazyLoad } from 'utils/loadable';

export const Carousels = lazyLoad(
  () => import('./index'),
  module => module.Carousels,
);
