angular.module('getLostApp', ['ngMaterial']).
controller('MainCtrl', function($rootScope, $scope, $mdToast, $animate, $http, $timeout, $q, $log) {
  'use strict';
  // Initialize the scope variables
  $scope.info = {
    origin: {},
    maxfare: {},
    theme: {},
    returndate: new Date(),
    departuredate: new Date()
  };

  $scope.prices = [{
    show: '$200',
    value: 200
  }, {
    show: '$300',
    value: 300
  }, {
    show: '$400',
    value: 400
  }, {
    show: '$500',
    value: 500
  }, {
    show: '$600',
    value: 600
  }, {
    show: '$700',
    value: 700
  }, {
    show: '$800',
    value: 800
  }, {
    show: '$900',
    value: 900
  }, {
    show: '$1000',
    value: 1000
  }, {
    show: '$1100',
    value: 1100
  }, {
    show: '$1200',
    value: 1200
  }, {
    show: '$1300',
    value: 1300
  }, {
    show: '$1400',
    value: 1400
  }, {
    show: '$1500',
    value: 1500
  }];
$scope.themeslist = [{
    show: 'BEACH',
    value: 5200
  }, {
    show: 'DISNEY',
    value: 5300
  }, {
    show: 'GAMBLING',
    value: 5400
  }, {
    show: 'HISTORIC',
    value: 5500
  }, {
    show: 'MOUNTAINS',
    value: 5600
  }, {
    show: 'NATIONAL-PARKS',
    value: 5700
  }, {
    show: 'OUTDOORS',
    value: 5800
  }, {
    show: 'ROMANTIC',
    value: 5900
  }, {
    show: 'SHOPPING',
    value: 15000
  }, {
    show: 'SKIING',
    value: 51100
  }, {
    show: 'THEME-PARK',
    value: 51200
  }];
  // The main function that submits the data
  $scope.submit = function() {
    $scope.error = null;
    $scope.fareinfo = null;

    // $http.get('/api/v1/places?origin=' + $scope.ctrl.selectedItem.value +
    //     '&departuredate=' + formatDate($scope.info.departuredate) +
    //     '&returndate=' + formatDate($scope.info.returndate) +
    //     '&maxfare=' + $scope.info.maxfare)
    //   .success(function(data) {
    //     $scope.results = data;
    //     $scope.data = data.info;

    //     if ($scope.results.status) {
    //       $scope.fareinfo = JSON.parse($scope.data).FareInfo;
    //       console.log($scope.fareinfo);
    //       $scope.showSimpleToast('Successfully got flight info');
    //     } else {
    //       $scope.showSimpleToast('Error: ' +
    //         JSON.parse($scope.data.data).message +
    //         '. Try again!');
    //     }
    //   })
    //   .error(function(err) {
    //     $scope.showSimpleToast('Error: ' +
    //       JSON.parse(err.data).message +
    //       '. Try again!');
    //   });

      $http.get('/api/v1/themes')
      .success(function(data) {
        console.log(data);
        $scope.results = data;
        $scope.data = data.info;

        if ($scope.results.status) {
          $scope.themes = JSON.parse($scope.data).Themes;
          console.log($scope.themes);
          $scope.showSimpleToast('Successfully got themes info');
        } else {
          $scope.showSimpleToast('Error: ' +
            JSON.parse($scope.data.data).message +
            '. Try again!');
        }
      })
      .error(function(err) {
        $scope.showSimpleToast('Error: ' +
          JSON.parse(err.data).message +
          '. Try again!');
      });
  };

  var self = this;
  self.states = [];

  (function getCityInformation() {
    var cities = [];
    $http.get('/api/v1/cities').success(function(data) {
      cities = (JSON.parse(data.info)).Cities || [];
      self.states = cities.map(function(state) {
        return {
          value: state.code,
          display: state.code + '-' + state.countryName
        };
      });
    }).error(function(err) {
      $scope.showSimpleToast('Error: ' +
        JSON.stringify(err) +
        '. Try again!');
    });
  })();

  self.querySearch = function(query) {
    var results = query ?
      self.states.filter(createFilterFor(query)) :
      self.states;

    return results;
  };

  function createFilterFor(query) {
    var lowercaseQuery = angular.lowercase(query);
    return function filterFn(state) {
      return ((angular.lowercase(state.value)).indexOf(lowercaseQuery) === 0);
    };
  }

  // Helper function to format the date
  function formatDate(date) {
    var d = new Date(date),
      month = '' + (d.getMonth() + 1),
      day = '' + d.getDate(),
      year = d.getFullYear();

    if (month.length < 2) {
      month = '0' + month;
    }
    if (day.length < 2) {
      day = '0' + day;
    }

    return [year, month, day].join('-');
  }

  // Helper functions to show the toast message on success or error
  (function toastHelper() {
    $scope.toastPosition = {
      bottom: false,
      top: true,
      left: false,
      right: true,
      fit: true
    };

    $scope.getToastPosition = function() {
      return Object.keys($scope.toastPosition)
        .filter(function(pos) {
          return $scope.toastPosition[pos];
        })
        .join(' ');
    };

    $scope.showSimpleToast = function(msg) {
      $mdToast.show(
        $mdToast.simple()
        .content(msg)
        .position($scope.getToastPosition())
        .hideDelay(3000)
      );
    };
  })();

});
