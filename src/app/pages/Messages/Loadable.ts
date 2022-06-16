/**
 *
 * Asynchronously loads the component for Messages
 *
 */

import { lazyLoad } from 'utils/loadable';

export const Messages = lazyLoad(
  () => import('./index'),
  module => module.Messages,
);
