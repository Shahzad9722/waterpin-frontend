/**
 *
 * Asynchronously loads the component for SpinTheWheel
 *
 */

import { lazyLoad } from 'utils/loadable';

export const SpinTheWheel = lazyLoad(
  () => import('./index'),
  module => module.SpinTheWheel,
);
