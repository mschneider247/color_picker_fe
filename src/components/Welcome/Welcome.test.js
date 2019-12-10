import React from 'react';
import { shallow } from 'enzyme';
import Welcome from './Welcome';

describe('Welcome component', () => {
  let wrapper;
  beforeEach(() => {
    wrapper = shallow(<Welcome/>)
  });

  it('Welcome should match its snapshot', () => {
    expect(wrapper).toMatchSnapshot();
  });
});