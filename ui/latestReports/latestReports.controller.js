/* @ngInject */
export default function($scope, $log, LatestReportsService, $state) {
    const vm = this;
    vm.dataReady = false;
    vm.reportList = [];
    Materialize.toast('Loading...', 1500, 'rounded');

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