import React from 'react';
import { shallow } from 'enzyme';
import Projects from './Projects';

describe('Projects component', () => { 
	let wrapper;
	let mockAddProject = jest.fn();

	beforeEach(() => {
    wrapper = shallow(<Projects addProject={mockAddProject}/>)
  });

  it('Projects should match its snapshot', () => {
    expect(wrapper).toMatchSnapshot();
  });

  it('should update state when updateState is called', async () => {
  	let mockEvent = { target: { value: 'Name' } };
  	wrapper.instance().updateState(mockEvent);
  	await expect(wrapper.state('projectName')).toEqual('Name');
  });

  it('should attempt to update state and invoke addProject when addNewProject is called', async () => {
  	wrapper.instance().addNewProject();
  	await expect(wrapper.state('projectName')).toEqual('');
  });
});