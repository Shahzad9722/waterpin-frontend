/**
 *
 * Asynchronously loads the component for Favorites
 *
 */

import { lazyLoad } from 'utils/loadable';

export const Favorites = lazyLoad(
  () => import('./index'),
  module => module.Favorites,
);
