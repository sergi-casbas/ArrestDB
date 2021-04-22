# PHPDBAPI Suite

PHPDBAPI is a "plug-n-play" RESTful API for SQLite, MySQL and PostgreSQL databases with a Vanilla JS library to easy interact with it from http pages.

## JS Library
With this library you don't neet do deal directly with the API to use it in your web pages. The library maps all internall functions and parameters to do with a single function call all required operations (prepare data, send http, manage errors, and handle asyncronous function calls).

The library supports both multiplexing and autentication, wich makes your connections more secure and flexible over internet.

Library can be used as standalone functions (dbapi.js) or as a class dbapiClass.js, class will be prefered mode due its compactness and capabilities (use more than one connection in the same page)

Class API mapped available functions:
* constructor(serverULR)
* create(tableName, itemJSON, onSuccess, onError)
* read(tableName, itemId, onSuccess, onError)
* readAll(tableName, onSuccess, onError)
* search(tableName, fieldName, likeValue,  onSuccess, onError, extraParams)
* update(tableName, itemId, itemJSON, onSuccess, onError)
* remove(tableName, itemId, onSuccess, onError)
* rawquery(url, method, onSuccess, onError)

Multiplexing functions (To-Do put inside class):
* openDatabase(databaseName)
* closeDatabase()

Autentication functions (To-Do put inside class):
* autenticate(serverURL, apikey, onSuccess, onError)
* deautenticate()
* keepAlive(onSuccess, onError)

## Server installation.
### Apache.
This repo contains .htacces file ready to use with apache.

### Lighttpd.
Add following code to your /etc/lighttpd.conf.d/phpdbapi.conf if you have a dedicated site for the db:
  server.modules += ("mod_rewrite")
  url.rewrite-once = ("^/([^?]*)(?:\?(.*))?" => "/index.php/$1/$2/$3/?%{qsa}")

If you have the API on a folder use this syntax (replace 'phpdbapi' with your own):
  server.modules += ("mod_rewrite")
  url.rewrite-once = ("^/phpdbapi/([^?]*)(?:\?(.*))?" => "/phpdbapi/index.php/$1/$2/$3/?%{qsa}")

## PHPAPI
The API is based on ArrestDB by alixaxel (https://github.com/alixaxel/ArrestDB) and only have added the modules inclusion.
