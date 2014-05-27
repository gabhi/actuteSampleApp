var myApp = angular.module('starter.controllers', []);

myApp.constant('mySettings', {
    appName: "Raise the bar!!",
    loginUrl: 'http://agaikwad-pc.actuate.com:5000/ihub/v1/login',
    getFolderListing: 'http://agaikwad-pc.actuate.com:5000/ihub/v1/folders',
    getFileDetails: 'http://agaikwad-pc.actuate.com:5000/ihub/v1/files/',
    visuals: 'http://agaikwad-pc.actuate.com:5000/ihub/v1/visuals/',

    getReportPage: 'http://agaikwad-pc.actuate.com:5000/ihub/v1/getReportPage'
});

myApp.filter('escape', function() {
    return window.escape;
});