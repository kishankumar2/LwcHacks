import { LightningElement, track } from 'lwc';
import getBeerList from '@salesforce/apex/BeerListController.getBeerList';
export default class BeerList2 extends LightningElement {
    
    lastScrollTop=0
    rowLimit =10;
    rowOffSet=0;
    error;
    @track beerList = [];

    isLoading = false;
    connectedCallback() {
        this.loadData();
    }

    loadData(){
        return  getBeerList({ limitSize: this.rowLimit , offset : this.rowOffSet })
        .then(result => {
            let updatedList = [...this.beerList, ...result];
            this.beerList = updatedList;
            this.error = undefined;
        })
        .catch(error => {
            this.error = error;
            this.beerList = undefined;
        });
    }
    
    handleScroll1(){
        let element=this.template.querySelector('.beersDiv');
        console.log('Handling1 Scroll'+element.scrollTop+' --- '+element.scrollHeight);
        if (element.scrollTop < this.lastScrollTop){
            // it's an Up Scroll 
            return;
         } 

         this.lastScrollTop = element.scrollTop <= 0 ? 0 : element.scrollTop;

          if (element.scrollTop + element.offsetHeight>= element.scrollHeight ){
            // Reached the End of The Div Query Next Set of Data
            this.isLoading = true;
            this.rowOffSet = this.rowOffSet + this.rowLimit;
            console.log("End");
            this.loadData()
            .then(()=> {
                console.log('Updated data');
                this.isLoading = false;
            });   
          }
    }

      
   
}