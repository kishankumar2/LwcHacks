public without sharing class BeerListController {
   

@AuraEnabled(cacheable=true)
public static list<Beer__c> getBeerList(Integer limitSize, Integer offset){
    try {
        return [Select id,Alcohol__c, brewery_id__c,Image__c , Price__c, Id__c,Name from Beer__c LIMIT :limitSize
        OFFSET :offset];
    } catch (Exception e) {
        throw new AuraHandledException(e.getMessage());
    }
}
@AuraEnabled(cacheable=true)
public static list<Beer__c> getBeerListFiltrerd(String name){
    try {
        return [Select id,Alcohol__c, brewery_id__c,Image__c , Price__c, Id__c,Name from Beer__c where Name like :'%'+name+'%' Limit 10];
    } catch (Exception e) {
        throw new AuraHandledException(e.getMessage());
    }
}



}