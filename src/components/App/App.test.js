import React from 'react';
import { shallow } from 'enzyme';
import App from './App';
import { fetchAllProjects, fetchAllPalettes, fetchProject, fetchPalette, addProject, addPalette, deleteProject, deletePalette, patchProjectName, patchPaletteColor } from '../../apiCalls';

jest.mock('../../apiCalls');

describe('App component', () => {
  let wrapper;
  let mockProjects = [{
  	id: 20,
    projectId: 1,
    name: 'BYOB',
  }];
  let mockPalettes = [{
  	id: 5,
    projectId: 1,
    name: 'cool colors',
    color1: '#668B8B',
    color2: '#B4CDCD',
    color3: '#2F4F4F',
    color4: '#7A8B8B',
    color5: '#838B8B',
  }];
  let mockPalette = {
  	id: 5,
    projectId: 1,
    name: 'cool colors',
    color1: '#668B8B',
    color2: '#B4CDCD',
    color3: '#2F4F4F',
    color4: '#7A8B8B',
    color5: '#838B8B',
  };
  let mockEvent = { target: { value: 10, innerText: 'Title'}};
  let mockIndex = 3;

  beforeEach(() => {
    wrapper = shallow(<App/>)
  });

  fetchAllProjects.mockImplementation(() => {
  	return Promise.resolve(mockProjects)
  });

  fetchAllPalettes.mockImplementation(() => {
  	return Promise.resolve(mockPalettes)
  });

  it('App should match its snapshot', () => {
    expect(wrapper).toMatchSnapshot();
  });

  it.skip('should retrieve ideas after mounting', () => {

    expect(wrapper.instance().getProjects()).toHaveBeenCalled();
    expect(wrapper.instance().getPalettes()).toHaveBeenCalled();
  });

  it('should call fetchAllProjects when getProjects is invoked', () => {
  	wrapper.instance().getProjects();
  	expect(fetchAllProjects).toHaveBeenCalled();
  });

  it('should update state when getProjects is invoked', () => {
  	wrapper.instance().getProjects();
  	expect(wrapper.state('projects')).toEqual(mockProjects);
  });

  it('should call fetchAllPalettes when getPalettes is invoked', () => {
  	wrapper.instance().getPalettes();
  	expect(fetchAllPalettes).toHaveBeenCalled();
  });

  it('should update state when getPalettes is invoked', () => {
  	wrapper.instance().getPalettes();
  	expect(wrapper.state('palettes')).toEqual(mockPalettes);
  });

  it('should update state when updateProject is invoked', () => {
  	wrapper.instance().updateProject(mockEvent);
  	expect(wrapper.state('projectName')).toEqual('Title');
  	expect(wrapper.state('projectId')).toEqual(10);
  });

  it('should update state when updatePalette is invoked', () => {
  	wrapper.instance().updatePalette(mockEvent, mockPalette);
  	expect(wrapper.state('paletteName')).toEqual('Title');
  	expect(wrapper.state('paletteId')).toEqual(10);
  	expect(wrapper.state('paletteId')).toEqual(10);
  });

  it('should update state when updateLockedIndex is invoked', () => {
  	wrapper.instance().updateLockedIndex(mockIndex);
  	expect(wrapper.state('lockedIndex')).toEqual(mockIndex);
  });

  it('should update state when updatePaletteName is invoked', () => {
  	mockEvent = { target: { value: 'Name' } }
  	wrapper.instance().updatePaletteName(mockEvent);
  	expect(wrapper.state('paletteName')).toEqual('Name');
  });
});
