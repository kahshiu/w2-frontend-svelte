module.exports = {
	apps: [
		{
			name: 'frontend-svelte', // Replace 'your-app-name' with your desired app name
			script: 'node',
			args: 'build',
			env: {
				ORIGIN: 'http://192.168.0.127:3000',
				BODY_SIZE_LIMIT: 'Infinity'
			}
		}
	]
};
