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