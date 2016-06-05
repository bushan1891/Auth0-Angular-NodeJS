/**
 * Created by bushan on 6/5/16.
 */
(function () {

    'use strict';

    angular
        .module('authApp')
        .directive('toolbar', toolbar);


    function toolbar() {
        // DDO directive defination object
        return {
            templateUrl: 'components/toolbar/toolbar.tpl.html',
            controller: toolbarController,
            controllerAs: 'toolbar'
        }
    }


    function toolbarController(auth, store, $location) {
        var vm = this;
        vm.login = login;
        vm.logout = logout;
        vm.auth = auth;

        function login() {
            // first parametr is a config parameter profile will have user detail token will have the jwt token
            auth.signin({}, function (profile, token) {
                store.set('profile', profile);
                store.set('id_token', token);
                $location.path('/home');

            }, function (error) {
                console.log(error);
            });


        }


        function logout() {
            store.remove('profile');
            store.remove('id_token');
            auth.signout();
            $location.path('/home');

        }


    }

})();

