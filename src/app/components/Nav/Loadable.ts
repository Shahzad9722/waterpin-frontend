/**
 *
 * Asynchronously loads the component for Nav
 *
 */

import { lazyLoad } from 'utils/loadable';

export const Nav = lazyLoad(
  () => import('./index'),
  module => module.Nav,
);
