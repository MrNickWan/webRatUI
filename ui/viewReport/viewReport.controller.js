/* @ngInject */
export default function($scope, $log, ViewReportService, $state, $stateParams) {
    const vm = this;

    vm.reportInfo = {
        borough: '',
        city: '',
        incidentAddress: '',
        incidentZip: '',
        locationType: '',
        longitude: '1',
        latitude: '1'
    };

    vm.reportId = $stateParams.reportId;
    vm.dataReady = false;
    vm.loadingMessage = 'Loading report #' + vm.reportId + ' ......';

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

                ViewReportService.removeOnlineUser(user.email).then(() => {
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
                ViewReportService.removeOnlineUser(user.email).then(() => {
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

    ViewReportService.getReportWithID(vm.reportId).then((data) => {
        if (data.status) {
            delete data.data['uniqueKey'];
            delete data.data['createdDate'];
            vm.reportInfo = data.data;
            vm.dataReady = true;
            vm.loadingMessage = 'Report #' + vm.reportId + ' is loaded';
            console.log(vm.reportInfo);
        } else {
            vm.loadingMessage = 'Report with id ' + vm.reportId + ' cannot be retrieved at this time';
        }
    }, (error) => {
        vm.loadingMessage = 'Encountered an error !!!';
    });

}