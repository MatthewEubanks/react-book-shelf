import React from 'react';
import { shallow } from '../../../setupTests';

import Home from '../../Home/home';

describe('<Home />', () => {
  it('should render without crashing', () => {
    shallow(<Home />);
  });
});
