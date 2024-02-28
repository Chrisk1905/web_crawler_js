const { argv } = require('node:process');
const { crawlPage } = require('./crawl.js');

function main(argv){
	if(argv.length < 3){
		console.log(' error: no BASE_URL arguement ');
		return;
	}
	if(argv.length > 3){
		console.log(' error: too many arguements ');
		return;
	}
		
	baseURL = argv[2];	
	
	console.log(`crawler starting on ${baseURL} ...`);
	crawlPage(baseURL);
}

main(argv)

