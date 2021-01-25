const axios = require('axios');
const jsdom = require('jsdom');
const {JSDOM} = jsdom;





//div(.Top&.fa-icon)>strong
class TerminalExpression{
    #htmlLabel;

    constructor(label){
        this.#htmlLabel = label;
    }
    
    interpret(context){

    }
}

class SearchExpression{
    #htmlLabel;
    #classes = [];
    #id;

    constructor(label, classes, id){
        this.#htmlLabel = label;
        this.#classes = classes;
        this.#id = id;
    }

    interpret(context){
        var dom = context.current;
        var elements = dom.getElementsByClassName('Top');
        for(let element of elements){
            let hasClasses = this.#classes.every((elem) => element.classList.contains(elem));
            if(hasClasses === true){
                console.log(true);
            }
            let hasId = element.id === this.#id;
            if(hasClasses && hasId){
                context.current = element;
            }
        }
    }

}

class Parser{
    parse(query){
        let expression = [];
        let splittedQuery = query.split('>');
        for(let semiQuery of splittedQuery){
            if(semiQuery.includes('(')){
                let args = semiQuery.match(/\(.*\)/g)[0];
                let label = semiQuery.replace(args, '');
                args = args.replace(/[\(\)]/g, '');
                let splittedArguments = args.split('&');
                let id = '';
                let classes = [];

                for(let argument of splittedArguments){
                    if(argument.startsWith('.'))
                        classes.push(argument.replace('.', ''));
                    else
                        ids.push(argument);
                }

                expression.push(new SearchExpression(label, classes, id));
            }

            else{
                expression.push(new TerminalExpression(semiQuery));
            }
        }

        let expressions = {
            interpret: function(context){
                for(let e of expression){
                    e.interpret(context);
                }
                return context.current;
            }
        }

        return expressions;
    }
}

// var parser = new Parser();
// var expression = parser.parse('div(.Top&.fa-icon)>strong');
// console.log(expression);

axios.get("https://www3.animeflv.net").then((response) => {
    const dom = new JSDOM(response.data);
    context = {
        current: dom.window.document
    };

    var parser = new Parser();
    var expression = parser.parse('div(.Top)>strong');
    
    expression.interpret(context);

    console.log(dom.window.document.getElementsByClassName("Top")[0].children[0].textContent);
})

class Scrapper {

    #content;
    #dom;

    Scrapper(htmlContent){
        this.#content = htmlContent;
        this.#dom = new JSDOM(htmlContent);
    }

    #getElementsByQuery(query){
        
    }

}




