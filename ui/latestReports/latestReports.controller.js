/* @ngInject */
export default function($scope, $log, LatestReportsService, $state) {
    const vm = this;
    vm.dataReady = false;
    vm.reportList = [];
    Materialize.toast('Loading...', 1500, 'rounded');

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
                $state.go('root');
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
                $state.go('root');
            }, (error) => {
                Materialize.toast('Log out failed', 3000, 'rounded');
                console.log(error);
            });
        });
    }

    LatestReportsService.getLatestReports().then((data) => {
        vm.reportList = data.list;
        vm.dataReady = true;
    }, (error) => {
        console.log(error);
    });

    vm.redirectToDetailsView = (key) => {
        // console.log(key);
        $state.go('viewReport', {
            reportId: key
        });
    }

}