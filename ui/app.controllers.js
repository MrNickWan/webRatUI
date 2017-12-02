import testPageControllerFunction from './testPage/testPage.controller'
import rootControllerFunction from './root/root.controller'
import signInControllerFunction from './user/signIn.controller'
import newReportControllerFunction from './ratReport/newReport.controller'
import viewLatestReportsControllerFunction from './latestReports/latestReports.controller'
import viewReportControllerFunction from './viewReport/viewReport.controller'
import mapViewControllerFunction from './mapView/mapView.controller'
import graphViewControllerFunction from './graphView/graphView.controller'

export default (angularApp) => {
    angularApp.controller('TestPageController', ['$scope', '$log', testPageControllerFunction]);
    angularApp.controller('RootController', ['$scope', '$log', rootControllerFunction]);
    angularApp.controller('SignInController', ['$scope', '$log', '$state', 'SignInService', signInControllerFunction]);
    angularApp.controller('NewReportController', ['$scope', '$log', 'NewRatReportService', '$state', newReportControllerFunction]);
    angularApp.controller('ViewLatestReportsController', ['$scope', '$log', 'LatestReportsService', '$state', viewLatestReportsControllerFunction]);
    angularApp.controller('ViewReportController', ['$scope', '$log', 'ViewReportService', '$state', '$stateParams', viewReportControllerFunction]);
    angularApp.controller('MapViewController', ['$scope', '$log', 'MapViewService', '$window', 'NgMap', '$state', mapViewControllerFunction]);
    angularApp.controller('GraphViewController', ['$scope', 'GraphViewService', '$state', graphViewControllerFunction]);
}