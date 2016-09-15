var app = angular.module('app', []);

app.directive('navPanel', function(){
  return {
    restrict: 'E',
    templateUrl: '../templates/nav-panel.html' 
  };
});

app.directive('leftPanel', function(){
  return {
    restrict: 'E',
    templateUrl: '../templates/left-panel.html' 
  };
});

app.directive('mainPanel', function(){
  return {
    restrict: 'E',
    templateUrl: '../templates/main-panel.html' 
  };
});

app.directive('pagePanel', function(){
  return {
    restrict: 'E',
    templateUrl: '../templates/page-panel.html' 
  };
});