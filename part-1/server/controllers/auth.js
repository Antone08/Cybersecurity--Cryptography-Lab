const bcrypt = require('bcryptjs')
const users = []

module.exports = {
 
login: (req, res) => {
  console.log('Logging In User')
  console.log(req.body)
  const { username, password } = req.body
  for (let i = 0; i < users.length; i++) {
    if (users[i].username === username) {

    const existing = bcrypt.compareSync(password, users[i].passHash)

        if(existing) {
            let usersToReturn = {...users[i]}
            delete usersToReturn.passHash
            res.status(200).send(usersToReturn)
            console.log('same password')
            console.log(usersToReturn)
            return
        } 
        } else {
          console.log("username does not exist")
        }
  }
  res.status(400).send("User not found.")
},




    register: (req, res) => {
      const { username, email, firstName, lastName, password } = req.body
      const salt = bcrypt.genSaltSync(5)
      const passHash = bcrypt.hashSync(password, salt)

      const newAccount = {
        username,
        email,
        firstName,
        lastName,
        passHash, 
      }
        console.log('Registering User')
        console.log(req.body)
        users.push(newAccount)
        res.status(200).send(req.body)
    }
}



