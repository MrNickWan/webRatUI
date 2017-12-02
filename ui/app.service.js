import newReportService from './ratReport/newReport.service'
import latestReportsService from './latestReports/latestReports.service'
import viewReportService from './viewReport/viewReport.service'
import mapViewService from './mapView/mapView.service'
import graphViewService from './graphView/graphView.service'
import signInService from './user/signIn.service'

export default (angularApp) => {
    angularApp.factory('NewRatReportService', newReportService);
    angularApp.factory('LatestReportsService', latestReportsService);
    angularApp.factory('ViewReportService', viewReportService);
    angularApp.factory('MapViewService', mapViewService);
    angularApp.factory('GraphViewService', graphViewService);
    angularApp.factory('SignInService', signInService);
}