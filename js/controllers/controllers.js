var myApp = angular.module('starter.controllers', []);

myApp.constant('mySettings', {
    appName: "Raise the bar!!",
    loginUrl: 'http://chezy01.actuate.com:5000/ihub/v1/login',
    getFolderListing: 'http://chezy01.actuate.com:5000/ihub/v1/folders',
    getFileDetails: 'http://chezy01.actuate.com:5000/ihub/v1/files/',
    visuals: 'http://chezy01.actuate.com:5000/ihub/v1/visuals/',
    repositoryType: "Enterprise",
    jsapiUrl: "http://vmcip2.actuate.com:8700/iportal",
    getReportPage: 'http://chezy01.actuate.com:5000/ihub/v1/getReportPage'
});

myApp.filter('escape', function() {
    return window.escape;
});