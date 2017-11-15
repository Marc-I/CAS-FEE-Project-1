'use strict';

class AjaxService {

    static GET(url, callback) {
        this.call(url, "GET", null, "text/plain", callback);
    }

    static POST(url, data, callback) {
        this.call(url, "POST", data, "application/json", callback);
    }

    static PUT(url, data, callback) {
        this.call(url, "PUT", data, "application/json", callback);
    }

    static DELETE(url, callback) {
        this.call(url, "DELETE", null, "text/plain", callback);
    }

    static call(url, method, body, contenttype, callback) {
        let xmlhttp;
        xmlhttp = new XMLHttpRequest();
        xmlhttp.onreadystatechange = function () {
            if (xmlhttp.readyState === 4 && xmlhttp.status === 200) {
                callback(xmlhttp.responseText);
            }
        };

        xmlhttp.open(method, 'http://127.0.0.1:3119' + url, true);
        xmlhttp.setRequestHeader("Content-type", contenttype + "; charset=utf-8");
        xmlhttp.send(JSON.stringify(body));
    }
}