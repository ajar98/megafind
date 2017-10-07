const SparkPost = require('sparkpost');
const client = new SparkPost('d861ca2f30b721724647b2490efc77af7baa4506');
const address= null;
//email needs to be a domain, dns must be able to be accessed by user.
const course = null;

class sparkpost{
    constructor(email, subject){
        this.address = email;
        this.course = subject;
    }


    sendMail(link){

    client.transmissions.send({
        content: {

        from: this.address.toString(),
        subject: 'Lecture for ' + this.course,
        html:'<html><body><p>Hello Class,</p><p>Here is the link to today\'s lecture <a href = "">'+ link+'</a> </p></body></html>'
           },
        recipients: [
        {address: 'kapurkartik1@gmail.com'}
        ]
    })
    .then(data => {
        console.log('Your email has been sent');
        console.log(data);
    })
    .catch(err => {
        console.log('Something may be wrong, check your connection');
        console.log(err);
        });
    }
  }
var s = new sparkpost("megafind@mega-find.com", "english");
s.sendMail("10");