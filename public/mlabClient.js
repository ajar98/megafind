const MongoClient = require('mongodb').MongoClient;
const uri = 'mongodb://megafind:megamind1@ds115085.mlab.com:15085/megafind';

const MLabClient = module.exports;

MLabClient.createProfessor = (user, password, students) => {
    MongoClient.connect(uri, function(err, db) {
       if (err) throw err;
       db.collection('professors').find({user: user}, (err, results) => {
            if (err) throw err;
            if (results.length != 0) {
                db.collection('professors').insert( [{user, password, students}], function(err, result) {
                    if(err) {
                        throw err;
                    }
                    db.close(function (err) {
                        if(err) throw err;
                    });
                });
                return true;
            } else {
                return false;
            }
       });
   });
 }

MLabClient.authenticateProfessor = (user, password, cb) => {
    MongoClient.connect(uri, function(err, db) {
        if (err) throw err;
        db.collection('professors').findOne({user: user, password: password}, (err, result) => {
            if (err) throw err;
            cb(result);
        });
    });
}

MLabClient.authenticateProfessor("carl", "wheezer", (result) => {
    console.log(result);
});

