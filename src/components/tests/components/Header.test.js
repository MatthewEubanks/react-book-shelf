import React from 'react';
import { shallow } from '../../../setupTests';

import Header from '../../Header/header';

describe('<Header />', () => {
  it('should render without crashing', () => {
    shallow(<Header />);
  });
});
