/* @ngInject */
export default function($scope, $log, NewRatReportService, $state) {
    const vm = this;

    vm.availableBorough = ['The Bronx', 'Queens', 'Brooklyn', 'Staten Island'];
    vm.availableLocations = ['Family Dwelling', 'Family Apt. Building', 'Family Mixed Use Building',
                            'Commercial Building', 'Vacant Lot', 'Construction Site', 'Hospital', 'Catch Basin/Sewer'];
    vm.uncastedZip = null;
    vm.submitting = false;
    vm.newReportInfo = {
        borough: '',
        city: '',
        incidentAddress: '',
        incidentZip: null,
        locationType: '',
        longitude: '1',
        latitude: '1'
    };

    Materialize.toast('Redirecting...', 1500, 'rounded');

    var user = firebase.auth().currentUser;

    if (!user) {
        Materialize.toast('You are not authorized.', 3000, 'rounded');
        $state.go('signIn');
    } else {
        $('#login1').hide();
        $('#login2').hide();
        $('#logout1').off('click');
        $('#logout2').off('click');
        $('#logout1').show();
        $('#logout1').text(user.email);
        $('#logout1').click(() => {
            Materialize.toast('Signing out', 3000, 'rounded');
            firebase.auth().signOut().then(() => {
                // Sign-out successful.
                $('#login1').show();
                $('#login2').show();
                $('#logout1').hide();
                $('#logout2').hide();
                NewRatReportService.removeOnlineUser(user.email).then(() => {
                    $state.go('root');
                }).catch(() => {
                    Materialize.toast('Log out failed', 3000, 'rounded');
                });
            }, (error) => {
                Materialize.toast('Log out failed', 3000, 'rounded');
                console.log(error);
            });
        });

        $('#logout2').show();
        $('#logout2').text(user.email);
        $('#logout2').click(() => {
            Materialize.toast('Signing out', 3000, 'rounded');
            firebase.auth().signOut().then(() => {
                // Sign-out successful.
                $('#login1').show();
                $('#login2').show();
                $('#logout1').hide();
                $('#logout2').hide();
                NewRatReportService.removeOnlineUser(user.email).then(() => {
                    $state.go('root');
                }).catch(() => {
                    Materialize.toast('Log out failed', 3000, 'rounded');
                });
            }, (error) => {
                Materialize.toast('Log out failed', 3000, 'rounded');
                console.log(error);
            });
        });
    }

    vm.submitNewReport = () => {
        if (vm.verifyReportInput()) {
            vm.submitting = true;
            vm.newReportInfo.incidentZip = vm.uncastedZip.toString();

            if (location.hostname === "localhost" || location.hostname === "127.0.0.1") {
                navigator.geolocation.getCurrentPosition(vm.populateGeolocation);
            } else {
                vm.populateGeolocation(null);
            }

            // NewRatReportService.submitNewReport(vm.newReportInfo)
        }
    };

    vm.verifyReportInput = () => {
        if (vm.uncastedZip.toString().length !== 5) {
            Materialize.toast('Given Zip is shorter than 5 digits.', 2000, 'rounded');

            return false;
        }

        if (navigator.geolocation) {
            return true;
        } else {
            Materialize.toast('Unable to retrieve geolocation', 1500, 'rounded');
            return false;
        }

    };

    vm.populateGeolocation = (position) => {

        if (position !== null) {
            vm.newReportInfo.latitude = position.coords.latitude;
            vm.newReportInfo.longitude = position.coords.longitude;
        }

        console.log('[Before submission] Content in newReportInfo');
        console.log(vm.newReportInfo);
        Materialize.toast('Submitting new rat report', 2000, 'rounded');

        NewRatReportService.submitNewReport(vm.newReportInfo).then((data) => {
            if (data.status) {
                vm.submitting = false;
                Materialize.toast('New Report created', 3000, 'rounded');
                $state.go('root');
            } else {
                vm.submitting = false;
                Materialize.toast('Submission Failed', 3000, 'rounded');
            }
        }, (errorInfo) => {
            vm.submitting = false;
            console.log(errorInfo);
            Materialize.toast('Submission Failed', 3000, 'rounded');
        });
    }
}