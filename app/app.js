
mainController = function($xhr){
    this.title = 'Write some code and try to make the tests green!';
    
    this.code = 'some code here\n\nand then some more';
    
    this.tests = [{content: 'temp data'}];
    var self = this;
    // $.get('/couch/tests/_all_docs?include_docs=true', function(data) {
    //     self.tests = jQuery.parseJSON(data).rows;
    //     alert('Load was performed.');
    // });
    
    $xhr('GET', '/couch/tests/_all_docs?include_docs=true', function(code, response) {
        self.tests = response.rows;
    });
    
    this.runTests = function(){
        angular.forEach(this.tests, function(test){
          test.success = !test.success;
        });
    };
};

