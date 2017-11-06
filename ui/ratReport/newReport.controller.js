/* @ngInject */
export default function($scope, $log) {
    const vm = this;

    vm.availableBorough = ['The Bronx', 'Queens', 'Brooklyn', 'Staten Island'];
    vm.newReportInfo = {
        borough: '',
        city: '',
        incidentAddress: '',
        incidentZip: '',
        locationType: '',
        longitude: '1',
        latitude: '1'
    };

    Materialize.toast('Redirecting...', 1500, 'rounded');

    vm.submitNewReport = () => {
        console.log(vm.newReportInfo);
    }
}