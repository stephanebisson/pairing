describe('jasmine test runner', function(){
    
    beforeEach(module('app'));
    
    afterEach(function(){});
    
    it('should execute the tests with the code', inject(function(jasmineTestRunner){
        var test1 = 'expect(plus(1,1)).toEqual(2);',
            test2 = 'var sum = plus(3,4); expect(sum).toBe(6)', 
            code = 'function plus(a,b) {return a+b;}', 
            finished = false, 
            allpass,
            finish = function(all){ allpass = all; finished = true; }, 
            isItFinished = function(){ return finished; }
            
        jasmineTestRunner(code, [test1, test2], finish);
        
        waitsFor(isItFinished);
            
        expect(test1.result).toBe(true);
    }));
});