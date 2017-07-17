var diet = require("diet");
var dietStream = require("diet-static-stream");

var server = diet({silent: true});

server.listen(8080, null, function(){
	console.log("Server listening in port:", 8080);
});

server.footer(dietStream({
	path: "public"
}));