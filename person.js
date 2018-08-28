"use strict";

class Person {
  constructor(adapterObj, data) {
    this.details                = {};
    this.intermidiateState      = {};
    this.adapter                = adapterObj;

    typeof data === "object"  ? (this.intermidiateState = data) : (this.id = parseInt(data));
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
    return this.adapter.add(this.intermidiateState)
    .then(savedPerson => {
      this.details              = savedPerson;
      this.id                   = savedPerson["id"];
      this.intermidiateState    = {};
      console.log("Person Added");
      return this;
    })
  }

  update() {
    return this.adapter
    .update(this.id, this.intermidiateState)
    .then(detail => {
      this.details            = detail;
      this.id                 = this.details.id;
      this.intermidiateState  = {};
      return this;
    });    
  }

  remove() {
    return this.adapter.delete(this.id);
  }

  findAll() {
    return this.adapter.findAll();
  }

  findOne(id = null) {
    let searchId = id ? parseInt(id) : this.id;
    return this.adapter.findOne(searchId);
  }

  find(obj){
    return this.adapter.find(obj);
  }

  getOriginal(key) {
    return this.adapter.get(this.id,key)
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

module.exports = Person;
