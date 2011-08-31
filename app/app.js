
mainController = function($xhr){
    this.title = 'Write some code and try to make the tests green!';
    
    this.code = 'var Math = {\n\tadd: function(a, b) {\n\t\treturn a + b;\n\t},\n\tsub: function(a, b) {\n\t\treturn a - b;\n\t}\n};';
    
    this.tests = [];

    var self = this;
    
    $xhr('GET', '/couch/tests/_all_docs?include_docs=true', function(code, response) {
        self.tests = response.rows;
    });
    
    this.runTests = function(){
        angular.forEach(this.tests, function(test){
          test.success = !test.success;
        });
    };
};