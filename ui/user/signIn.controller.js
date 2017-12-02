/* @ngInject */
export default function($scope, $log, $state, SignInService) {
    const vm = this;
    vm.checkBoxValue = false;
    vm.isSignIn = true;
    vm.resetPasswordOption = false;
    vm.forgotEmail = '';
    vm.otherMethods = false;

    var user = firebase.auth().currentUser;

    if (user) {
        // Materialize.toast('You are signed in already.', 3000, 'rounded');
        $state.go('viewLatestReports');
    }

    // firebase.auth().onAuthStateChanged(function(user) {
    //     if (user) {
    //         // User is signed in.
    //         // Materialize.toast('You are signed in already.', 3000, 'rounded');
    //         $state.go('viewLatestReports');
    //     } else {
    //         // No user is signed in.
    //     }
    // });


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

                SignInService.isUserOnline(vm.userInfo.email).then((data) => {
                    if (data.status === true) {
                        firebase.auth().signOut().then(() => {
                            Materialize.toast('User already logged in :(', 3000, 'rounded');
                        })
                    } else {
                        SignInService.addOnlineUser(vm.userInfo.email).then(() => {
                            Materialize.toast('Welcome ' + firebaseUser.email, 3000, 'rounded');
                            $state.go('viewLatestReports');
                        })
                    }
                }).catch((error) => {
                    console.log('error');
                    Materialize.toast('Error', 3000, 'rounded');
                    return
                });

                // Materialize.toast('Welcome ' + firebaseUser.email, 3000, 'rounded');
                // $state.go('viewLatestReports');
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
    };

    vm.resetPassword = function() {
        console.log('in reset password');
        if (vm.forgotEmail === '' || vm.forgotEmail === null) {
            Materialize.toast('Email not valid', 3000, 'rounded');
            return;
        }

        firebase.auth().sendPasswordResetEmail(vm.forgotEmail).then(() => {
            Materialize.toast('Email sent, check your email', 3000, 'rounded');
            vm.forgotEmail = '';
            vm.forgotPasswodPressed();
            console.log(vm.resetPasswordOption);
            $scope.$apply();
        }).catch((error) => {
            Materialize.toast(error.message, 3000, 'rounded');
        });
    };

    vm.forgotPasswodPressed = () => {
        vm.resetPasswordOption = !vm.resetPasswordOption;
    };

    vm.facebook = () => {
        const facebook_provider = new firebase.auth.FacebookAuthProvider();

        firebase.auth().signInWithPopup(facebook_provider).then(function(result) {
            // This gives you a Facebook Access Token. You can use it to access the Facebook API.
            // var token = result.credential.accessToken;
            // The signed-in user info.
            // var user = result.user;
            // ...
            // console.log(user);
            if (result.user !== null) {
                Materialize.toast('Welcome ' + user.email, 3000, 'rounded');
                $state.go('viewLatestReports');
            }
            console.log('popup sign in good');

            var user = firebase.auth().currentUser;

            if (user) {
                // Materialize.toast('You are signed in already.', 3000, 'rounded');
                $state.go('viewLatestReports');
            }

        }).catch(function(error) {
            // Handle Errors here.
            var errorCode = error.code;
            var errorMessage = error.message;
            // The email of the user's account used.
            var email = error.email;
            // The firebase.auth.AuthCredential type that was used.
            var credential = error.credential;
            // ...
            // Materialize.toast('Facebook Authentication Failed', 3000, 'rounded');
            // Materialize.toast(errorMessage, 3000, 'rounded');
            console.log(errorCode);
            console.log(errorMessage);
            console.log(error);

            var user = firebase.auth().currentUser;

            if (user) {
                // Materialize.toast('You are signed in already.', 3000, 'rounded');
                $state.go('viewLatestReports');
            }
        });
        // firebase.auth().signInWithRedirect(facebook_provider);
    };

    // firebase.
    // firebase.auth().getRedirectResult().then(function(result) {
    //     if (result.credential) {
    //         // This gives you a Google Access Token. You can use it to access the Google API.
    //         var token = result.credential.accessToken;
    //         // ...
    //     }
    //     // The signed-in user info.
    //     var user = result.user;
    //
    //     if (user !== null) {
    //         console.log(result);
    //         Materialize.toast('Welcome ' + user.email, 3000, 'rounded');
    //         $state.go('viewLatestReports');
    //     }
    //
    // }).catch(function(error) {
    //     // Handle Errors here.
    //     var errorCode = error.code;
    //     var errorMessage = error.message;
    //     // The email of the user's account used.
    //     var email = error.email;
    //     // The firebase.auth.AuthCredential type that was used.
    //     var credential = error.credential;
    //     // ...
    //     // Materialize.toast('Facebook Authentication Failed', 3000, 'rounded');
    //     // Materialize.toast(errorMessage, 3000, 'rounded');
    // });
}