/*ngInject*/
export default function($http, $q) {

    let resolveCallBack = (data) => {
        return data.data
    };

    let rejectCallBack = (error) => {
        console.log(error);
        return error;
    };

    let getReportsInRange = (beginDate, endDate) => {
        return $http.get('/rest/ratReport/getReportsInRange?begin=' + beginDate + '&end=' + endDate).then(resolveCallBack, rejectCallBack);
    };

    return {
        getReportsInRange: getReportsInRange
    };
}