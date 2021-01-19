const axios = require('axios');
const jsdom = require('jsdom');
const {JSDOM} = jsdom;



axios.get("https://www3.animeflv.net").then((response) => {
    const dom = new JSDOM(response.data);
    //console.log(response.data);
    console.log(dom.window.document.getElementsByClassName("Top")[0].children[0].textContent);
})

//div(.Top&.fa-icon)>strong

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

class Element{
    #label;
    #matchClassesAndIds;

    
}