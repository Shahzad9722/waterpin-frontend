import * as React from 'react';
import { render } from '@testing-library/react';

import { Maps } from '..';

describe('<Maps  />', () => {
  it('should match snapshot', () => {
    const loadingIndicator = render(<Maps />);
    expect(loadingIndicator.container.firstChild).toMatchSnapshot();
  });
});
