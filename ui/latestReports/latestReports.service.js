/*ngInject*/
export default function($http, $q) {

    let resolveCallBack = (data) => {
        return data.data
    };

    let rejectCallBack = (error) => {
        console.log(error);
        return error;
    };

    let getLatestReports = () => {
        return $http.get('/rest/ratReport/getLatest50').then(resolveCallBack, rejectCallBack);
    };

    return {
        getLatestReports: getLatestReports
    };
}