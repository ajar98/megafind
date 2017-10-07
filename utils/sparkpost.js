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
        options: {
        sandbox: true
        },
        content: {

        from: this.address.toString(),
        subject: 'Lecture for ' + course,
        html:'<html><body><p>Hello Class,</p><p>Here is the link to today\'s lecture <a href = "">'+ link+'</a> </p></body></html>'
           },
        recipients: [
        {address: 'kapurkartik1@gmail.com'}
        ]
    })
    .then(data => {
        console.log('Woohoo! You just sent your first mailing!');
        console.log(data);
    })
    .catch(err => {
        console.log('Whoops! Something went wrong');
        console.log(err);
        });
    }
  }