import newReportService from './ratReport/newReport.service'
import latestReportsService from './latestReports/latestReports.service'
export default (angularApp) => {
    angularApp.factory('NewRatReportService', newReportService);
    angularApp.factory('LatestReportsService', latestReportsService);
}