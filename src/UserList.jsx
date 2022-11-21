import './App.css'
import React, {useState, useEffect} from 'react'
import UserService from './services/User'
import UserAdd from './UserAdd'
import UserEdit from './UserEdit'

const UserList = ({setIsPositive, setShowMessage, setMessage}) => {

// Komponentin tilan määritys
const [users, setUsers] = useState([])
const [lisäystila, setLisäystila] = useState(false)
const [muokkaustila, setMuokkaustila] = useState(false)
const [reload, reloadNow] = useState(false)
const [muokattavaUser, setMuokattavaUser] = useState(false)
const [search, setSearch] = useState("")


// Tietokantahaku aina komponentin latautuessa
useEffect(() => {
    
  const token = localStorage.getItem('token')
  UserService.setToken(token)

  UserService.getAll()
  .then(data => {
    setUsers(data)
})
},[lisäystila, reload, muokkaustila]
)

const deleteUser = (user) => {
  // kysytään vahvistus poistoon:
let vastaus = window.confirm(`Remove User ${user.firstname} ${user.lastame}`)
if (vastaus === true) {
  UserService.remove(user.userId)
  .then(res => {
      if (res.status === 200) {
      setMessage(`Successfully removed user ${user.firstname} ${user.lastname}`)
      setIsPositive(true)
      setShowMessage(true)
      window.scrollBy(0, -10000) // Scrollataan ylös jotta nähdään alert

      // Ilmoituksen piilotus
      setTimeout(() => {
      setShowMessage(false)},
      5000
      )
      reloadNow(!reload)
      }
      
      })
      
      .catch(error => {
          setMessage(error)
          setIsPositive(false)
          setShowMessage(true)
          window.scrollBy(0, -10000) // Scrollataan ylös jotta nähdään alert
  
          setTimeout(() => {
            setShowMessage(false)
           }, 6000)
        })

  } // Jos poisto halutaankin perua
  else {
  setMessage('Poisto peruttu onnistuneesti.')
      setIsPositive(true)
      setShowMessage(true)
      window.scrollBy(0, -10000) // Scrollataan ylös jotta nähdään alert :)

      // Ilmoituksen piilotus
      setTimeout(() => {
      setShowMessage(false)},
      5000
      )
  }
}

//Hakukentän onChange-tapahtumankäsittelijä
const handleSearchInputChange = (event) => {
  setSearch(event.target.value.toLowerCase())
}

const editUser = (user) => {
  setMuokattavaUser(user)
  setMuokkaustila(true)
}

  return (
    <>
        <h1><nobr>Users</nobr>
                {lisäystila && <UserAdd setLisäystila={setLisäystila} setIsPositive={setIsPositive} setMessage={setMessage} setShowMessage= {setShowMessage} />}
                {!lisäystila && <button className="nappi" onClick={() => setLisäystila(true)}>Add new</button>}</h1>
                {!lisäystila && !muokkaustila && <input placeholder='Search by last name' value={search} onChange={handleSearchInputChange}></input>}

                {muokkaustila && <UserEdit setMuokkaustila={setMuokkaustila} 
                setIsPositive={setIsPositive} setMessage={setMessage} setShowMessage={setShowMessage}
                muokattavaUser={muokattavaUser}
                />}

                {!lisäystila && !muokkaustila &&
                <table id='userTable'>
                  <thead>
                    <tr>
                    <th>First Name</th>
                    <th>Last Name</th>
                    <th>Email</th>
                    <th>Access level</th>
                    <th></th>
                    <th></th>
                    </tr>
                  </thead>
                  <tbody>

                {users && users.map(u => 
                  {
                    const lowerCaseName = u.lastname.toLowerCase()
                    if (lowerCaseName.indexOf(search) > -1) {
                        return(
                          <tr key={u.userId}>
                            <td>{u.firstname}</td>
                            <td>{u.lastname}</td>
                            <td>{u.email}</td>
                            <td>{u.accesslevelId}</td>
                            <td><button className='nappi' onClick={() => editUser(u)}>Edit</button></td>
                            <td><button className='nappi' onClick={() => deleteUser(u)}>Delete</button></td>
                          </tr>
                        )}
                    })
                }
                </tbody>
              </table>
           }   
           </>
      )
    }
    
    export default UserList