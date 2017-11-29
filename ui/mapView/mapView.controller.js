/* @ngInject */
export default function($scope, $log, MapViewService, $window, NgMap, $state) {
    const vm = this;
    vm.googleMapsUrl = 'https://maps.googleapis.com/maps/api/js?key=AIzaSyCV-w_f4dqxvz46JxzYl80IwCBuaP8cQso';
    vm.startDate = null;
    vm.endDate = null;
    vm.markers = [];
    vm.requestInProgress = false;
    vm.convertMonthToNum = {
        'January': 0,
        'February': 1,
        'March': 2,
        'April': 3,
        'May': 4,
        'June': 5,
        'July': 6,
        'August': 7,
        'September': 8,
        'October': 9,
        'November': 10,
        'December': 11
    };
    vm.map = null;

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

    NgMap.getMap().then((e)=> {
       vm.map = e;
    });


    vm.queryResult = () => {

        const startDateSplitByComma = vm.startDate.split(',');
        const startDateDay = parseInt(startDateSplitByComma[0].split(' ')[0]);
        const startDateMonth = vm.convertMonthToNum[startDateSplitByComma[0].split(' ')[1]];
        const startDateYear = parseInt(startDateSplitByComma[1]);

        const endDateSplitByComma = vm.endDate.split(',');
        const endDateDay = parseInt(endDateSplitByComma[0].split(' ')[0]);
        const endDateMonth = vm.convertMonthToNum[endDateSplitByComma[0].split(' ')[1]];
        const endDateYear = parseInt(endDateSplitByComma[1]);

        const startDateObj = new Date(startDateYear, startDateMonth, startDateDay);
        const endDateObj = new Date(endDateYear, endDateMonth, endDateDay);

        if (startDateObj > endDateObj) {
            Materialize.toast('Invalid Dates', 3000, 'rounded');
            return;
        }
        vm.requestInProgress = true;
        const requestStartDate = (startDateMonth + 1).toString() + '/' + startDateDay.toString() + '/' + startDateYear.toString();
        const requestEndDate = (endDateMonth + 1).toString() + '/' + endDateDay.toString() + '/' + endDateYear.toString();

        MapViewService.getReportsInRange(requestStartDate, requestEndDate).then((data) => {
            if (data['status']) {
                vm.markers = data.data;
                Materialize.toast('Reports are being loaded', 3000, 'rounded');
                vm.requestInProgress = false;

            } else {
                Materialize.toast('Error while getting reports', 3000, 'rounded');
                vm.requestInProgress = false;

            }
        }, (error) => {
            Materialize.toast('Request failed', 3000, 'rounded');
            vm.requestInProgress = false;
        });


    };

    vm.viewDetailedInfo = (event, e) => {
        $state.go('viewReport', {
            reportId: e
        });
    }

}