import './App.css'
import React, {useState} from 'react'
import CustomerService from './services/Customer' // viittaus tiedostoon, jossa hakutehdään

const CustomerAdd = ({setLisäystila, setIsPositive, setShowMessage, setMessage}) => { 

    // Komponentin tilan määritys

    const [newCustomerId, setNewCustomerId] = useState('')
    const [newCompanyName, setNewCompanyName] = useState('')
    const [newContactName, setNewContactName] = useState('')
    const [newContactTitle, setNewContactTitle] = useState('')
    const [newCountry, setNewCountry] = useState('')
    const [newAddress, setNewAddress] = useState('')
    const [newCity, setNewCity] = useState('')
    const [newPostalCode, setNewPostalCode] = useState('')
    const [newPhone, setNewPhone] = useState('')
    const [newFax, setNewFax] = useState('')

const handleSubmit = (event) => {
    event.preventDefault() // estää "oletuskäyttäytymisen" eli sen että sivu päivittyisi jokaisen muutoksen jälkeen.
    var newCustomer = {
        customerId: newCustomerId.toUpperCase(),
        companyName: newCompanyName,
        contactName: newContactName,
        contactTitle: newContactTitle,
        country: newCountry,
        address: newAddress,
        city: newCity,
        postalCode: newPostalCode,
        phone: newPhone,
        fax: newFax
    }

    // Varmuuden vuoksi tässä vaikka lisäys onnistuu ilmankin
    const token = localStorage.getItem('token')
    CustomerService.setToken(token)

    CustomerService.create(newCustomer)
    .then(response => {
      if (response.status === 200) {
        setMessage("Added new Customer: " + newCustomer.companyName)
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
    <div id='addNew'> 
        <h2>Customer Add</h2>

        <form onSubmit={handleSubmit}>
        <div>
                <input type="text" value={newCustomerId} placeholder="ID with 5 capital letters" maxLength="5" minLength="5"
                    onChange={({ target }) => setNewCustomerId(target.value)} required />
            </div>
            <div>
                <input type="text" value={newCompanyName} placeholder="Company name"
                    onChange={({ target }) => setNewCompanyName(target.value)} required />
            </div>
            <div>
                <input type="text" value={newContactName} placeholder="Contact name"
                    onChange={({ target }) => setNewContactName(target.value)} />
            </div>
            <div>
                <input type="text" value={newContactTitle} placeholder="Contact title"
                    onChange={({ target }) => setNewContactTitle(target.value)} />
            </div>
            <div>
                <input type="text" value={newCountry} placeholder="Country"
                    onChange={({ target }) => setNewCountry(target.value)} />
            </div>
            <div>
                <input type="text" value={newAddress} placeholder="Address"
                    onChange={({ target }) => setNewAddress(target.value)} />
            </div>
            <div>
                <input type="text" value={newCity} placeholder="City"
                    onChange={({ target }) => setNewCity(target.value)} />
            </div>
            <div>
                <input type="text" value={newPostalCode} placeholder="Postal code"
                    onChange={({ target }) => setNewPostalCode(target.value)} />
            </div>
            <div>
                <input type="text" value={newPhone} placeholder="Phone"
                    onChange={({ target }) => setNewPhone(target.value)} />
            </div>

            <input type="submit" value="Save"/>
            <input type="button" value="Back" onClick={() => setLisäystila(false)}/>

        </form>

    </div>
  )
}

export default CustomerAdd