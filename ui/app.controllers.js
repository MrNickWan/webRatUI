import testPageControllerFunction from './testPage/testPage.controller'
import rootControllerFunction from './root/root.controller'
import signInControllerFunction from './user/signIn.controller'
import newReportControllerFunction from './ratReport/newReport.controller'
import viewLatestReportsControllerFunction from './latestReports/latestReports.controller'

export default (angularApp) => {
    angularApp.controller('TestPageController', ['$scope', '$log', testPageControllerFunction]);
    angularApp.controller('RootController', ['$scope', '$log', rootControllerFunction]);
    angularApp.controller('SignInController', ['$scope', '$log', signInControllerFunction]);
    angularApp.controller('NewReportController', ['$scope', '$log', 'NewRatReportService', '$state', newReportControllerFunction]);
    angularApp.controller('ViewLatestReportsController', ['$scope', '$log', 'LatestReportsService', viewLatestReportsControllerFunction]);
}