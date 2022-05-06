const API_URL = 'https://jsonplaceholder.typicode.com/users';
export const fetchAPI = async () => {
  const response = await fetch(API_URL);
  const data = await response.json();
  return data;
};
