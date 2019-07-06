const request = require('request');
const config = require('./config.js');
const fs = require('fs');
const async = require('async');
let rawdata = fs.readFileSync('data.json');  
let data = JSON.parse(rawdata);  

request.get(config.dburl + '_all_dbs', function (error, response, body) {
	console.log('Verificando si existe la DB', response.body); 

	//Checamos si existe la DB
	if (body.includes(config.dbname)) {
		console.log('Ya existe la DB');

		request.get(config.dburl + config.dbname + '/_design/api', function (error, response, body) {
			console.log('Verificando si existe el Design document en la DB \n'); 
			
			//Checamos si existe el Design Doc
			if (response.statusCode == 200 || response.statusCode == 201 ) {
				console.log('Ya existe el Design document en la DB \n');

				insertDocs(data);

			} else {
				console.log(response.statusCode);
				console.log('No existe el Design document en la DB, Escribiendolo');
				fs.createReadStream('DBdesign.json').pipe(request.put( config.dburl + config.dbname + '/_design/api', function (error, response, body) {
					
					if (response.statusCode == 200 || response.statusCode == 201 ) {
						console.log('Design creado correctamente');
						

						insertDocs(data);

					} else {
						console.log('Hubo un error:', response.statusCode);
						console.log(response.body);
					}
				}));
			}
		});
	} else{
		console.log('No existe la DB, creandola');
		request.put( config.dburl + config.dbname, function (error, response, body) {
			if (response.statusCode == 200 || response.statusCode == 201 ) {
				console.log('DB creada correctamente');
				console.log('Escribiendo el Design document en la DB \n');

				fs.createReadStream('DBdesign.json').pipe(request.put( config.dburl + config.dbname + '/_design/api', function (error, response, body) {
					
					if (response.statusCode == 200 || response.statusCode == 201 ) {
						console.log('Design creado correctamente');
						

						insertDocs(data);

					} else {
						console.log('Hubo un error:', response.statusCode);
						console.log(response.body);
					}
				}));
			} else {
				console.log('Hubo un error:', response.statusCode);
				console.log(response.body);
			}
		});
	} 
});

function insertDocs(data) {
	console.log('Insertando Documentos');
	
	data.forEach((item, value) => { console.log(item, value) 
		var path = config.dburl + config.dbname + '/' + Number(item.id);
		
	  	console.log(path);
				putDoc(item, path, value);
			
	} );
}

function putDoc(item, path, value) {
	request.put(path , function (error, response, body) {	
		if (response.statusCode == 200 || response.statusCode == 201 ) {
			console.log('Documento insertado correctamente');
		} else {
			console.log('Hubo un error:', response.statusCode);
		}
	}).form(JSON.stringify(item));
}

