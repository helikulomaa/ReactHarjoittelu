import './App.css'
import Laskuri from './laskuri'
import Viesti from './viesti'
import React, {useState} from 'react'
import Posts from './posts'
import CustomerList from './CustomerList'
import Message from './Message'

const App = () => { // Toinen tapa on function App (), mutta tämä on tavallisempi tapa nykyään
  
  // App-komponentin tila:
  const [showLaskuri, setShowLaskuri] = useState(false)
  const [showPosts, setShowPosts] = useState(false)
  // statet messagen näyttämistä varten:
  const [showMessage, setShowMessage] = useState(false)
  const [message, setMessage] = useState('')
  const [isPositive, setIsPositive] = useState(false)

  const huomio = () => {
    alert("Huomio!")
  } 

  return (
    <div className="App">
      <h1>Hello from React!</h1>

      {showMessage && <Message message={message} isPositive={isPositive} /> }

      <CustomerList setIsPositive={setIsPositive} setMessage={setMessage} setShowMessage={setShowMessage}/>

{/* jos showlakuri on true, rivi näytetään */}
      {showLaskuri && <Laskuri huomio={huomio}/>} 
      {showLaskuri && <button onClick={() => setShowLaskuri(!showLaskuri)}>Piilota laskuri</button>}
      {!showLaskuri && <button onClick={() => setShowLaskuri(!showLaskuri)}>Näytä laskuri</button>} 
<br></br>
<br></br>
      {showPosts && <button onClick={() => setShowPosts(!showPosts)}>Piilota postaukset</button>}      
      {showPosts && <Posts />}
      {!showPosts && <button onClick={() => setShowPosts(!showPosts)}>Näytä postaukset</button>}

      
      
      <Viesti teksti="Tervehdys app-komponentista!"/>

    </div>
  )
}

export default App
