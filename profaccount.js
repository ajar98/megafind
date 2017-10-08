const mongodb = require('mongodb');
const uri = 'mongodb://megafind:megamind1@ds115085.mlab.com:15085/megafind';

class profaccount{
   constructor(username, students){
       this.username = username;
       this.lstofstudents= new Array() ;
       this.students = students;
       mongodb.MongoClient.connect(uri, function(err, db){
        if(err){
       throw err;
           }
       var child = db.collection('professors');
       child.insert([{username, students}],function(err, result){
       if(err){
           throw err;
           }
            db.close(function (err) {
             if(err) throw err;
           });
       });
       });
   }

   getEmails(){
       var user = this.username;
       console.log(user);
       mongodb.MongoClient.connect(uri, function(err, db){
        if(err){
       throw err;
           }
           var lst = new Array();
           var child = db.collection('professors');

           child.find({username: user}).toArray(function(err, result){
           console.log(result.length);

           for(var i =0; i < result.length; i++){
               result[i].students.forEach(function(arg){lst.push(arg);});
           }
           return lst;
           db.close(function (err) {
             if(err) throw err;
           });
   });
})
}
}

p = new profaccount("hi", ["kartik", "ajay", "anthony", "kian"])
p.getEmails();


