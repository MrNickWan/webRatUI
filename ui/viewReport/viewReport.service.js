/*ngInject*/
export default function($http, $q) {

    let resolveCallBack = (data) => {
        return data.data
    };

    let rejectCallBack = (error) => {
        console.log(error);
        return error;
    };

    let getReportWithID = (reportID) => {
        return $http.get('/rest/ratReport/getReport?id=' + reportID).then(resolveCallBack, rejectCallBack);
    };

    return {
        getReportWithID: getReportWithID
    };
}