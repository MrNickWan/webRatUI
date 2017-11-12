import angular from 'angular';
import uiRouter from '@uirouter/angularjs';

// import function to register all controllers
import registerControllers from './app.controllers';

// import function to register all services
import registerServices from './app.service'

// declare angular app
const angularApp = angular.module('app', [uiRouter]);

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
    }).state('newReport', {
        url: '/newReport',
        templateUrl: 'ratReport/newReport.html',
        controllerAs: 'vm',
        controller: 'NewReportController'
    });

    $locationProvider.html5Mode(true);
    $locationProvider.hashPrefix('');

});