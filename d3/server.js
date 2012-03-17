var http = require("http");

function start() {
  function onRequest(request, response) {
    console.log("Request received.");
    //response.writeHead(200, {"Content-Type": "text/plain"});
	var body = '<html>'+
    '<head>'+
    '<meta http-equiv="Content-Type" content="text/html; '+
    'charset=UTF-8" />'+
    '<title>Force-Directed Layout</title>'+
    '<script type="text/javascript" src="../../d3.js"></script>'+
    '<script type="text/javascript" src="../../d3.geom.js"></script>'+
    '<script type="text/javascript" src="../../d3.layout.js"></script>'+
    '<link type="text/css" rel="stylesheet" href="force.css"/>'+
    '</head>'+
    '<body>'+
    '<form action="" enctype="multipart/form-data" '+
    'method="post">'+
    '<select name="menu">'+
	'<option value="0" selected>Select</option>'+
	'<option value="1">one</option>'+
	'<option value="2">two</option>'+
	'<option value="3">three</option>'+
	'</select>'+
    '</form>'+
    '<div id="chart"></div>'+
    '<script type="text/javascript" src="force.js"></script>'+
    '</body>'+
    '</html>';
    response.write(body);
    response.end();
  }

  http.createServer(onRequest).listen(8888);
  console.log("Server has started.");
}

exports.start = start;
