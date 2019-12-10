export const fetchAllProjects = async () => {
	const response = await fetch('https://color-picker-be.herokuapp.com/api/v1/projects');
	const data = await response.json();
	return data;
};

export const fetchAllPalettes = async () => {
	const response = await fetch('https://color-picker-be.herokuapp.com/api/v1/palettes');
	const data = await response.json();
	return data;
};

export const fetchProject = async (id) => {
	const response = await fetch(`https://color-picker-be.herokuapp.com/api/v1/projects/${id}`);
	const data = await response.json();
	return data;
};

export const fetchPalette = async (id) => {
	const response = await fetch(`https://color-picker-be.herokuapp.com/api/v1/palettes/${id}`);
	const data = await response.json();
	return data;
};

export const addProject = async (info) => {
  const options = {
    method: 'POST',
    body: JSON.stringify(info),
    headers: {
      'Content-Type': 'application/json'
    }
  };

  const resp = await fetch('https://color-picker-be.herokuapp.com/api/v1/projects', options)
  const data = await resp.json();
  return data
};

export const addPalette = async (info) => {
  const options = {
    method: 'POST',
    body: JSON.stringify(info),
    headers: {
      'Content-Type': 'application/json'
    }
  };

  const resp = await fetch('https://color-picker-be.herokuapp.com/api/v1/palettes', options)
  const data = await resp.json();
  return data
};

export const deleteProject = async (id) => {
  const options = {
    method: 'DELETE',
    headers: {
      'Content-Type': 'application/json'
    }
  };

  const resp =  await fetch(`https://color-picker-be.herokuapp.com/api/v1/projects/${id}`, options);
  const data = await resp.json();
  return data
};

export const deletePalette = async (id) => {
  const options = {
    method: 'DELETE',
    headers: {
      'Content-Type': 'application/json'
    }
  };

  const resp =  await fetch(`https://color-picker-be.herokuapp.com/api/v1/palettes/${id}`, options);
  const data = await resp.json();
  return data
};

export const patchProjectName = async (name, id) => {
  const options = {
    method: 'PATCH',
    body: JSON.stringify(name),
    headers: {
      'Content-Type': 'application/json'
    }
  };

  const resp = await fetch(`https://color-picker-be.herokuapp.com/api/v1/projects/${id}`, options)
  const data = await resp.json();
  return data
};