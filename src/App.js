import './App.css'
import Laskuri from './laskuri'
import React, {useState, useEffect} from 'react'
import Posts from './posts'
import CustomerList from './CustomerList'
import UserList from './UserList'
import ProductList from './ProductList'
import Message from './Message'
import Login from './Login'
import Navbar from 'react-bootstrap/Navbar'
import Nav from 'react-bootstrap/Nav'
import 'bootstrap/dist/css/bootstrap.min.css'

import { BrowserRouter as Router, Switch, Route, Link } from 'react-router-dom'

const App = () => { // Toinen tapa on function App (), mutta tämä on tavallisempi tapa nykyään

  const [showMessage, setShowMessage] = useState('')
  const [message, setMessage] = useState('')
  const [isPositive, setIsPositive] = useState(false)
  const [loggedInUser, setLoggedInUser] = useState('')
  const [loggedInUserAdmin, setLoggedInUserAdmin] = useState('')

  useEffect(() => {
    let storedUser = localStorage.getItem("username")
    if (storedUser !== null && localStorage.getItem("accesslevelId") === 2) {
      setLoggedInUser(storedUser)
    }
    else if (storedUser !== null && localStorage.getItem("accesslevelId") === 1) {
      setLoggedInUserAdmin(storedUser)
    }
  }, [])

  const logout = () => {
    localStorage.clear()
    setLoggedInUser('')
  }

  return (
    <div className="App">

    {!loggedInUser && !loggedInUserAdmin && <Login setMessage={setMessage} setIsPositive={setIsPositive} setShowMessage={setShowMessage} setLoggedInUser={setLoggedInUser} setLoggedInUserAdmin={setLoggedInUserAdmin}/>  }

    { !loggedInUser && loggedInUserAdmin && 

      <Router>

    <Navbar bg="dark" variant="dark">
      <Nav className='mr-auto'>
        <Link to={'/Products'} className="nav-link">Products</Link>
        <Link to={'/Customers'} className="nav-link">Customers</Link>
        <Link to={'/Users'} className="nav-link">Users</Link>
        <Link to={'/Laskuri'} className="nav-link">Laskuri</Link>
        <Link to={'/Posts'} className="nav-link">Typicode posts</Link>
        <button onClick={() => logout()}>Logout</button>
        
        </Nav>

    </Navbar>

      <h1>Northwind Traders</h1>

      {showMessage && <Message message={message} isPositive={isPositive} /> }

      <Switch>
      <Route path="/Products">
        <ProductList setIsPositive={setIsPositive} setMessage={setMessage} setShowMessage={setShowMessage}/>
        </Route>
        <Route path="/Customers">
        <CustomerList setIsPositive={setIsPositive} setMessage={setMessage} setShowMessage={setShowMessage}/>
        </Route>
        <Route path="/Users">
        <UserList setIsPositive={setIsPositive} setMessage={setMessage} setShowMessage={setShowMessage}/>
        </Route>
        <Route path="/Laskuri"><Laskuri/></Route>
        <Route path="/Posts"><Posts/></Route>
      </Switch>

      </Router>
    }

{ loggedInUser && 

<Router>

<Navbar bg="dark" variant="dark">
<Nav className='mr-auto'>
  <Link to={'/Products'} className="nav-link">Products</Link>
  <Link to={'/Customers'} className="nav-link">Customers</Link>
  <Link to={'/Laskuri'} className="nav-link">Laskuri</Link>
  <Link to={'/Posts'} className="nav-link">Typicode posts</Link>
  <button onClick={() => logout()}>Logout</button>
  
  </Nav>

</Navbar>

<h1>Northwind Traders</h1>

{showMessage && <Message message={message} isPositive={isPositive} /> }

<Switch>
<Route path="/Products">
  <ProductList setIsPositive={setIsPositive} setMessage={setMessage} setShowMessage={setShowMessage}/>
  </Route>
  <Route path="/Customers">
  <CustomerList setIsPositive={setIsPositive} setMessage={setMessage} setShowMessage={setShowMessage}/>
  </Route>
  <Route path="/Laskuri"><Laskuri/></Route>
  <Route path="/Posts"><Posts/></Route>
</Switch>

</Router>
}
    </div>
  )
}

export default App
