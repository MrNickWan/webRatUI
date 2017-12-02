/*ngInject*/
export default function($http, $q) {

    let resolveCallBack = (data) => {
        return data.data
    };

    let rejectCallBack = (error) => {
        console.log(error);
        return error;
    };

    let getReportsInRangeGrouped = (beginDate, endDate) => {
        return $http.get('/rest/ratReport/getReportsInRangeGrouped?begin=' + beginDate + '&end=' + endDate).then(resolveCallBack, rejectCallBack);
    };

    let removeOnlineUser = (user) => {
        return $http.post('/rest/ratReport/removeOnlineUser', {'user': user}).then(resolveCallBack, rejectCallBack);
    };

    return {
        getReportsInRangeGrouped: getReportsInRangeGrouped,
        removeOnlineUser: removeOnlineUser
    };
}