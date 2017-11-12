import newReportService from './ratReport/newReport.service'

export default (angularApp) => {
    angularApp.factory('NewRatReportService', newReportService);
}