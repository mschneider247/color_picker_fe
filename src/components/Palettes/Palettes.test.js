import React from 'react';
import { shallow } from 'enzyme';
import Palettes from './Palettes';


describe('Palettes component', () => {
	let wrapper;
	let mockPostPalette = jest.fn();
	let mockUpdatePaletteName = jest.fn();

  beforeEach(() => {
    wrapper = shallow(<Palettes updatePaletteName={mockUpdatePaletteName} postPalette={mockPostPalette} />)
  });

  it('App should match its snapshot', () => {
    expect(wrapper).toMatchSnapshot();
  });

  it('should update state and invoke updatePaletteName when updateState is called', async () => {
  	let mockEvent = { target: { value: 'Name' } };
  	wrapper.instance().updateState(mockEvent);
  	await expect(wrapper.state('paletteName')).toEqual('Name');
  	expect(mockUpdatePaletteName).toHaveBeenCalledWith('Name');
  });

  it('should update state and invoke postPalette when addNewPalette is called', async () => {
  	let mockEvent = { target: { value: 'Name' } };
  	wrapper.instance().addNewPalette();
  	await expect(wrapper.state('paletteName')).toEqual('');
  	expect(mockUpdatePaletteName).toHaveBeenCalled();
  });
});