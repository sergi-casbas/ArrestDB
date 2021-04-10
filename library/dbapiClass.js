/* Include external required javascript files */
include('./cookies.js');
include('./httprequest.js');

function include(scriptURI){
    let script = document.createElement('script'); 
    script.src = scriptPath() + scriptURI; 
    document.head.appendChild(script);
}

function scriptPath(){
    let path= document.currentScript.src.split('?')[0];  // remove any ?query
    let mydir= path.split('/').slice(0, -1).join('/')+'/';  // remove last filename part of path
    return mydir;    
}


class DBAPI {
    /* Class constructor */
    constructor (serverURL){
        this.serverURL = serverURL;
    }
    
    /* Default response functions, intended only for installation and debugging purposes.
    Is recommended to use your own function on function call.
    Use null if you don't want any return of the call.
    */
    #defaultOnSuccess(response){
        console.log("Uncatched success:\n");
        console.table(response.JSON);
    }
    #defaultOnError(response){
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
    */
    create(tableName, itemJSON, onSuccess=this.#defaultOnSuccess, onError=this.#defaultOnError){
        httpRequest(this.serverURL + "/" + tableName , 'POST', onSuccess, onError, itemJSON);
    }

    read(tableName, itemId, onSuccess=this.#defaultOnSuccess, onError=this.#defaultOnError){
        httpRequest(this.serverURL + "/" + tableName + "/" + itemId, 'GET', onSuccess, onError);
    }

    readAll(tableName, onSuccess=this.#defaultOnSuccess, onError=this.#defaultOnError){
        httpRequest(this.serverURL+"/"+tableName, 'GET', onSuccess, onError);
    }

    search(tableName, fieldName, likeValue, onSuccess=this.#defaultOnSuccess, onError=this.#defaultOnError){
        httpRequest(this.serverURL+"/"+tableName+"/"+fieldName+"/"+likeValue, 'GET', onSuccess, onError);
    }

    update(tableName, itemId, itemJSON, onSuccess=this.#defaultOnSuccess, onError=this.#defaultOnError){
        httpRequest(this.serverURL + "/" + tableName + "/" + itemId, 'PUT', onSuccess, onError, itemJSON);
    }

    remove(tableName, itemId, onSuccess=this.#defaultOnSuccess, onError=this.#defaultOnError){
        httpRequest(this.serverURL + "/" + tableName + "/" + itemId, 'DELETE', onSuccess, onError);
    }

}





