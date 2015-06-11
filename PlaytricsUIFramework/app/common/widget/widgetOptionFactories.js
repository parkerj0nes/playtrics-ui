(function () {
    'use strict';

    var pvwidgetModule = angular.module('pvWidgets', []);

    pvwidgetModule.factory('pvwidgetDefinitions', function () {
        return [
          {
              name: 'TimeSeries',
              directive: 'playchart',
              attrs: {
                  class: "time-series-widget",
                  controllerId: 'admin',
                  moduleId: 'randomValue',
                  SeriesID: 'randomValue'
              }
          },
          {
              name: 'DataTable',
              directive: 'fuckshit',
              attrs: {
                  class: "data-table-widget",
                  controllerId: 'admin',
                  moduleId: 'randomValue',
                  SeriesID: 'randomValue'
              }
          },
          {
              name: 'datamodel',
              directive: 'wt-scope-watch',
              dataAttrName: 'value'
          },
          {
              name: 'Html',
              directive: 'ccImgPerson',
              attrs: {
                  class: "html-widget",
                  controllerId: 'randomValue',
                  moduleId: 'randomValue',
                  SeriesID: 'randomValue'
              }
          }
        ];
    });

    pvwidgetModule.factory('pvwidgetOptionsModalConfig', function () {
        return [
            {
                name: "TimeSeriesOptions",
                modalOptions: {
                    templateUrl: 'app/common/widget/timeseries/ChartOptionsModal.html',
                    controller: 'ModalCtrl', // defined elsewhere,
                    animation: true,
                    keyboard: true
                }
            }
        ];
    });
    pvwidgetModule.value('defaultWidgets', [
    { name: 'DataTable' },
    { name: 'TimeSeries' },
    { name: 'Html' }
    ]);

    pvwidgetModule.factory('widgetinterface', ['pvwidgetDefinitions', 'pvwidgetOptionsModalConfig', 'defaultWidgets',function (definitions, ModalConfig, defaultWidgets) {

        return {
            ModalOptions: ModalConfig,
            WidgetDefinitions: definitions,
            defaultWidgets: defaultWidgets
        }
    }]);

    
})();



