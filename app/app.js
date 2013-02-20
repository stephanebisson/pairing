
var app = angular.module('app', []);

app.factory('jasmineTestRunner', function(){
    
    var createReporter = function(){
        var results;
        return {
            reportSpecStarting: angular.noop,
            reportSpecResults: angular.noop,
            reportSuiteResults: function(raw){
                var r = {};
                angular.forEach(results.specs_, function(spec){
                    
                });
            },
            getResults: function(){
                return results;
            }
        };
    };
    
    return function(code, tests, callback){
        var myReporter = {
            reportSuiteResults: function(results){
                //console.log('results', results);
                var allpass = true;
                for (var i=0; i<tests.length; i++) {
                    var t = tests[i];
                    //console.log(results.specs_[i].results_);
                    t.result = results.specs_[i].results_.failedCount === 0;
                    t.msg = t.result ? null : results.specs_[i].results_.items_[i].message;

                    allpass = allpass && t.result;
                }
                callback(allpass);
            },
        };
        myReporter.reportSpecStarting = angular.noop;
        myReporter.reportSpecResults = angular.noop;
        
        var env = jasmine.getEnv();
        //console.log('env', env);
        env.reporter = myReporter;
        var suite = env.describe('d', function(){
            angular.forEach(tests, function(t){             
                var f = eval('function f(){\n' + t.content + '\n} f');
                it (t.seq, f);
            });
        });
        try { 
            eval(code);
            suite.execute(angular.noop);
        } catch (e) {
            angular.forEach(tests, function(t){
                t.result = false;
                t.msg = e;
            });
        }
        
    };
});

app.controller('TddController', function($scope, jasmineTestRunner){
    $scope.versions = [];
    
    $scope.title = 'Write some code and try to make the tests green!';

    $scope.code = '';
    
    $scope.tests = [
        {seq: 1, content: "var myMock = mock().getter('name').build();\n\nmyMock.name('bob');\n\nexpect(myMock.name()).toBe('bob');"},
        {seq: 2, content: "var myMock = mock().action('notify').action('reset').build();\n\nmyMock.notify();\n\nexpect(myMock.notifyWasCalled()).toBe(true);\n\nexpect(myMock.resetWasCalled()).toBe(false);"},
        {seq: 3, content: "var mockView = mock().event('onSubmit').build();\nvar mockPresenter = mock().action('reaction').build();\n\nmockView.onSubmit(mockPresenter.reaction);\nmockView.fireonSubmit();\n\nexpect(mockPresenter.reactionWasCalled()).toBe(true);"}
    ];
        
    $scope.nbLines = function(text) {
        return text.split('\n').length + 2;
    };
        
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
        jasmineTestRunner($scope.code, $scope.testsInPlay, function(allpass){
            if (allpass) {
                if ($scope.level === $scope.tests.length) {
                    $scope.title = 'Good job, chief'
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
    
    $scope.getVersionClass = function(version){
        return version === $scope.currentVersion ? 
            'selected' : 'not-selected';
    };
    
    $scope.selectVersion = function(version){
        $scope.currentVersion = version;
        $scope.code = $scope.currentVersion.code;
        $scope.level = $scope.currentVersion.level;
        $scope.testsInPlay = $scope.tests.slice(0, $scope.level);
    };
    
    viewOneMoreTest();
});
