import React from 'react';
import { shallow } from '../../../setupTests';

import Nav from '../../Header/Sidenav/sidenav';

describe('<Nav />', () => {
  it('should render without crashing', () => {
    shallow(<Nav />);
  });
});
