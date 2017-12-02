/*ngInject*/
export default function($http, $q) {

    let resolveCallBack = (data) => {
        return data.data
    };

    let rejectCallBack = (error) => {
        console.log(error);
        return error;
    };

    let addOnlineUser = (user) => {
        return $http.post('/rest/ratReport/addOnlineUser', {'user': user}).then(resolveCallBack, rejectCallBack);
    };

    let removeOnlineUser = (user) => {
        return $http.post('/rest/ratReport/removeOnlineUser', {'user': user}).then(resolveCallBack, rejectCallBack);
    };

    let isUserOnline = (user) => {
        return $http.post('/rest/ratReport/isUserOnline', {'user': user}).then(resolveCallBack, rejectCallBack);
    };

    return {
        addOnlineUser: addOnlineUser,
        removeOnlineUser: removeOnlineUser,
        isUserOnline: isUserOnline
    };
}