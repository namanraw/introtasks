let constant    = require('../constant');
const UtilityFunctions      = require('../utils');
const functions             = new UtilityFunctions();


let people = [];

class ArrayAdapter {

  // GET COMPLETE LIST OF PEOPLE
  findAll() {    
    return new Promise((resolve)=>{
      let peopleList = people;
      resolve(peopleList);
    })
  }

  // GET A SINGLE PERSON DETAIL
  findOne(id) {
    return new Promise((resolve, reject) => {
      if (functions.isEmpty(people)) 
        reject(constant.PEOPLE_LIST_EMPTY_MESSAGE);

      let person = functions.extractPersonDetailsFromArray('id',id,people);
      
      if (!functions.personIsFound(person)) 
        reject(constant.PERSON_NOT_FOUND_MESSAGE);

      let foundPerson = person[0];
      resolve(foundPerson);
    });
  }

  find(findObject){
    return new Promise((resolve,reject)=>{
      if (functions.isEmpty(people)) 
        reject(constant.PEOPLE_LIST_EMPTY_MESSAGE);
      let person = functions.extractFilteredPeople(findObject,people);
      if (!functions.personIsFound(person)) 
        reject(constant.PERSON_NOT_FOUND_MESSAGE);
      resolve(person);
    })
  }

  // ADD THE PERSON DETAILS TO THE PEOPLE ARRAY
  add(details) {
    return new Promise((resolve, reject) => {
      console.log(people)
      details["id"] = functions.getNewId(people);
      people.push(details);
      resolve(details);
    })
  }

  // UPDATE THE EXISTING PERSON DETAILS
  update(id, newData) {
    return new Promise((resolve,reject)=>{
      if (functions.isEmpty(people)) reject(constant.PEOPLE_LIST_EMPTY_MESSAGE);
      let index = functions.extractPersonSavedIndexInArray(id,people);      
      if (functions.indexIsMinusOne(index)) reject(constant.PERSON_NOT_FOUND_MESSAGE);

      let currentDeatilState  = people[index];
      let temp                = { ...currentDeatilState, ...newData };
      people[index]           = temp;
     
      resolve(temp);
    })
  }

  // DELETE A PERSON DETAIL
  delete(id) {
    return new Promise((resolve,reject)=>{
      if (functions.isEmpty(people)) reject(constant.PEOPLE_LIST_EMPTY_MESSAGE);      
      let index = functions.extractPersonSavedIndexInArray(id,people);      
      if (functions.indexIsMinusOne) reject(constant.PERSON_NOT_FOUND_MESSAGE);
      
      people.splice(index, 1);
      resolve("Person Deleted");
    })
  }

  get(id,key) {
    return this.findOne(id)
                .then(detail =>{ return (detail[key]) })
                .catch(err=> {return err})
  }
}

module.exports = ArrayAdapter;


