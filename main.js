const fs = require('fs');
const mv = require('mv');

function test() {
	console.log('hi');
}

const testFolder = './tests/';
fs.readdir(testFolder, (err, files) => {
	files.forEach(file => {
		console.log(file);
	});
});

mv('/tests/test1.txt', '/test1.txt', function(err) {
	console.log('Error in file ');
});

mv('/tests/test1.txt', 'test1.txt', function(err) {
	console.log('Error in file moving');
});
