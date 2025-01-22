export const getItemFromLocalStorage = (item : string)  => {
	let value : (string | null)  = localStorage.getItem(item); 
	if(!value) { 
		return null
	}
	return JSON.parse(value); 
};

export const setItemToLocalStorage = (key: string, value: string) => {
	return localStorage.setItem(key, JSON.stringify(value));
};
