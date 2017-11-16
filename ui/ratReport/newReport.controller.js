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

    vm.submitNewReport = () => {
        if (vm.verifyReportInput()) {
            vm.submitting = true;
            vm.newReportInfo.incidentZip = vm.uncastedZip.toString();
            navigator.geolocation.getCurrentPosition(vm.populateGeolocation);

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
        vm.newReportInfo.latitude = position.coords.latitude;
        vm.newReportInfo.longitude = position.coords.longitude;

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