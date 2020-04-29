import Cookies from 'js-cookie';

const TokenKey = 'ds_data_system';

export function getToken() {
	//return 'admin-token'
  	return Cookies.get(TokenKey)
}

export function setToken(token) {
  	return Cookies.set(TokenKey, token)
}

export function removeToken() {
	return Cookies.set(TokenKey, '');
  	// return Cookies.remove(TokenKey);
}