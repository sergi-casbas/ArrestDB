class DBAPI {
    /* Class constructor */
    constructor (serverURL, database=""){
        this.serverURL = serverURL;
        if (database){this.database = database;}
    }

    /* Default response functions, intended only for installation and debugging purposes.
    Is recommended to use your own function on function call.
    Use null if you don't want any return of the call.
    */
    _defaultOnSuccess(response){
        console.log("Uncatched success:\n");
        console.table(response.JSON);
    }
    _defaultOnError(response){
        console.log("Uncatched error:\n");
        console.table(response.JSON);
        console.log('x-auth-message: ' + response.getResponseHeader('x-auth-message'));
    }

    /* API  functions
    (C)reate > POST   /table
    (R)ead   > GET    /table[/id]
    (R)ead   > GET    /table[/column/content]
    (U)pdate > PUT    /table/id
    (D)elete > DELETE /table/id
    rawquery > Any query AS is.
    */

    create(tableName, itemJSON, onSuccess=this._defaultOnSuccess, onError=this._defaultOnError){
        this._httpRequest(this.serverURL + "/" + tableName , 'POST', onSuccess, onError, itemJSON);
    }

    read(tableName, itemId, onSuccess=this._defaultOnSuccess, onError=this._defaultOnError){
        this._httpRequest(this.serverURL + "/" + tableName + "/" + itemId, 'GET', onSuccess, onError);
    }

    readAll(tableName, onSuccess=this._defaultOnSuccess, onError=this._defaultOnError, extraParams=""){
        this.rawquery(tableName, 'GET', onSuccess, onError, extraParams);
    }

    search(tableName, fieldName, likeValue,  onSuccess=this._defaultOnSuccess, onError=this._defaultOnError, extraParams=""){
        this.rawquery(tableName+"/"+fieldName+"/"+likeValue, 'GET', onSuccess, onError, extraParams);
    }

    update(tableName, itemId, itemJSON, onSuccess=this._defaultOnSuccess, onError=this._defaultOnError){
        this._httpRequest(this.serverURL + "/" + tableName + "/" + itemId, 'PUT', onSuccess, onError, itemJSON);
    }

    remove(tableName, itemId, onSuccess=this._defaultOnSuccess, onError=this._defaultOnError){
        this._httpRequest(this.serverURL + "/" + tableName + "/" + itemId, 'DELETE', onSuccess, onError);
    }

    rawquery(url, method="GET", onSuccess=this._defaultOnSuccess, onError=this._defaultOnError, extraParams=""){
		if (extraParams!=""){url = url + "?" + extraParams;}
        this._httpRequest(this.serverURL + "/" +  url , method, onSuccess, onError);
    }

    _httpRequest(url, operation, onSuccess = null, onError = null, postJSON = null, authorization = null){
        /* Prepare all request values, fallback, etc.. */
        var xhttp = new XMLHttpRequest();
        xhttp.onreadystatechange = this._onReadyStateChange;
    
        /* Set callback functions if they are set. */
        if (onSuccess) {xhttp.onSuccess = onSuccess;}
        if (onError) {xhttp.onError = onError;}
    
        /* Prepare asyncronous connection. */
        xhttp.open(operation, url, true);
    
        /* send authorization */
        if (authorization !== null){
            xhttp.setRequestHeader("Authorization", "Bearer ".concat(authorization));
        }
    
        /* Automate the use of database multiplexing. */
        if (this.database){
            xhttp.setRequestHeader("Database", this.database);
        }
    
        /* Send the request with JSON payload if exists. */
        if (postJSON){
            xhttp.setRequestHeader('Content-Type', 'application/json');
            xhttp.send(JSON.stringify(postJSON));
        }else{
            xhttp.send();
        }
    }
    
    _onReadyStateChange(){
        /* https://developer.mozilla.org/en-US/docs/Web/API/XMLHttpRequest/readyState */
        if (this.readyState == 4) { //DONE
            if (this.status != 200) {
                /* If the connection is ready but not 200, copy http error codes and return as error . */
                if (this.onError != null) {
                    this.HTTPStatus = this.status;
                    this.HTTPStatusText = this.statusText;
                    this.onError(this);
                }
            }else{
                this.JSON = JSON.parse(this.response); // Convert response to JSON.
                if ('error' in this.JSON){
                    /*If the response contain error, put on variables and return as error.*/
                    this.HTTPStatus = this.JSON['error']['code'];
                    this.HTTPStatusText = this.JSON['error']['status'];
                    if (this.onError != null) {this.onError(this);}
                }else{
                    this.HTTPStatus = 200
                    if (this.onSuccess != null) {this.onSuccess(this);}
                }
            }
        }
    }

}





