const axios = require('axios');
const jsdom = require('jsdom');
const {JSDOM} = jsdom;



// axios.get("https://www3.animeflv.net").then((response) => {
//     const dom = new JSDOM(response.data);
//     //console.log(response.data);
//     console.log(dom.window.document.getElementsByClassName("Top")[0].children[0].textContent);
// })

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
    #ids = [];

    constructor(label, classes, ids){
        this.#htmlLabel = label;
        this.#classes = classes;
        this.#ids = ids;
    }

    interpret(context){

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
                let ids = [];
                let classes = [];

                for(let argument of splittedArguments){
                    if(argument.startsWith('.'))
                        classes.push(argument);
                    else
                        ids.push(argument);
                }

                expression.push(new SearchExpression(label, classes, ids));
            }

            else{
                expression.push(new TerminalExpression(semiQuery));
            }
        }

        return expression;
    }
}

var parser = new Parser();
var expression = parser.parse('div(.Top&.fa-icon)>strong');
console.log(expression);

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




