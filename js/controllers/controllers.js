var myApp = angular.module('starter.controllers', []);

myApp.constant('mySettings', {
    categoryUrl: 'http://gabhi.com/dump.php?id=',
    postUrl: 'http://gabhi.com/dump.php?post_id=',
    appName: "Programming Interview Questions - Raise the bar!!",
    apiUri: '/api/foo',
    nsUri: 'mySite/foo.xsd',
    nsPrefix: 's',
    loginUrl: 'http://agaikwad-pc.actuate.com:5000/ihub/v1/login',
    getFolderListing: 'http://agaikwad-pc.actuate.com:5000/ihub/v1/folders',
    getFileDetails: 'http://agaikwad-pc.actuate.com:5000/ihub/v1/files/',
    getReportPage: 'http://agaikwad-pc.actuate.com:5000/ihub/v1/getReportPage'
});

myApp.filter('escape', function() {
    return window.escape;
});