declare function callApi(url: string, data: Object): void;
declare function callApi(url: string, data: Object, callbackSuccess: function): void;
declare function callApi(url: string, data: Object, callbackSuccess: function, defaultError: boolean): void;
declare function callApi(url: string, data: Object, callbackSuccess: function, defaultError: boolean, callbackError: function): void;