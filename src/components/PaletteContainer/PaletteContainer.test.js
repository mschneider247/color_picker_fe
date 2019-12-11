import React from 'react';
import { shallow } from 'enzyme';
import PaletteContainer from './PaletteContainer';


describe('PaletteContainer component', () => {
	let wrapper;
	let mockUpdateLockedIndex = jest.fn();

  beforeEach(() => {
    wrapper = shallow(<PaletteContainer  updateLockedIndex={mockUpdateLockedIndex} colors={['','','','','']}/>)
  });

  it('App should match its snapshot', () => {
    expect(wrapper).toMatchSnapshot();
  });

  it('should update state when updateIndex is invoked', () => {
  	let mockEvent = { target: { value: 4 } };
  	wrapper.instance().updateIndex(mockEvent);
  	expect(wrapper.state('lockedIndex')).toEqual(4);
  	expect(mockUpdateLockedIndex).toHaveBeenCalledWith(4);
  });
});