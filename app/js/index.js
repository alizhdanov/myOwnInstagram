var app = angular.module('app', []);

// app.service('instagramData', function ($http) {
//   var self = this;
//
//   $http.get('js/instagram.json').then(function (response) {
//     self.images = response.data.data;
//   });
//
//   $http.get('js/instagramInfo.json').then(function (response) {
//     self.info = response.data.data;
//   });
//
// });

app.controller('CurrencyController', function($http){
  var self = this;

  this.limit = 8;

  this.modalIndex = 0;

  this.loadMore = function () {
    self.limit += 8;
  };
  
  this.showModal = function (index) {
    self.modalIndex = index;

    $('#myModal').modal('show');

  };

  // this.images = instagramData.images;

  $http.get('js/instagram.json').then(function (response) {
    self.images = response.data.data;
  });

  // this.sortType = self.images.caption.created_time;
  this.sortType = '';

  this.sortReverse = false;

});

app.controller('InfoController', function ($http) {
  var self = this;

  $http.get('js/instagramInfo.json').then(function (response) {
    self.info = response.data.data;
  });

});
