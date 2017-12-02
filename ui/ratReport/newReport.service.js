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

    let removeOnlineUser = (user) => {
        return $http.post('/rest/ratReport/removeOnlineUser', {'user': user}).then(resolveCallBack, rejectCallBack);
    };

    return {
        submitNewReport: submitNewReport,
        removeOnlineUser: removeOnlineUser

    };
}