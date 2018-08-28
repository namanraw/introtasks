const utilitiFunctions = {
  indexIsMinusOne : (index) => {
    return index === -1 ? true : false;
  },

  personIsFound : (person) => {
    return person[0] ? true : false;
  },

  isEmpty : (arrayList) => {
    return arrayList.length > 0 ? false : true;
  },

  extractPersonDetailsFromArray : (key,val,people) => {
    return people.filter(p =>  p[key] === parseInt(val))
  },

  extractFilteredPeople : (searchParameters,people) => {
    return people.filter(person => {
      let isSearchParameterMatching = false;
      for(let key in searchParameters){
        isSearchParameterMatching = utilitiFunctions.compareObjectValues( person[key] , searchParameters[key] );
      }
      if(isSearchParameterMatching) return person;
    })
  },

  extractPersonSavedIndexInArray : (id,people) =>{
    return people.findIndex(p => p.id === parseInt(id));
  },

  compareObjectValues : (value1,value2) => {
    return value1 === value2 ? true : false;
  }
}

module.exports = utilitiFunctions