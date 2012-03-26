// NodeJS HTTP server che fornisce file dalla directory in cui risiede
// per attivare il server in node:  node server.js
// http://localhost:8000/index.html or http://127.0.0.1:8000/index.html


// moduli  che servono per costruire un server
var http = require('http'); 
var fs = require('fs'); 

var server = new http.Server(); // Crea HTTP server
server.listen(8000); // port 8000.
console.log("Server Attivo");

// quando arriva una request viene gestita con la funzione seguente
server.on("request", function (request, response) {
	// Parsing dell'URL
	var url = require('url').parse(request.url);

	//Funzione di test mirror : restituisce header e dati della request appena ricevuta
	if (url.pathname === "/test/mirror") {
		// Response status and headers
		response.writeHead(200, {"Content-Type": "text/plain; charset=UTF-8"});
		// mostra la request
		response.write(request.method + " " + request.url + " HTTP/" + request.httpVersion + "\r\n");
		// ed i relativi headrs
		for(var h in request.headers) {
			response.write(h + ": " + request.headers[h] + "\r\n");
		}
		response.write("\r\n"); 
		// aggiunge altri chunk del body della request se ci sono
		request.on("data", function(chunk) { response.write(chunk); });
		// arriva alla fine
		request.on("end", function(chunk) { response.end(); });
		}
	// Altrimenti restituisce un file della directory corrente
	else {
	// prende il nome del file e ne deduce il tipo dalla sua estensione
		var filename = url.pathname.substring(1);
		var type;
		switch(filename.substring(filename.lastIndexOf(".")+1)) { // prende solo l'estensione
			case "html":
			case "htm": type = "text/html; charset=UTF-8"; break;
			case "js": type = "application/javascript; charset=UTF-8"; break;
			case "css": type = "text/css; charset=UTF-8"; break;
			case "txt" :type = "text/plain; charset=UTF-8"; break;
			case "manifest":type = "text/cache-manifest; charset=UTF-8"; break;
			default: type = "application/octet-stream"; break;
			}
		// Legge il file in modo asincrono e passa il contenuto come singolo 
		// chunk alla funzione di callback. Per file molto grande meglio usare
		// l'API per lo streaming fs.createReadStream() 
		fs.readFile(filename, function(err, content) {
		if (err) { // Se il file non si trova
			response.writeHead(404, {
			// Manda 404 Not Found status
			"Content-Type": "text/plain; charset=UTF-8"});
			response.write(err.message); // Simple error message body
			response.end();
		}
		else {
			// Altrimenti se il file è stato letto e trovato
			response.writeHead(200, // Imposta status code e MIME type
			{"Content-Type": type});
			response.write(content); // Manda il file come response body
			response.end();
			// Fatto
		}
	  });
	}
});

