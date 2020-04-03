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

        let user = ({id, name, saying} = req.body)
        let userId = req.params.id

        db.collection('users').findOneAndUpdate(
            {id: userId},
            {
                $set:{
                    id: user.id,
                    name: user.name,
                    age: user.age
                }
            },
            (error, result) => {
                if (error) {
                    console.log(error)
                    return console.log('Unable to update user')
                }
                console.log('Updated user : ' + result)

                context.res = {
                    // status: 200,
                    body: result
                }
                client.close();
                context.done();
            })

    })
}
