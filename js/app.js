// Ionic Starter App

// angular.module is a global place for creating, registering and retrieving Angular modules
// 'starter' is the name of this angular module example (also set in a <body> attribute in index.html)
// the 2nd parameter is an array of 'requires'
// 'starter.services' is found in services.js
// 'starter.controllers' is found in controllers.js
angular.module('starter', ['ionic', 'starter.services', 'starter.controllers'])


.config(function($stateProvider, $urlRouterProvider) {


    // Ionic uses AngularUI Router which uses the concept of states
    // Learn more here: https://github.com/angular-ui/ui-router
    // Set up the various states which the app can be in.
    // Each state's controller can be found in controllers.js
    $stateProvider

    // setup an abstract state for the tabs directive
    .state('tab', {
        url: "/tab",
        abstract: true,
        templateUrl: "templates/tabs.html"
    })

    // the pet tab has its own child nav-view and history
    .state('tab.pet-index', {
        url: '/login',
        views: {
            'pets-tab': {
                templateUrl: 'templates/login.html',
                controller: 'PetIndexCtrl'
            }
        }
    }).state('tab.pet-index1', {
        url: '/folderListing',
        views: {
            'pets-tab': {
                templateUrl: 'templates/folderListing.html',
                controller: 'fileFolderListCtrl'
            }
        }
    }).state('tab.pet-index11', {
        url: '/folderListing/:folderId',
        views: {
            'pets-tab': {
                templateUrl: 'templates/folderListing.html',
                controller: 'fileFolderListCtrl'
            }
        }
    })
        .state('tab.pet-index111', {
            url: '/fileListing/:fileId',
            views: {
                'pets-tab': {
                    templateUrl: 'templates/fileListing.html',
                    controller: 'fileCtrl'
                }
            }
        })
        .state('tab.pet-detail', {
            url: '/petsss/:petId',
            views: {
                'pets-tab': {
                    templateUrl: 'templates/pet-detail.html',
                    controller: 'PetDetailCtrl'
                }
            }
        })

    .state('tab.adopt', {
        url: '/adopt',
        views: {
            'adopt-tab': {
                templateUrl: 'templates/feedback.html',
                controller: 'CatchAllController'
            }
        }
    })

    .state('tab.about', {
        url: '/about',
        views: {
            'about-tab': {
                templateUrl: 'templates/folderListing.html',
                controller: 'CatchAllController'

            }
        }
    });

    // if none of the above states are matched, use this as the fallback
    $urlRouterProvider.otherwise('/tab/login');

});