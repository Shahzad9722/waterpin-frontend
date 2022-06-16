/**
 *
 * Asynchronously loads the component for SpinTheWheel
 *
 */

import { lazyLoad } from 'utils/loadable';

export const DashboardLayout = lazyLoad(
  () => import('./index'),
  module => module.DashboardLayout,
);
