
var app = angular.module('app', []);

var runTests = function(code, tests, s){
    var myReporter = {
        reportSuiteResults: function(results){
            for (var i=0; i<tests.length; i++) {
                var t = tests[i];
                t.result = results.specs_[i].results_.failedCount === 0;
                t.msg = t.result ? null : results.specs_[i].results_.items_[0].message;
            }
            s.$apply();
        },
    };
    myReporter.reportSpecStarting = angular.noop;
    myReporter.reportSpecResults = angular.noop;
    var env = jasmine.getEnv();
    env.reporter = myReporter;
    var suite = env.describe('d', function(){
        angular.forEach(tests, function(t){             
            var name = 't'+t.seq;
            var f = eval('function f(){' + t.content + '} f');
            it (name, f);
        });
    });
    eval(code);
    suite.execute(angular.noop);
};

app.controller('mainController', function($scope){
    document.onkeypress = function(e){
        if (e.ctrlKey && e.charCode === 18) {
            $scope.run();
        }
    };
    
    $scope.title = 'Write some code and try to make the tests green!';

    $scope.code = "var plus = function(a, b){ return a+b;};";

    $scope.tests = [
        {seq: 1, content: 'expect(plus(1, 2)).toEqual(3);'},
        {seq: 2, content: 'expect(plus(-2, 7)).toEqual(5);'}];
        
    $scope.level = 1;
    
    var updateVisibleTests = function(){
        $scope.testsInPlay = $scope.tests.slice(0, $scope.level);
    };

    $scope.run = function() {
        runTests($scope.code, $scope.testsInPlay, $scope);
    };
    
    $scope.getClass = function(t){
        if (t.result === true) {
            return 'pass';
        } else if (t.result === false) {
            return 'fail';
        }
    }
    
    updateVisibleTests();
});

// misc code

// 
// var env = jasmine.getEnv();
// env.describe('my feature', function(){ it('behaves', function(){ expect(2).toBe(4); }); });
// suite.execute(function(){ console.log('done!', arguments); });
// var functionNames = [
//     "reportRunnerStarting",
//     "reportRunnerResults",
//     "reportSuiteResults",
//     "reportSpecStarting",
//     "reportSpecResults",
//     "log"
//   ];
//  var r = {};
// angular.forEach(functionNames, function(n){ r[n] = function(){console.log(n, arguments);} });
// env.reporter = r;

