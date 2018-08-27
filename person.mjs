"use strict";

class Person {
  constructor(adapterObj, data) {
    this.details                = {};
    this.intermidiateState      = {};
    this.adapter                = adapterObj;
    typeof data === "object"
      ? (this.intermidiateState = data)
      : (this.id                = parseInt(data));
  }

  assign(key,obj) {
    this.intermidiateState[key] = obj;
    return this;
  }

  set(key, value) {
    this.intermidiateState[key] = value;
    return this;
  }

  save() {
    this.adapter.add(this.intermidiateState).then(savedPerson => {
      this.details              = savedPerson;
      this.id                   = savedPerson["id"];
      this.intermidiateState    = {};
      console.log("Person Added");
      return this;
    })
  }

  update() {
    this.adapter
    .update(this.id, this.intermidiateState)
    .then(detail => {
      this.details            = detail;
      this.id                 = this.details.id;
      this.intermidiateState  = {};
      return this;
    });    
  }

  remove() {
    this.adapter
      .delete(this.id)
      .then(msg => console.log(msg)
      )
      .catch(err=> console.log(err)
      );
    return this;
  }

  findAll() {
    return this.adapter.findAll();
  }

  find() {
    return this.adapter.findOne(this.id);
  }

  getOriginal(key) {
    return new Promise((resolve, reject) => {
      this.adapter
        .get(this.id)
        .then(d => {
          resolve(d[key]);
        })
        .catch(err => {
          reject(err);
        });
    });
  }

  get(key) {
    return this.intermidiateState[key] ? this.intermidiateState[key] :  this.details[key] ;
  }

  reset(){
    this.details            = {};
    this.id                 = {};
    this.intermidiateState  = {};
    return this;
  }
}

export default Person;
