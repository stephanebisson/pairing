
mainController = function(){
    this.title = 'Write some code and try to make the tests green!';
    
    this.code = 'some code here\n\nand then some more';
    
    this.tests = [
        {content: 'do this'},
        {content: 'do that'}
    ];
    
    this.runTests = function(){
        this.tests.push({content: 'and yet another one'});
    };
};

