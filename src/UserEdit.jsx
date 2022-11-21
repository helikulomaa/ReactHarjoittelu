import './App.css'
import React, {useState} from 'react'
import UserService from './services/User'

const UserEdit = ({setMuokkaustila, setIsPositive, setMessage, setShowMessage, muokattavaUser}) => {

// Komponentin tilan määritys

    const [newUserId, setNewUserId] = useState(muokattavaUser.userId)
    const [newFirstname, setNewFirstname] = useState(muokattavaUser.firstname)
    const [newLastname, setNewLastname] = useState(muokattavaUser.lastname)
    const [newEmail, setNewEmail] = useState(muokattavaUser.email)
    const [newAccesslevelId, setNewAccesslevelId] = useState(muokattavaUser.accesslevelId)
    const [newUsername, setNewUsername] = useState(muokattavaUser.username)



// onSubmit tapahtumankäsittelijä funktio
const handleSubmit = (event) => {
      event.preventDefault()
      var newUser = {
        userId: newUserId,
        firstname: newFirstname,
        lastname: newLastname,
        email: newEmail,
        accesslevelId: newAccesslevelId,
        username: newUsername,
        password: "salasana"
    }
    
    UserService.update(newUser)
    .then(response => {
      if (response.status === 200) {
       setMessage("Edited User: " + newUser.firstname + " " + newUser.lastname)
       setIsPositive(true)
       setShowMessage(true)
      
       setTimeout(() => {
        setShowMessage(false)
       }, 5000)

       setMuokkaustila(false)
    }

      })
      .catch(error => {
        setMessage(error.message)
        setIsPositive(false)
        setShowMessage(true)

        setTimeout(() => {
          setShowMessage(false)
         }, 6000)
      })
    }


  return (
    <div id="edit">
       <h2> Edit</h2>

       <form onSubmit={handleSubmit}>
            <div>
                <label>First name</label>
            </div>
                <div>
            <input type="text" value={newFirstname} placeholder="First name"
                    onChange={({ target }) => setNewFirstname(target.value)} required />
            </div>
            <div>
                <label>Last Name</label>
            </div>
            <div>
                <input type="text" value={newLastname} placeholder="Last name"
                    onChange={({ target }) => setNewLastname(target.value)} />
            </div>
            <div>
                <label>Email</label>
            </div>
            <div>
                <input type="text" value={newEmail} placeholder="Email"
                    onChange={({ target }) => setNewEmail(target.value)} />
            </div>
            <div>
                <label>Accesslevel Id</label>
            </div>
            <div>
                <input type="number" value={newAccesslevelId} placeholder="Accesslevel Id"
                    onChange={({ target }) => setNewAccesslevelId(target.value)} />
            </div>
            <div>
                <label>Username</label>
            </div>
            <div>
                <input type="text" value={newUsername} placeholder="Username"
                    onChange={({ target }) => setNewUsername(target.value)} />
            </div>
         
         <input type='submit' value='save' />
         <input type='button' value='back' onClick={() => setMuokkaustila(false)} />
       </form>

    </div>
  )
}

export default UserEdit