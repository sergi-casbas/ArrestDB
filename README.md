# PHPDBAPI Suite

PHPDBAPI is a "plug-n-play" RESTful API for SQLite, MySQL and PostgreSQL databases with a Vanilla JS library to easy interact with it from http pages.

## JS Library
With this library you don't neet do deal directly with the API to use it in your web pages. The library maps all internall functions and parameters to do with a single function call all required operations (prepare data, send http, manage errors, and handle asyncronous function calls).

The library supports both multiplexing and autentication, wich makes your connections more secure and flexible over internet.

Library API mapped available functions:
* create(serverURL, tableName, itemJSON, onSuccess, onError)
* read(serverURL, tableName, itemId, onSuccess, onError)
* readAll(serverURL, tableName, onSuccess, onError)
* update(serverURL, tableName, itemId, itemJSON, onSuccess, onError)
* remove(serverURL, tableName, itemId, onSuccess, onError)

Multiplexing functions:
* openDatabase(databaseName)
* closeDatabase()

Autentication functions:
* autenticate(serverURL, apikey, onSuccess, onError)
* deautenticate()
* keepAlive(onSuccess, onError)

## Server installation.
### Apache.
This repo contains .htacces file ready to use with apache.

### Lighttpd.
Add following code to your /etc/lighttpd.conf.d/phpdbapi.conf
server.modules += ("mod_rewrite")
url.rewrite-once = ("^/phpdbapi/([^?]*)(?:\?(.*))?" => "/phpdbapi/index.php/$1/$2/$3/$4/$5")

## PHPAPI
The API is based on ArrestDB by alixaxel (https://github.com/alixaxel/ArrestDB) and only have added the modules inclusion.
