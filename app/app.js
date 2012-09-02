
var app = angular.module('app', []);

var runTests = function(code, tests, callback){
    var myReporter = {
        reportSuiteResults: function(results){
            var allpass = true;
            for (var i=0; i<tests.length; i++) {
                var t = tests[i];
                t.result = results.specs_[i].results_.failedCount === 0;
                t.msg = t.result ? null : results.specs_[i].results_.items_[0].message;
                
                allpass = allpass && t.result;
            }
            callback(allpass);
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
            console.log('run tests');
            $scope.run();
        }
    };
    
    $scope.versions = [];
    
    $scope.title = 'Write some code and try to make the tests green!';

    $scope.code = "var plus = function(a, b){ return a+b;};";

    $scope.tests = [
        {seq: 1, content: 'expect(plus(1, 2)).toEqual(3);'},
        {seq: 2, content: 'expect(plus(-2, 7)).toEqual(5);'}];
        
    $scope.level = 0;
    
    var viewOneMoreTest = function(){
        $scope.level++;
        $scope.testsInPlay = $scope.tests.slice(0, $scope.level);
    };
    
    var format = function(nb){
        return nb < 10 ? '0' + nb : nb;
    };
    
    var getTime = function(){
        var d = new Date();
        return d.getHours()+':'+format(d.getMinutes())+':'+format(d.getSeconds());
    };
    
    var newVersion = function(){
        return {
            ts: getTime(),
            code: $scope.code, 
            level: $scope.level
        };
    };

    $scope.run = function() {
        runTests($scope.code, $scope.testsInPlay, function(allpass){
            if (allpass) {
                if ($scope.level === $scope.tests.length) {
                    $scope.title = 'You did it! Prafo!!'
                }
                else {
                    viewOneMoreTest();
                }
            }
            var nv = newVersion(), ov = $scope.currentVersion;
            if (!ov || (nv.code != ov.code || nv.level > ov.level)) {
                $scope.versions.push($scope.currentVersion = nv);
            }
            
            $scope.$apply();
        });
    };
    
    $scope.getClass = function(t){
        if (t.result === true) {
            return 'pass';
        } else if (t.result === false) {
            return 'fail';
        }
    }
    
    viewOneMoreTest();
});
