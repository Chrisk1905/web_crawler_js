const {JSDOM} = require('jsdom');

function normalizeURL(url){
  const urlObj = new URL(url)
  let fullPath = `${urlObj.host}${urlObj.pathname}`
  if (fullPath.length > 0 && fullPath.slice(-1) === '/'){
    fullPath = fullPath.slice(0, -1)
  }
  return fullPath
}

//return an array of non-normalized URLs found within the HTML
function getURLsFromHTML(htmlBody, baseURL){
  const urls = []
  const dom = new JSDOM(htmlBody)
  const aElements = dom.window.document.querySelectorAll('a')
  for (const aElement of aElements){
    if (aElement.href.slice(0,1) === '/'){
      try {
        urls.push(new URL(aElement.href, baseURL).href)
      } catch (err){
        console.log(`${err.message}: ${aElement.href}`)
      }
    } else {
      try {
        urls.push(new URL(aElement.href).href)
      } catch (err){
        console.log(`${err.message}: ${aElement.href}`)
      }
    }
  }
  return urls
}


async function crawlPage(rootURL){
	try{
		const resp = await fetch(rootURL);	
		if( resp.status >= 400 ){
			console.log(`${resp.status}: ${resp.statusText}`);
			return;
		}
    const contentType = resp.headers.get('content-type');
		if( !contentType.includes('text/html') ){
			console.log(`wrong content type: ${contentType}`);
			return;
		}
		console.log( await resp.text() );

	}catch(err){
		console.log(err.message);
		return;
	}
}

module.exports = {
	normalizeURL, 
	getURLsFromHTML,
	crawlPage
}

