/*ngInject*/
export default function($http, $q) {

    let resolveCallBack = (data) => {
        return data.data
    };

    let rejectCallBack = (error) => {
        console.log(error);
        return error;
    };

    let submitNewReport = (reportDetails) => {
        return $http.post('/rest/ratReport/saveReport', reportDetails).then(resolveCallBack, rejectCallBack);
    };

    return {
        submitNewReport: submitNewReport
    };
}