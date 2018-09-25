let built = require('built.io');
let constants = require('./constant');

let app = built.App(constants.BUILT_IO_API_KEY).enableRealtime();
let appClass = app.Class(constants.BUILT_IO_PERSON_CLASS);
let appObject = appClass.Object;
let appQuery = appClass.Query();




// appObject().assign({
//   name          :  "Varun Bhardwaj",
//   age           :  30,
//   gender        :  'Male',
//   address       :  ['rohini sector 8']
// }).save()
//   .then(newData => console.log(newData.toJSON()))
//   .catch(err    => console.log(err))
//   .save()
//   .then(newData => console.log(newData.toJSON()))
//   .catch(err    => console.log(err))


// let addressArray = [
//   {


// appObject().assign({
//   name : "Varun Bhardwaj",
//   age : 30,
//   gender : 'Male',
//   address : ['rohini sector 8']
// }).save()
//   .then(newData=>console.log(newData.toJSON()))
//   .catch(err=>console.log(err))
//   .save()
//   .then(newData=>console.log(newData.toJSON()))
//   .catch(err=>console.log(err))



// let addressArray = [
//   {
//     city
//     city         : "virar",
//     state : "Maharashtra"
//   },
//   { addressArray = [
//   {
//     city : "virar",
//     state : "Maharashtra"
//   },
//   {
//     city : "delhi",
//     state :"delhi"
//   }
// ]

let namanObj = appObject('blt63a138b98d7fca89');

namanObj.addQuery('include_owner', true)
namanObj = namanObj.addQuery('include_owner', true);
namanObj.fetch()
  .then(function (object) {
    console.log(object)
  });





// let namanObj = appObject('blt63a138b98d7fca89');

// namanObj.on('update',updateCB)
// appObject.on('create',updateCB)

// function updateCB(project){
//   console.log(project.toJSON()); 
// }