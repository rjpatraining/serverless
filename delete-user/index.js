const mongodb = require('mongodb')
const auth = require('../shared/index')

module.exports = function (context, req) {
    context.log('JavaScript HTTP trigger function processed a request.');

    const MongoClient = mongodb.MongoClient

    MongoClient.connect(process.env.CosmosDBURL, { auth: auth }, (error, client) => {

        if (error) {
            return console.log('Unable to connect to database!')
        }

        console.log('Connected correctly')

        const db = client.db(process.env.CosmosDB)

        let userId = req.params.id

        db.collection('users').findOneAndDelete(
            {id: userId},
            (error, result) => {
                if (error) {
                    console.log(error)
                    return console.log('Unable to delete user')
                }
                console.log('Deleted user : ' + result)

                context.res = {
                    // status: 200,
                    body: result
                }
                client.close();
                context.done();
            })

    })
}
