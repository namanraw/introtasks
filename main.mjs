import Person from "./person.mjs";
import ArrayAdapter from "./arrayAdapter.mjs";

const peopleData = [
  {
    name: "Naman Bhardwaj",
    age: 23,
    gender: "Male"
  },
  {
    name: "Varun Bhardwaj",
    age: 30,
    gender: "Male"
  },
  {
    name: "Vivaan Bhardwaj",
    age: 1,
    gender: "Male"
  },
  {
    name: "Kanu Bhardwaj",
    age: 28,
    gender: "Female"
  }
];

let adapter = new ArrayAdapter();
let personInstance;

// peopleData.map(personData => {
//   personInstance = new Person(adapter, personData).save();
// });

personInstance = new Person(adapter, peopleData[0]).save();
// console.log(personInstance.findAll());
personInstance.set("name", "altamash");
// console.log(personInstance);
console.log(personInstance.get("name"));
personInstance.getOriginal("name").then(name => {
  console.log("Original"+name);
});
