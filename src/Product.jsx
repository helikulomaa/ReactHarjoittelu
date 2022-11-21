import './App.css'
import React, {useState} from 'react'
import ProductService from './services/Products'

const Product = ({product, editProduct, setIsPositive, setShowMessage, setMessage, reload, reloadNow}) => { 

    // Komponentin tilan määrittely. 
    const [showDetails, setShowDetails] =  useState(false)

    const deleteProduct = (product) => {
        // kysytään vahvistus poistoon:
    let vastaus = window.confirm(`Remove Product ${product.productName}`)
    if (vastaus === true) {
        ProductService.remove(product.productId)
        .then(res => {
            if (res.status === 200) {
            setMessage(`Successfully removed product ${product.productName}`)
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
        setMessage(`Poisto peruttu onnistuneesti.`)
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

  return ( 
    <div> 
        <h4 onClick={() => setShowDetails(!showDetails)}>
            {product.productName}</h4>
        {showDetails && <div className='details'>
        <h4>{product.productname}</h4>
        <button onClick={() => deleteProduct(product)}>Delete</button>
        <button onClick={() => editProduct(product)}>Edit</button>
        <table>
            <thead>
                <tr>
                    <th>Prodcut name</th>
                    <th>Unit price</th>
                    <th>Units in stock</th>
                    <th>Units on order</th>
                </tr>
            </thead>
            <tbody>
                <tr>
                    <td>{product.productName}</td>
                    <td>{product.unitPrice}</td>
                    <td>{product.unitsInStock}</td>
                    <td>{product.unitsOnOrder}</td>
                </tr>
            </tbody>
        </table></div>}
    </div>
  )
}

export default Product