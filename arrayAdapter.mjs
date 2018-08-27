let people = [];

export default class ArrayAdapter {

  // GET COMPLETE LIST OF PEOPLE
  findAll() {    
    return Promise((resolve,reject)=>{
      let peopleList = people;
      resove(peopleList);
    })
  }

  // GET A SINGLE PERSON DETAIL
  findOne(id) {
    return new Promise((resolve, reject) => {
      if (isEmpty(people)) 
        reject(PEOPLE_LIST_EMPTY_MESSAGE);
      let person = extractPersonDetailsFromArray(id);
      if (!personIsFound(person)) 
        reject(PERSON_NOT_FOUND_MESSAGE);
      let foundPerson = person[0];
      resolve(foundPerson);
    });
  }

  // GET THE LAST PERSON's ID
  getNewId() {    
    return  isEmpty(people) ?  
            1 : 
            parseInt(people[people.length - 1]["id"])+1;
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
      if (isEmpty(people)) reject(PEOPLE_LIST_EMPTY_MESSAGE);
      let index = extractPersonSavedIndexInArray(id)
      if (indexIsMinusOne(index)) reject(PERSON_NOT_FOUND_MESSAGE);

      let currentDeatilState  = people[index];
      let temp                = { ...currentDeatilState, ...newData };
      people[index]           = temp;

      console.log("Person Updated");
      
      resolve(temp);
    })
  }

  // DELETE A PERSON DETAIL
  delete(id) {
    return new Promise((resolve,reject)=>{
      if (isEmpty(people)) reject(PEOPLE_LIST_EMPTY_MESSAGE);
      let index = extractPersonSavedIndexInArray(id);
      if (indexIsMinusOne) reject(PERSON_NOT_FOUND_MESSAGE);
      people.splice(index, 1);
      resolve("Person Deleted");
    })
  }

  get(id) {
    return this.findOne(id);
  }
}

const PEOPLE_LIST_EMPTY_MESSAGE   = "Person List Empty, First Add Some People !!"
const PERSON_NOT_FOUND_MESSAGE    = "No Person Found With Associated Id !!";

const indexIsMinusOne = index => {
  return index === -1 ? true : false;
};
const personIsFound = person => {
  return person[0] ? true : false;
};
const isEmpty = (arrayList) => {
  return arrayList.length > 0 ? false : true;
};
const extractPersonDetailsFromArray = (id) => {
  return people.filter(p =>  p.id === parseInt(id))
};
const extractPersonSavedIndexInArray = (id) =>{
  return people.findIndex(p => p.id === parseInt(id));
};