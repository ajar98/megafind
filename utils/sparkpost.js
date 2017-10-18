const SparkPost = require('sparkpost');
const client = new SparkPost(process.env.SPARKPOST_API_KEY);
const address= 'megamind@mega-find.com'

//email needs to be a domain, dns must be able to be accessed by user.
const course = null;

class SparkPostClient {
    constructor(subject){
        this.address = address;
        this.course = subject;
    }


    sendMail(link){

    client.transmissions.send({
        content: {

        from: this.address.toString(),
        subject: 'Lecture for ' + this.course,
        html:`<html><body><p>Hello Class,</p><p>Here is the link to today\'s lecture <a href="${link}">${link}</a> </p></body></html>`
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

module.exports = SparkPostClient;
