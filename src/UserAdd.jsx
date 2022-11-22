import './App.css'
import React, {useState} from 'react'
import UserService from './services/User' // viittaus tiedostoon, jossa hakutehdään
import md5 from 'md5'
// import Viesti from './viesti'

const UserAdd = ({setLisäystila, setIsPositive, setShowMessage, setMessage}) => { 

    // Komponentin tilan määritys

    const [newFirstname, setNewFirstname] = useState('')
    const [newLastname, setNewLastname] = useState('')
    const [newEmail, setNewEmail] = useState('')
    const [newAccesslevelId, setNewAccesslevelId] = useState(2)
    const [newUsername, setNewUsername] = useState('')
    const [newPassword, setNewPassword] = useState('')
    // const [newPasswordAgain, setNewPasswordAgain] = useState('')
    // const [passwordCorrect, setPasswordCorrect] = useState('')
    // const [syotettyPassword, setSyotettyPassword] = useState('')

// onSubmit tapahtumankäsittelijä funktio
const handleSubmit = (event) => {
    event.preventDefault()

    var newUser = {
      firstname: newFirstname,
      lastname: newLastname,
      email: newEmail,
      accesslevelId: parseInt(newAccesslevelId),
      username: newUsername,
      password: md5(newPassword) // Salataan md5 kirjaston metodilla
      // syotettyPassword: newPassword,
      // passwordAgain: newPasswordAgain
  }
  
  // if (newPassword === newPasswordAgain) {
  //   setPasswordCorrect(true)
  // } else {
  //   setPasswordCorrect(false)
  // }

  UserService.create(newUser)
  .then(response => {
    if (response.status === 200) {
     setMessage(`Added new User: ${newUser.firstname} ${newUser.lastname}`)
     setIsPositive(true)
     setShowMessage(true)
    
     setTimeout(() => {
      setShowMessage(false)
     }, 5000)

     setLisäystila(false)
  }

    })
    .catch(error => {
      setMessage(error)
      setIsPositive(false)
      setShowMessage(true)

      setTimeout(() => {
        setShowMessage(false)
       }, 6000)
    })
  }


return (
  <div id="addNew">
     <h2>User add</h2>

     <form onSubmit={handleSubmit}>
          <div>
              <input type="text" value={newFirstname} placeholder="First name"
                  onChange={({ target }) => setNewFirstname(target.value)} required />
          </div>
          <div>
              <input type="text" value={newLastname} placeholder="Last name"
                  onChange={({ target }) => setNewLastname(target.value)} required />
          </div>
          <div>
              <input type="email" value={newEmail} placeholder="Email"
                  onChange={({ target }) => setNewEmail(target.value)} />
          </div>
          <label>Access level id (1 = admin, 2 = basic user)</label>
          <div>
              <input type="number" value={newAccesslevelId} placeholder="Access level"
                  onChange={({ target }) => setNewAccesslevelId(target.value)} />
          </div>
          <div>
              <input type="text" value={newUsername} placeholder="Username"
                  onChange={({ target }) => setNewUsername(target.value)} />
          </div>
          {/* {!passwordCorrect && <Viesti teksti="Insert same password to both fields"/>} */}
          <div>
              <input type="password" value={newPassword} placeholder="Password"
                  onChange={({ target }) => setNewPassword(target.value)} />
          </div>
          {/* <div>
              <input type="password" value={newPasswordAgain} placeholder="Password again"
                  onChange={({ target }) => setNewPasswordAgain(target.value)} />
          </div>
          
          {passwordCorrect && <Viesti teksti="password ok"/>} */}
          
       <input type='submit' value='save' />
       <input type='button' value='back' onClick={() => setLisäystila(false)} />
     </form>

  </div>
)
}

export default UserAdd