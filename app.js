/**
 * Created by bushan on 6/5/16.
 */

'use strict';

angular
.module('authApp',['auth0','angular-storage','angular-jwt','ngMaterial','ui.router'])
.config(function($provide,authProvider,$urlRouterProvider,$stateProvider,$httpProvider,jwtInterceptorProvider){
    $urlRouterProvider.otherwise('/home');

    // passing the config object to auth provider
    authProvider.init({
        domain:'testjcs.auth0.com',
        clientId:'SWvArQDueSGeLIY5j1oVQAgZy6Jg6fYt'
    });




    $stateProvider
        .state('home',{
            url:'/home',
            templateUrl:'components/home/home.tpl.html'
        })
        .state('profile',{
            url:'/profile',
            templateUrl:'components/profile/profile.tpl.html',
            controller:'profileController as user'
        });





});