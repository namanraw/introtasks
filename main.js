let Person = require('./person');
let ArrayAdapter = require('./adapters/array_adapter');
let MongoAdapter = require('./adapters/mongo_adapter');

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

let adapter = new MongoAdapter();

function sequence( personsArray ){
  let persons = wrapInPerson(personsArray)
  let seqPromise = Promise.resolve()

  persons.forEach(person => {
    seqPromise = seqPromise.then(() => person.save()) 
  })
  return seqPromise
}

function wrapInPerson(personsArray){
  return personsArray.map(person => {
    return new Person(adapter, person)
  })
}


 sequence(peopleData)
.then(lastInstance =>  lastInstance.findOne())
.then(people => {
  console.log(people)
})
.catch(err => console.log(err))





