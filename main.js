let Person = require('./person');
let ArrayAdapter = require('./adapters/array_adapter');

const peopleData = [
  {
    name: "Naman Bhardwaj",
    age: 23,
    gender: "Male"
  },
  {
    name: "Varun Bhardwaj",
    age: 23,
    gender: "Male"
  },
  {
    name: "Vivaan Bhardwaj",
    age: 90,
    gender: "Male"
  },
  {
    name: "Kanu Bhardwaj",
    age: 23,
    gender: "Female"
  }
];

let adapter = new ArrayAdapter();
function sequence(personsArray){
  return new Promise((resolve,reject)=>{
    let persons = wrapInPerson(personsArray)

    let holdPromise = Promise.resolve()
  
    persons.forEach((person,i) => {
       holdPromise
      .then(function(){
        holdPromise = person.save()
        if(i === persons.length-1)
          resolve(holdPromise)
      })
    })
  })
}

function wrapInPerson(personsArray){
  return personsArray.map(personJSON => {
    return new Person(adapter, personJSON)
  })
}

sequence(peopleData)
.then(a => {return(a)})
.then(lastInstance => {
  let searchObject = {
    age   : 23,
    name  : "Naman Bhardwaj"
  }
  return lastInstance.find(searchObject)
})
.then(people => {
  console.log(people)
})
.catch(err => console.log(err))





