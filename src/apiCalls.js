export const fetchProjects = async () => {
	const response = await fetch('https://color-picker-be.herokuapp.com/api/v1/projects');
	const data = await response.json();
	return data;
};

export const fetchPalettes = async () => {
	const response = await fetch('https://color-picker-be.herokuapp.com/api/v1/palettes');
	const data = await response.json();
	return data;
};