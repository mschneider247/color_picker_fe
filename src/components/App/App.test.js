import React from 'react';
import { shallow } from 'enzyme';
import App from './App';

describe('App component', () => {
  let wrapper;
  beforeEach(() => {
    wrapper = shallow(<App/>)
  });

  it('App should match its snapshot', () => {
    expect(wrapper).toMatchSnapshot();
  });
});
