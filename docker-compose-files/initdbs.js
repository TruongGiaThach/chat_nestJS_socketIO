db = db.getSiblingDB('admin');
// move to the admin db - always created in Mongo
db.auth("user", "123456Me");
// log as root admin if you decided to authenticate in your docker-compose file...
db = db.getSiblingDB('chat');
// create and move to your new database
db.createUser({
    'user': "dbUser",
    'pwd': "dbPwdnnnnnnn",
    'roles': [{
        'role': 'dbOwner',
        'db': 'chat'
    }]
});
// user created
db.createCollection('collection_test');
// create collection
db.collection_test.insert({ myfield: 'hello3', thatfield: 'testing' })
// add document