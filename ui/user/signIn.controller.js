/* @ngInject */
export default function($scope, $log, $state) {
    const vm = this;
    vm.checkBoxValue = false;
    vm.isSignIn = true;

    var user = firebase.auth().currentUser;

    if (user) {
        Materialize.toast('You are signed in already.', 3000, 'rounded');
        $state.go('viewLatestReports');
    }

    vm.userInfo = {
        email: '',
        password: ''
    };

    vm.checkboxClicked = function() {
        vm.isSignIn = !vm.isSignIn;
    };

    vm.signIn = () => {
        if (!vm.validateInput()) {
            Materialize.toast('Invalid input', 3000, 'rounded');
            return;
        }

        console.log('In Sign In');

        firebase.auth().signInWithEmailAndPassword(vm.userInfo.email, vm.userInfo.password)
            .then((firebaseUser) => {
                console.log(firebaseUser);
                Materialize.toast('Welcome ' + firebaseUser.email, 3000, 'rounded');
                $state.go('viewLatestReports');
            })
            .catch((error) => {
                console.log(error.message);
                Materialize.toast('Log In Failed', 3000, 'rounded');
            });
    };

    vm.register = () => {
        console.log('In Register');

        if (!vm.validateInput()) {
            Materialize.toast('Invalid input', 3000, 'rounded');
            return;
        }

        firebase.auth().createUserWithEmailAndPassword(vm.userInfo.email, vm.userInfo.password).then(() => {
            Materialize.toast('Welcome ' + vm.userInfo.email, 3000, 'rounded');
            $state.go('viewLatestReports');
        }).catch(function(error) {
            // Handle Errors here.
            var errorCode = error.code;
            var errorMessage = error.message;
            console.log(errorMessage);
            Materialize.toast(errorMessage, 3000, 'rounded');
            // ...
        });

    };

    vm.validateInput = () => {
        if (vm.userInfo.email === '' || vm.userInfo.email === null || vm.userInfo.password === '' || vm.userInfo.password === null) {
            return false;
        }

        return true;
    }

    // firebase.
}