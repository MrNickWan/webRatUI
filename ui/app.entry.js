import angular from 'angular';
import uiRouter from '@uirouter/angularjs';
import ngMap from 'ngmap';

// import function to register all controllers
import registerControllers from './app.controllers';

// import function to register all services
import registerServices from './app.service'

// declare angular app
const angularApp = angular.module('app', [uiRouter, ngMap]);

registerControllers(angularApp);
registerServices(angularApp);

angularApp.config(($stateProvider, $locationProvider) => {

    $stateProvider.state('testPage', {
        url: '/testPage',
        templateUrl: 'testPage/testPage.html',
        controllerAs: 'vm',
        controller: 'TestPageController'
    }).state('signIn', {
        url: '/signIn',
        templateUrl: 'user/signIn.html',
        controllerAs: 'vm',
        controller: 'SignInController'
    }).state('root', {
        url: '/',
        templateUrl: 'root/root.html',
        controllerAs: 'vm',
        controller: 'RootController'
    }).state('viewLatestReports', {
        url: '/viewLatestReports',
        templateUrl: 'latestReports/latestReports.html',
        controllerAs: 'vm',
        controller: 'ViewLatestReportsController'
    }).state('newReport', {
        url: '/newReport',
        templateUrl: 'ratReport/newReport.html',
        controllerAs: 'vm',
        controller: 'NewReportController'
    }).state('viewReport', {
        url: '/viewReport',
        templateUrl: 'viewReport/viewReport.html',
        controllerAs: 'vm',
        controller: 'ViewReportController',
        params: {
            reportId: null
        }
    }).state('mapView', {
        url: '/mapView',
        templateUrl: 'mapView/mapView.html',
        controllerAs: 'vm',
        controller: 'MapViewController',
    }).state('graphView', {
        url: '/graphView',
        templateUrl: 'graphView/graphView.html',
        controllerAs: 'vm',
        controller: 'GraphViewController'
    });

    $locationProvider.html5Mode(true);
    $locationProvider.hashPrefix('');

});