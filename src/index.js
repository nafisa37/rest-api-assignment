const express = require('express');
const { v4: uuidv4 } = require('uuid');
const app = express();
const port = 3000;

// Middleware to parse JSON bodies
app.use(express.json());

// **************************************************************
// Put your implementation here
// If necessary to add imports, please do so in the section above

//Create a User
const users = [];
app.post('/users', (req, res) => {
    const {name, email} = req.body;

    if (!name || !email) {
        return res.status(400).json({error: 'Name or email is missing.'});
    }

    const newUser = {
        id: uuidv4(),
        name,
        email
    };

    users.push(newUser);
    res.status(201).json(newUser);
});

//Retrieve a User
app.get('/users/:id', (req, res) => {
    const {id} = req.params;
    const user = users.find(u => u.id === id);

    if (!user){
        return res.status(404).json({error: 'User ID does not exist.'});
    };

    res.status(200).json(user);
});

//Update a User

app.put('/users/:id', (req, res) => {
    const {id} = req.params
    const {name, email} = req.body;
    if (!name || !email){
        return res.status(400).json({error: 'Name or email is missing.'});
    }

    const userIndex = users.findIndex(u => u.id === id);

    if (userIndex === -1){
        return res.status(404).json({error: 'User ID does not exist.'});
    };

    users[userIndex] = {id, name, email};
    res.status(200).json(users[userIndex]);
});

//Delete a User
app.delete('/users/:id', (req, res) => {
    const {id} = req.params;
    const userIndex = users.findIndex(u => u.id === id);
    if (userIndex === -1){
        return res.status(404).json({error: 'User ID does not exist.'})
    }

    users.splice(userIndex, 1);
    res.sendStatus(204);
});
// Do not touch the code below this comment
// **************************************************************

// Start the server (only if not in test mode)
if (process.env.NODE_ENV !== 'test') {
    app.listen(port, () => {
        console.log(`Server running at http://localhost:${port}`);
    });
}

module.exports = app; // Export the app for testing