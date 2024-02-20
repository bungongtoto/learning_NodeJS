const usersDB = {
    users: require('../model/users.json'),
    setUsers: function (data) {this.users = data}
}

const fsPromises = require('fs').promises;
const path = require('path');
const bcrypt = require('bcrypt');

const handleNewUser = async (req, res) => {
    const {user, password} = req.body;
    if (!user || !password) return res.status(400).json({'message': 'Username and password are required.'});
    // check for duplicate usernames in the database.
    const duplicate = usersDB.users.find(person => person.username === user);
    if(duplicate) return res.sendStatus(409); // status code for conflict
    try {
        // encrypt the password
        const hashedPassword = await bcrypt.hash(password, 10);
        // store the new user
        const newUser = {"username": user, "password": hashedPassword };
        usersDB.setUsers([...usersDB.users, newUser]);
        await fsPromises.writeFile(
            path.join(__dirname, '..', 'model', 'users.json'),
            JSON.stringify(usersDB.users)
        );
        console.log(usersDB.users);
        res.status(201).json({'success': `New user ${user} created!`});
    } catch (error) {
        res.status(500).json({'message': error.message});
    }
}

module.exports = {handleNewUser};