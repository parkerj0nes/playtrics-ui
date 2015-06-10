(function () {
    'use strict';
    var controllerId = 'admin';
    angular.module('app')
          .factory('RandomDataModel', function ($interval, WidgetDataModel) {
              function RandomDataModel() {
              }

              RandomDataModel.prototype = Object.create(WidgetDataModel.prototype);
              RandomDataModel.prototype.constructor = WidgetDataModel;

              angular.extend(RandomDataModel.prototype, {
                  init: function () {
                      var dataModelOptions = this.dataModelOptions;
                      this.limit = (dataModelOptions && dataModelOptions.limit) ? dataModelOptions.limit : 100;

                      this.updateScope('-');
                      this.startInterval();
                  },

                  startInterval: function () {
                      $interval.cancel(this.intervalPromise);

                      this.intervalPromise = $interval(function () {
                          var value = Math.floor(Math.random() * this.limit);
                          this.updateScope(value);
                      }.bind(this), 500);
                  },

                  updateLimit: function (limit) {
                      this.dataModelOptions = this.dataModelOptions ? this.dataModelOptions : {};
                      this.dataModelOptions.limit = limit;
                      this.limit = limit;
                  },

                  destroy: function () {
                      WidgetDataModel.prototype.destroy.call(this);
                      $interval.cancel(this.intervalPromise);
                  }
              });

              return RandomDataModel;
          })
        .factory('widgetDefinitions', function (RandomDataModel) {
        return [
          {
              name: 'random',
              directive: 'wt-scope-watch',
              attrs: {
                  value: 'randomValue'
              }
          },
          {
              name: 'time',
              directive: 'wt-time'
          },
          {
              name: 'datamodel',
              directive: 'wt-scope-watch',
              dataAttrName: 'value',
              dataModelType: RandomDataModel
          },
          {
              name: 'resizable',
              templateUrl: 'app/common/widget/resizable.html',
              attrs: {
                  class: 'demo-widget-resizable'
              }
          },
          {
              name: 'fluid',
              directive: 'wt-fluid',
              size: {
                  width: '50%',
                  height: '250px'
              }
          }
        ];
    })
  .value('defaultWidgets', [
    { name: 'random' },
    { name: 'time' },
    { name: 'datamodel' },
    {
        name: 'random',
        style: {
            width: '50%'
        }
    },
    {
        name: 'time',
        style: {
            width: '50%'
        }
    }
  ]).controller(controllerId, ['common', 'widgetDefinitions', 'defaultWidgets', admin])

    function admin(common, widgetDefinitions, defaultWidgets) {
        var getLogFn = common.logger.getLogFn;
        var log = getLogFn(controllerId);

        var vm = this;
        vm.title = 'Admin';
        vm.dashboardOptionsTest = {
            widgetButtons: false,
            widgetDefinitions: widgetDefinitions,
            defaultWidgets: defaultWidgets,
            storage: common.$window.localStorage,
            storageId: 'demo_simple'
        };
        vm.randomValue = Math.random();
        common.$interval(function () {
            vm.randomValue = Math.random();
        }, 500);

        activate();

        function activate() {
            common.activateController([], controllerId)
                .then(function () { log('Activated Admin View'); });
        }
    }
})();