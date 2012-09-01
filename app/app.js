
var app = angular.module('app', []);

app.controller('mainController', function($scope){
    $scope.title = 'Write some code and try to make the tests green!';

    $scope.tests = [
        {seq: 1, content: 'expect(plus(1, 2)).toEqual(3);'},
        {seq: 2, content: 'expect(plus(-2, 7)).toEqual(5);'}];
        
    $scope.level = 1;
    
    var updateVisibleTests = function(){
        $scope.testsInPlay = $scope.tests.slice(0, $scope.level);
    };

    $scope.run = function() {
        angular.forEach($scope.testsInPlay, function(test){
            test.fail = !(test.pass = (parseInt(Math.random()*10)%2 === 0));
        });
        $scope.level++;
        updateVisibleTests();
    };
    
    updateVisibleTests();
});