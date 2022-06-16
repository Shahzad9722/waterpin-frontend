/**
 *
 * Asynchronously loads the component for HelpCenter
 *
 */

import { lazyLoad } from 'utils/loadable';

export const HelpCenter = lazyLoad(
  () => import('./index'),
  module => module.HelpCenter,
);
