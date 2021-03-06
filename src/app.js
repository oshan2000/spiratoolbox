var app = angular.module('myApp', ['ui.router', 
                                     'ui.mask', 
                                     'LocalStorageModule',
                                     'ngResource',
                                     'ngSanitize',
                                     'nya.bootstrap.select',
                                     'moment-picker']);

/*ui-router routes*/
app.config(['$stateProvider','$urlRouterProvider',
	function ($stateProvider, $urlRouterProvider) { 
        'use strict';

        $stateProvider.
            state('auth', {
                url: '/auth',
                controller: 'AuthCtrl',
                controllerAs: 'mv',
                templateUrl: './views/home/auth.html'
            }).
            state('app', {
            	url: '/app',
            	templateUrl : './views/home/home.html'
            }).
            state('app.projects', {
                url: '/projects',
                templateUrl : './views/projects/projectList.html',
                controller : "ProjectCtrl"
            }).
            state('app.releases', {
                url: "/project/:id/releases",
                templateUrl : './views/projects/projectReleases.html',
                controllerAs : "mv",
                controller : "ProjectCtrl"
            }).
            state('app.reviewer', {
                params: { projects: {} },
                url : '/reviewer',
                templateUrl : './views/projects/projectsViewer.html',
                controller : "ProjectViewerCtrl"
            });

            $urlRouterProvider.otherwise('/');
}]);