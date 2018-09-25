module.exports = {
	// hello_world is the name of function in this code block
	"/classes/person_class/objects" : {
		POST : {
      _pre : function(req,res){
        let that = this;
        let app = req.builtApp;
        let clss = app.Class('person_class');
        let q = clss.Query();
        q.where('age', 90)
         .exec()
         .then(d=>that.resSuccess(req,res,d)) 
      }
    }
  },
  "/functions/test":{
    before : function(req,res){
      console.log('hello')
    },
    POST : function(req,res){
      let that = this;
      let app = req.builtApp;
      let clss = app.Class('person_class');
      let q = clss.Query();
      q.where('age', 90)
       .exec()
       .then(d=>{
         let resolved = Promise.resolve();
         d.map(ds=>{
          resolved = resolved.then(()=> ds.set('age',900).save())
         })
         return resolved;
       })
       .then(f=>{
         console.log("lsasdfds: ",f)
         return that.resSuccess(req,res,f)
       }) 
    },
    "/abc":{
      GET : function(req,res) {
        req.logger.log('get call abc')
        return this.resSuccess(req,res,'done');
      }
    },
    "/abc1":{
      PUT : function(req,res) {
        req.logger.log('get call abc1')
        return this.resSuccess(req,res,{h:'bnh'});
      }
    }
  }
}