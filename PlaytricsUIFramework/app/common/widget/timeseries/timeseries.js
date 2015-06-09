(function () {
    'use strict';
    var controllerId = 'timeseries';
    angular.module('app').controller(controllerId, ['common', 'datacontext', pvtimeseries]);

    function pvtimeseries(common, datacontext) {
        var getLogFn = common.logger.getLogFn;
        var log = getLogFn(controllerId);

        var vm = this;
        vm.widgetMeta = getWidgetMeta();
        

        activate();

        function getWidgetMeta() {
            return {
                id: 123,
                seriesData:[],
                game: 'TimeSeries widget',
                module: 'This is a module string',
                series: 'TimeSeries name',
                description: 'Hot Towel Angular is a SPA template for Angular developers.'
            };
        }

        function activate() {
            var promises = [getMessageCount(), getPeople(), getPrivacyCompareData()];
            common.activateController(promises, controllerId)
                .then(function (data) { log(data); });
        }

        function getMessageCount() {
            return datacontext.getMessageCount().then(function (data) {
                return vm.messageCount = data;
            });
        }

        function getPeople() {
            return datacontext.getPeople().then(function (data) {
                return vm.people = data;
            });
        }
        function getPrivacyCompareData() {
            return datacontext.getPrivacyCompareData().then(function (data) {
                log("Privacy data got")
                return vm.PrivacyCompareChartData = data;
            });
        }
    }
})();