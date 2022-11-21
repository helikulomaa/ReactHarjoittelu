import './App.css'
import React, {useState} from 'react'
import LoginService from './services/Aut'
import md5 from 'md5'

const Login = ({setIsPositive, setShowMessage, setMessage, setLoggedInUser}) => { 

    const [username, setUsername] = useState('')
    const [password, setPassword] = useState('')

// onSubmit tapahtumankäsittelijä funktio
const handleSubmit = (event) => {
    event.preventDefault()
    var userForAuth = {
      username: username,
      password: md5(password) // Salataan md5 kirjaston metodilla
  }

  LoginService.authenticate(userForAuth)
  .then(response => {
    if (response.status === 200) {

        localStorage.setItem("username", response.data.username)
        localStorage.setItem("accesslevelId", response.data.accesslevelId)
        localStorage.setItem("token", response.data.token)

        // Asetetaan app-komponentissa olevaan stateen
        setLoggedInUser(response.data.username)
        
     setMessage(`Loggen in as: ${response.data.username}`)
     setIsPositive(true)
     setShowMessage(true)
    
     setTimeout(() => {
      setShowMessage(false)
     }, 5000)
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

  //Kenttien tyhjennys

  const emptyFields = () => {
    setUsername("")
    setPassword("")
  }


return (
  <div id="loginWindow">
     <h2>Login</h2>

     <form onSubmit={handleSubmit}>
          <div>
              <input type="text" value={username} placeholder="Username"
                  onChange={({ target }) => setUsername(target.value)} />
          </div>
          <div>
              <input type="password" value={password} placeholder="Password"
                  onChange={({ target }) => setPassword(target.value)} />
          </div>
          
       <input type='submit' value='Login' />
       <input type='button' value='Empty' onClick={() => emptyFields()} />
     </form>

  </div>
)
}

export default Login