/**
 * Created by bushan on 6/5/16.
 */

'use strict';

angular
    .module('authApp', ['auth0', 'angular-storage', 'angular-jwt', 'ngMaterial', 'ui.router'])
    .config(function ($provide, authProvider, $urlRouterProvider, $stateProvider, $httpProvider, jwtInterceptorProvider) {
        $urlRouterProvider.otherwise('/home');


        //jwtInterseptor adds autheriazation header to all hhtp request

        jwtInterceptorProvider.tokenGetter = function (store) {
            return store.get('id_token');
        }


        // passing the config object to auth provider
        authProvider.init({
            domain: 'testjcs.auth0.com',
            clientId: 'SWvArQDueSGeLIY5j1oVQAgZy6Jg6fYt'
        });


        $stateProvider
            .state('home', {
                url: '/home',
                templateUrl: 'components/home/home.tpl.html'
            })
            .state('profile', {
                url: '/profile',
                templateUrl: 'components/profile/profile.tpl.html',
                controller: 'profileController as user'
            });

        // handling redirect when  we get 401 unauthrized error form the backend


        function redirect($q,$injector,auth,store,$location){
            return {
                responseError: function(rejection){

                    if(rejection.status==401){
                        auth.signout();
                        store.remove('profile');
                        store.remove('id_token');
                        $location.path('/home');
                    }


                    return $q.reject(rejection);
                }
            }
        }

        $provide.factory('redirect',redirect);
      //  $httpProvider.interceptors.push('redirect');

// for some reason redirect on http 401 response in not working
        //error is

        // we have to push the jwt interseptor to the http request
        // jwtInterceptor is the name of the interceptor
        $httpProvider.interceptors.push('jwtInterceptor');


    })  // we capture the change in url by rootscope every time the url changes we check if the token is present and it is not expired
    .run(function ($rootScope, auth, jwtHelper, $location, store) {
        $rootScope.$on('$locationChangeStart', function () {
            var token = store.get('id_token');
            if (token) {
                if (!jwtHelper.isTokenExpired(token)) {
                    if (!auth.isAuthenticated) {
                        auth.authenticate(store.get('profile'), token);
                    }
                }
            }
            else {
                $location.path('/home');
            }
        })
    });