(function () {
    'use strict';

    var serviceId = 'datacontext';
    angular.module('app').factory(serviceId, ['common', datacontext]);

    function datacontext(common) {
        var $q = common.$q;

        var service = {
            getPeople: getPeople,
            getMessageCount: getMessageCount,
            getPrivacyCompareData: getPrivacyCompareData
        };

        return service;

        function getMessageCount() { return $q.when(72); }

        function getPeople() {
            var people = [
                { firstName: 'John', lastName: 'Papa', age: 25, location: 'Florida' },
                { firstName: 'Ward', lastName: 'Bell', age: 31, location: 'California' },
                { firstName: 'Colleen', lastName: 'Jones', age: 21, location: 'New York' },
                { firstName: 'Madelyn', lastName: 'Green', age: 18, location: 'North Dakota' },
                { firstName: 'Ella', lastName: 'Jobs', age: 18, location: 'South Dakota' },
                { firstName: 'Landon', lastName: 'Gates', age: 11, location: 'South Carolina' },
                { firstName: 'Haley', lastName: 'Guthrie', age: 35, location: 'Wyoming' }
            ];
            return $q.when(people);
        }
        function getPrivacyCompareData() {
            var deferral = $q.defer();

            var successFn = function (data) {
                console.log(data);
                deferral.resolve(data);
            }

            $.ajax({
                url: 'http://localmonitoring.playverse.com:7552/Game/PrivacyChartData?game=DD2&region=USEast_NorthVirg&interval=15&start=2015-06-08T04:00:00.000Z&end=2015-06-08T20:45:30.179Z',
                crossDomain: true,
                success: successFn
            })

            return $q.when(deferral.promise);
        }
    }
})();