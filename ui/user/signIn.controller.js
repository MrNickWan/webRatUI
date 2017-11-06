/* @ngInject */
export default function($scope, $log) {
    const vm = this;
    vm.checkBoxValue = false;
    vm.isSignIn = true;

    vm.checkboxClicked = function() {
        vm.isSignIn = !vm.isSignIn;
    }
}