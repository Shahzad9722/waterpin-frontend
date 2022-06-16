/**
 *
 * Asynchronously loads the component for DestinationPopup
 *
 */

import { lazyLoad } from 'utils/loadable';

export const DestinationPopup = lazyLoad(
  () => import('./index'),
  module => module.DestinationPopup,
);
