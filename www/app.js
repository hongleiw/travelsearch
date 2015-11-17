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
    show: 'Chengdu',
    value: 'chengdu'
  }, {
    show: 'Dunhuang',
    value: 'dunhuang'
  },  {
    show: 'Chongqing',
    value: 'chongqing'
  }, {
    show: 'Dalian',
    value: 'dalian'
  }, {
    show: 'GuangZhou',
    value: 'guangzhou'
  }, {
    show: 'Guilin',
    value: 'guilin'
  }, {
    show: 'Hohhot',
    value: 'hohhot'
  }, {
    show: 'Huangshan',
    value: "huangshan"
  }, {
    show: 'Harbin',
    value: 'harbin'
  }, {
    show: 'Jiayuguan',
    value: 'jiayuguan'
  }, {
    show: 'Nanjing',
    value: 'nanjing'
  }, {
    show: 'Macau',
    value: 'macau'
  }, {
    show: 'Taipei',
    value: 'taipei'
  }, {
    show: 'Shenyang',
    value: 'shenyang'
  }];
$scope.themeslist = [{
    show: 'Great Wall',
    value: 'Great Wall'
  }, {
    show: 'Terracotta Warriors',
    value: 'Terracotta Warriors'
  }, {
    show: 'Panda',
    value: "Panda"
  }, {
    show: 'No-Shopping',
    value: 'No-Shopping'
  }, {
    show: 'With Accommodation',
    value: 'With Accommodation'
  }, {
    show: 'With Air Ticket',
    value: 'With Air Ticket'
  }, {
    show: 'Pickup & Drop-off',
    value: 'Pickup & Drop-off'
  }, {
    show: 'Performance',
    value: 'Performance'
  }, {
    show: 'Food & Drink',
    value: 'Food & Drink'
  }, {
    show: 'Group Tour',
    value: 'Group Tour'
  }, {
    show: 'Private Tour',
    value: 'Private Tour'
  },
  {
    show: 'Cruise & Water Tour',
    value: 'Cruise & Water Tour'
  }, {
    show: 'Multi-City Tour',
    value: 'Multi-City Tour'
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
      //console.log($scope.ctrl.selectedItem.value);
      //console.log($scope.info.theme);
      //$http.get('/api/v1/themes?dest='+$scope.ctrl.selectedItem.value + '&themes=' + $scope.info.theme)
      console.log($scope.info.maxfare);
      if($scope.info.maxfare=={$$mdSelectId: 1}){
        $scope.info.maxfare=null;
      }
      console.log($scope.info.theme);
      $http.get('/api/v1/themes?dest='+$scope.info.maxfare + '&theme=' + $scope.info.theme)
      //$http.get('/api/v1/themes')
      .success(function(data) {
        console.log(data);
        $scope.results = data;
        $scope.data = data.info;

        if ($scope.results.status) {
          console.log($scope.data);
          //$scope.themes = JSON.parse($scope.data);
          //console.log($scope.themes);
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
