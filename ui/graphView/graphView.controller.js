/* @ngInject */
export default function($scope, GraphViewService) {
    const vm = this;
    vm.startDate = null;
    vm.endDate = null;
    vm.requestInProgress = false;
    vm.convertMonthToNum = {
        'January': 0,
        'February': 1,
        'March': 2,
        'April': 3,
        'May': 4,
        'June': 5,
        'July': 6,
        'August': 7,
        'September': 8,
        'October': 9,
        'November': 10,
        'December': 11
    };

    vm.groupResult = () => {

        const startDateSplitByComma = vm.startDate.split(',');
        // const startDateDay = parseInt(startDateSplitByComma[0].split(' ')[0]);
        const startDateMonth = vm.convertMonthToNum[startDateSplitByComma[0].split(' ')[1]];
        const startDateYear = parseInt(startDateSplitByComma[1]);

        const endDateSplitByComma = vm.endDate.split(',');
        // const endDateDay = parseInt(endDateSplitByComma[0].split(' ')[0]);
        const endDateMonth = vm.convertMonthToNum[endDateSplitByComma[0].split(' ')[1]];
        const endDateYear = parseInt(endDateSplitByComma[1]);

        const startDateObj = new Date(startDateYear, startDateMonth);
        const endDateObj = new Date(endDateYear, endDateMonth);

        if (startDateObj > endDateObj) {
            Materialize.toast('Invalid Dates', 3000, 'rounded');
            return;
        }
        vm.requestInProgress = true;
        // const requestStartDate = (startDateMonth + 1).toString() + '/' + startDateDay.toString() + '/' + startDateYear.toString();
        const requestStartDate = (startDateMonth + 1).toString() + '/' + startDateYear.toString();
        // const requestEndDate = (endDateMonth + 1).toString() + '/' + endDateDay.toString() + '/' + endDateYear.toString();
        const requestEndDate = (endDateMonth + 1).toString() + '/' + endDateYear.toString();

        GraphViewService.getReportsInRangeGrouped(requestStartDate, requestEndDate).then((data) => {
            if (data['status']) {

                Highcharts.chart('container', {
                    title: {
                        text: 'Rat Reports Data'
                    },

                    yAxis: {
                        title: {
                            text: 'Number of Reports'
                        }
                    },

                    xAxis: {
                        categories: data.data.x
                    },

                    // plotOptions: {
                    //     series: {
                    //         pointStart: data.data.x[0]
                    //     }
                    // },

                    series: [{
                        data: data.data.y
                    }]
                });

                Materialize.toast('Reports are being loaded', 3000, 'rounded');
                vm.requestInProgress = false;

            } else {
                Materialize.toast('Error while getting reports', 3000, 'rounded');
                vm.requestInProgress = false;

            }
        }, (error) => {
            Materialize.toast('Request failed', 3000, 'rounded');
            vm.requestInProgress = false;
        });


    };

    // Highcharts.chart('container', {
    //     title: {
    //         text: 'Temperature Data'
    //     },
    //
    //     xAxis: {
    //         categories: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun',
    //             'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'
    //         ]
    //     },
    //
    //     series: [{
    //         data: [29.9, 71.5, 106.4, 129.2, 144.0, 176.0, 135.6, 148.5, 216.4, 194.1, 95.6, 54.4]
    //     }]
    // });
}