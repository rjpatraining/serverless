// module.exports = async function (context, req) {
//     context.log('JavaScript HTTP trigger function processed a request.');

//     if (req.query.name || (req.body && req.body.name)) {
//         context.res = {
//             // status: 200, /* Defaults to 200 */
//             body: ['Sarah', 'John']
//         };
//     }
//     else {
//         context.res = {
//             status: 400,
//             body: "Please pass a name on the query string or in the request body"
//         };
//     }
// };
const mongodb = require('mongodb')
const auth = require('../shared/index')

module.exports =  function (context, req) {
    context.log('JavaScript HTTP trigger function processed a request.');
    
    const MongoClient = mongodb.MongoClient

    MongoClient.connect(process.env.CosmosDBURL, {auth: auth}, (error, client) => {

        if(error) {
            return console.log('Unable to connect to database!')
        }   

        console.log('Connected correctly')

        const db = client.db(process.env.CosmosDB)
        // db.collection('users').insertOne({
        //     name: 'Raj',
        //     age: 43
        // },(error, result) => {
        //     if(error) {
        //         return console.log('Unable to insert user')
        //     }
        //     console.log('Inserted Data' + result.ops)    
        //     context.res = {
        //         // status: 200,
        //         body: result
        //     }
        //     client.close();
        //     context.done();
        // })

       db.collection('users').find().toArray((error, result) => {
            if(error) {
                return console.log('Unable to retreive user')
            }
            console.log('Retreived Data : ' + result)    

            context.res = {
                // status: 200,
                body: result
            }
            client.close();
            context.done();
        })

    })
}
