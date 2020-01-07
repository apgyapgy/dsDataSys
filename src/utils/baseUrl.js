let requestFlag = 1,baseUrl = '' ;
if( requestFlag === 0 ){
  baseUrl = 'http://192.168.8.29:29032/ds-data-back/' ;//ihc
}else if( requestFlag === 1 ){
	baseUrl = window.atob( 'aHR0cHM6Ly9kc2RhdGEuZnVzamIuY29tOjEwMzg4Lw==' );
}
export default baseUrl;