  class UtilityFunctions {

    constructor(){}

    indexIsMinusOne (index)  {
      return index === -1 ? true : false;
    }

    personIsFound  (person)  {
      return person[0] ? true : false;
    }

    isEmpty  (arrayList)  {
      return arrayList.length > 0 ? false : true;
    }

    extractPersonDetailsFromArray  (key,val,people)  {
      return people.filter(p =>  p[key] === parseInt(val))
    }

    extractFilteredPeople  (searchObject,people)  {
      return people.filter(person => {
        if(this.checkIfAllParametersMatches(person,searchObject)) return person;
      })
    }

    extractPersonSavedIndexInArray  (id,people) {
      return people.findIndex(p => p.id === parseInt(id));
    }

    compareObjectValues  (value1,value2)  {
      return value1 === value2 ? true : false;
    }

    checkIfAllParametersMatches  (person,searchObject) {
      let isSearchParameterMatching = false;
      for(let key in searchObject){
        isSearchParameterMatching = this.compareObjectValues( person[key] , searchObject[key] );
      }
      return isSearchParameterMatching;
    }

    returnInsertedPerson  (returnedMongoObject) {
      return returnedMongoObject.ops[0];
    }

    addIdToDetailsAndReturn  (details,peopleList)  {
      details['id'] = this.getNewId(peopleList);
      return details;
    }

    getNewId(peopleList) {    
      return  this.isEmpty(peopleList) ?  1 : parseInt(peopleList[peopleList.length - 1]["id"])+1;
    }

  }

  module.exports = UtilityFunctions;