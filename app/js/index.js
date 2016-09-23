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

  $http.get('https://api.instagram.com/v1/users/self/media/recent/?access_token=30834278.1677ed0.89946055d33c49e594dc7f8cc9039dee').then(function (response) {
    self.images = response.data.data;
    console.log('media downloaded');
  });

  // this.sortType = self.images.caption.created_time;
  this.sortType = '';

  this.sortReverse = false;

});

app.controller('InfoController', function ($http) {
  var self = this;

  $http.get('https://api.instagram.com/v1/users/self/?access_token=30834278.1677ed0.89946055d33c49e594dc7f8cc9039dee').then(function (response) {
    self.info = response.data.data;
    console.log('info downloaded');
  });

});
