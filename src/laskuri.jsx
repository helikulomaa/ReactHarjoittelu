import './App.css'
import React, {useState} from 'react'

const Laskuri = (props) => { 

    // Komponentin tilan määrittely. Kun tilan arvo muuttuu, kompontentti uudelleen renderöidään.
    const [luku, setluku] = useState(0) 

  return ( // Komponentti voi palauttaa vain yhden elementin
    <> 
        <h3>{luku}</h3>
        <button onClick={() => setluku(luku + 1)}>+</button>
        <button onClick={() => setluku(luku - 1)}>-</button>
        <button onClick={() => setluku(0)}>Nollaa</button>
        <button onClick={props.huomio}>Huomio!</button>
    </>
  )
}

export default Laskuri