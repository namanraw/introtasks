let constant    = require('../constant');
let functions   = require('../utils');

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

  find(object){
    return new Promise((resolve,reject)=>{
      if (functions.isEmpty(people)) 
        reject(constant.PEOPLE_LIST_EMPTY_MESSAGE);
      let person = functions.extractFilteredPeople(object,people);
      if (!functions.personIsFound(person)) 
        reject(constant.PERSON_NOT_FOUND_MESSAGE);
      resolve(person);
    })
  }

  // GET THE LAST PERSON's ID
  getNewId() {    
    return  functions.isEmpty(people) ?  1 : parseInt(people[people.length - 1]["id"])+1;
  }

  // ADD THE PERSON DETAILS TO THE PEOPLE ARRAY
  add(details) {
    return new Promise((resolve, reject) => {
      details["id"] = this.getNewId();
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


