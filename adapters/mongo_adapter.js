const mongodb          = require('mongodb').MongoClient;
const constant         = require('../constant');
const UtilityFunctions = require('../utils');
const functions        = new UtilityFunctions();

class MongoAdapter {
  constructor(
    databaseUrl    = constant.DATABASE_URL,
    databaseName   = constant.DEFAULT_DATABASE_NAME,
    collectionName = constant.DEFAULT_COLLECTION_NAME
  ) {
    this.dbUrl          = dat`abaseUrl;
    this.dbName         = databaseName;
    this.collectionName = collectionName;`
  }

  findAll() {
    return this.connectDb()
      .then(() => this.collection.find())
      .then(foundData => foundData.toArray())
      .catch(err => { throw (err) })
  }

  findOne(id) {
    return this.connectDb()
      .then(() => this.collection.findOne({ id: id }))
      .catch(err => { throw err })
  }

  find(findObject) {
    return this.connectDb()
      .then(() => this.collection.find(findObject))
      .catch(err => { throw err })
  }

  add(details) {
    return this.connectDb()
      .then(() => this.findAll())
      .then(peopleList => functions.addIdToDetailsAndReturn(details, peopleList))
      .then(detailsWithId => this.collection.insertOne(detailsWithId, { w: 1 }))
      .then(insertedMongoObject => functions.returnInsertedPerson(insertedMongoObject))
      .catch(err => { throw err })
  }

  update(id, newDetails) {
    return this.connectDb()
      .then(() => this.collection.updateOne({ id: id }, { $set: newDetails }, { new: true }))
      .then(() => this.findOne(id))
      .catch(err => { throw err })
  }

  delete(id) {
    return this.connectDb()
      .then(() => this.collection.findAndRemove({ id: id }))
      .catch(err => { throw err })
  }

  get(id, key) {
    return this.connectDb()
      .then(() => this.findOne(id))
      .then(foundPerson => foundPerson[key])
      .catch(err => { throw err })
  }

  connectDb() {
    return new Promise((resolve, reject) => {
      mongodb.connect(this.dbUrl, { useNewUrlParser: true })
        .then(connectionInstance => {
          let databaseInstance = connectionInstance.db(this.dbName);
          this.collection = databaseInstance.collection(this.collectionName);
          resolve(this.collection)
        })
        .catch(err => reject(err))
    })
  }
}

module.exports = MongoAdapter;