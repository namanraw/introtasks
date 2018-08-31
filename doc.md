# Built.io Backend Doc.

## Create Project Instance
```
let project  = Built.App(API_KEY);
``` 
## Create Class Instance
```
let class = project.Class(CLASS_UID);
```
## Create Object Instance
```
let object = class.Object;
```

## Creating An Object
```
object().assign(newInsertObject)
        .save()
        .then(saveObj=>console.log(saveObj.toJSON()))
        .catch(err=>console.log(err))
```

## Update An Object

```
object(OBJECT_UID).set(KEY,VALUE)
                  .save()
                  .then(saveObj=>console.logsaveObj.toJSON()))
                  .catch(err=>console.log(err))
```
>Object with mentioned UID is updated.

## Draft An Object
```
object().assign(newInsertObject)
        .saveAsDraft()
        .then(saveObj=>console.log(saveObj.toJSON()))
        .catch(err=>console.log(err))
```
>This returns an UID of the object which is not __Published__ yet ,but is Saved as __Draft__.

## Publish Drafted Object
Pulishing is similar to updating a document by mentioning the UID recieved from drafting the object and updating the __published__ key to `true`.

