/* @ngInject */
export default function($scope, $log, LatestReportsService) {
    const vm = this;
    vm.dataReady = false;
    vm.reportList = [];
    console.log('jajajajaj');
    Materialize.toast('Loading...', 1500, 'rounded');

    LatestReportsService.getLatestReports().then((data) => {
        console.log('jack');
        console.log(data);
        vm.reportList = data.list;
        vm.dataReady = true;
    }, (error) => {
        console.log(error);
    });

    vm.redirectToDetailsView = (key) => {
        console.log(key);
    }

}