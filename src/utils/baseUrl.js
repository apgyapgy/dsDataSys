let requestFlag = 1, baseUrl = '' ;
if (requestFlag === 0) {
    baseUrl = window.atob('aHR0cDovLzE5Mi4xNjguOC4yOToyOTAzMi9kcy1kYXRhLWJhY2sv') ;//ihc
} else if (requestFlag === 1) {
	baseUrl = window.atob( 'aHR0cHM6Ly9kc2RhdGEuZnVzamIuY29tOjEwMzg4Lw==' );
} else if (requestFlag === 2) {
    if (window.location.host === window.atob('c3RhdGljLmZ1aW91LmdvZA==')) {
		baseUrl = window.atob('aHR0cDovLzEwLjAuMTAuMTAzOjEwMzg4Lw==');
	} else {
        baseUrl = 'aHR0cHM6Ly9mbG93LmZ1c2piLmNvbS8=';
	}
}
export default baseUrl;