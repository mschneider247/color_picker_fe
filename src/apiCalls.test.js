import { fetchAllProjects, fetchAllPalettes, fetchProject, fetchPalette, addProject, addPalette, deleteProject, deletePalette } from './apiCalls';

describe('fetchAllProjects', () => {

	let mockProjects;

  beforeEach(() => {
    mockProjects = [{
	    projectId: 1,
	    name: 'BYOB',
	  }];

    window.fetch = jest.fn().mockImplementation(() => {
        return Promise.resolve({
          ok: true,
          json: () => Promise.resolve(mockProjects)
        })
      })
    })

	it('should fetch projects with the correct URL', () => {
		fetchAllProjects();

		expect(window.fetch).toHaveBeenCalledWith('https://color-picker-be.herokuapp.com/api/v1/projects')
	});

	it('should return an array of projects when fetchAllProjects is called (HAPPY)', () => {
		expect(fetchAllProjects()).resolves.toEqual(mockProjects);
	});

	it('should return an error if fetchAllProjects property ok is false (SAD)', () => {
		window.fetch = jest.fn().mockImplementation(() => {
			return Promise.resolve({
				ok: false
			})
		})
		expect(fetchAllProjects()).rejects.toEqual(TypeError('response.json is not a function'))
	});

	it('should return an error if fetchAllProjects fails ', () => {
    window.fetch = jest.fn().mockImplementation(() => {
        return Promise.reject(Error('Failed to fetch'))
    });
    expect(fetchAllProjects()).rejects.toEqual(Error('Failed to fetch'));
    }); 
});

describe('fetchAllPalettes', () => {

	let mockPalettes;

  beforeEach(() => {
    mockPalettes = [{
	    projectId: 1,
	    name: 'cool colors',
	    color1: '#668B8B',
	    color2: '#B4CDCD',
	    color3: '#2F4F4F',
	    color4: '#7A8B8B',
	    color5: '#838B8B',
	  }];

    window.fetch = jest.fn().mockImplementation(() => {
        return Promise.resolve({
          ok: true,
          json: () => Promise.resolve(mockPalettes)
        })
      })
    })

	it('should fetch palettes with the correct URL', () => {
		fetchAllPalettes();

		expect(window.fetch).toHaveBeenCalledWith('https://color-picker-be.herokuapp.com/api/v1/palettes')
	});

	it('should return an array of palettes when fetchAllPalettes is called (HAPPY)', () => {
		expect(fetchAllPalettes()).resolves.toEqual(mockPalettes);
	});

	it('should return an error if fetchAllPalettes property ok is false (SAD)', () => {
		window.fetch = jest.fn().mockImplementation(() => {
			return Promise.resolve({
				ok: false
			})
		})
		expect(fetchAllPalettes()).rejects.toEqual(TypeError('response.json is not a function'))
	});

	it('should return an error if fetchAllPalettes fails ', () => {
    window.fetch = jest.fn().mockImplementation(() => {
        return Promise.reject(Error('Failed to fetch'))
    });
    expect(fetchAllPalettes()).rejects.toEqual(Error('Failed to fetch'));
    }); 
});

describe('fetchProject', () => {
	let mockProject;
	let mockId = 2;

	beforeEach(() => {
    mockProject = {
	    id: 2,
	    projectId: 1,
	    name: 'BYOB',
	  };

    window.fetch = jest.fn().mockImplementation(() => {
        return Promise.resolve({
          ok: true,
          json: () => Promise.resolve(mockProject)
        })
      })
    })

	it('should fetch project with the correct URL', () => {
		fetchProject(mockId);

		expect(window.fetch).toHaveBeenCalledWith(`https://color-picker-be.herokuapp.com/api/v1/projects/${mockId}`)
	});

	it('should return the selected project when fetchProject is called (HAPPY)', () => {
		expect(fetchProject(mockId)).resolves.toEqual(mockProject);
	});

	it('should return an error if fetchProject property ok is false (SAD)', () => {
		window.fetch = jest.fn().mockImplementation(() => {
			return Promise.resolve({
				ok: false
			})
		})
		expect(fetchProject(mockId)).rejects.toEqual(TypeError('response.json is not a function'))
	});

	it('should return an error if fetchProject fails ', () => {
    window.fetch = jest.fn().mockImplementation(() => {
        return Promise.reject(Error('Failed to fetch'))
    });
    expect(fetchProject(mockId)).rejects.toEqual(Error('Failed to fetch'));
    });
});

describe('fetchPalette', () => {
	let mockPalette;
	let mockId = 5;

	beforeEach(() => {
    mockPalette = {
    	id: 5,
	    projectId: 1,
	    name: 'cool colors',
	    color1: '#668B8B',
	    color2: '#B4CDCD',
	    color3: '#2F4F4F',
	    color4: '#7A8B8B',
	    color5: '#838B8B',
  	};

    window.fetch = jest.fn().mockImplementation(() => {
        return Promise.resolve({
          ok: true,
          json: () => Promise.resolve(mockPalette)
        })
      })
    })

	it('should fetch palette with the correct URL', () => {
		fetchPalette(mockId);

		expect(window.fetch).toHaveBeenCalledWith(`https://color-picker-be.herokuapp.com/api/v1/palettes/${mockId}`)
	});

	it('should return the selected palette when fetchPalette is called (HAPPY)', () => {
		expect(fetchPalette(mockId)).resolves.toEqual(mockPalette);
	});

	it('should return an error if fetchPalette property ok is false (SAD)', () => {
		window.fetch = jest.fn().mockImplementation(() => {
			return Promise.resolve({
				ok: false
			})
		})
		expect(fetchPalette(mockId)).rejects.toEqual(TypeError('response.json is not a function'))
	});

	it('should return an error if fetchPalette fails ', () => {
    window.fetch = jest.fn().mockImplementation(() => {
        return Promise.reject(Error('Failed to fetch'))
    });
    expect(fetchPalette(mockId)).rejects.toEqual(Error('Failed to fetch'));
    });
});