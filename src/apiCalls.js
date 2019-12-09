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

export const fetchPalette = async (id) => {
	const response = await fetch(`https://color-picker-be.herokuapp.com/api/v1/palettes/${id}`);
	const data = await response.json();
	return data;
};