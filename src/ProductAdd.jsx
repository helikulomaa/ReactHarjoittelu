import './App.css'
import React, {useState} from 'react'
import ProductService from './services/Products'

const ProductAdd = ({setLisäystila, setIsPositive, setShowMessage, setMessage}) => { 

    // Komponentin tilan määritys

    const [newProductName, setNewProductName] = useState('')
    const [newSupplierId, setNewSupplierId] = useState('')
    const [newCategoryId, setNewCategoryId] = useState('')
    const [newQuantityPerUnit, setNewQuantityPerUnit] = useState('')
    const [newUnitPrice, setNewUnitPrice] = useState('')
    const [newUnitsInStock, setNewUnitsInStock] = useState('')
    const [newUnitsOnOrder, setNewUnitsOnOrder] = useState('')
    const [newReorderLevel, setNewReorderLevel] = useState('')
    const [newDiscontinued, setNewDiscontinued] = useState(false)
    const [newImageLink, setNewImageLink] = useState('')

const handleSubmit = (event) => {
    event.preventDefault()
    var newProduct = {
        productName: newProductName,
        supplierId: parseInt(newSupplierId),
        categoryId: parseInt(newCategoryId),
        quantityPerUnit: newQuantityPerUnit,
        unitPrice: parseInt(newUnitPrice),
        unitsInStock: parseInt(newUnitsInStock),
        unitsOnOrder: parseInt(newUnitsOnOrder),
        reorderLevel: parseInt(newReorderLevel),
        discontinued: newDiscontinued,
        imageLink: newImageLink
    }

    ProductService.create(newProduct)
    .then(response => {
      if (response.status === 200) {
        setMessage("Added new Product: " + newProduct.productName)
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
        <h2>Product Add</h2>

        <form onSubmit={handleSubmit}>
            <div>
                <label>Product name</label>
            </div>
            <div>
                <input type="text" value={newProductName} placeholder="Product name" 
                    onChange={({ target }) => setNewProductName(target.value)} required />
            </div>
            <div>
                <label>Quantity</label>
            </div>
            <div>
                <input type="number" value={newQuantityPerUnit} placeholder="Quatity"
                    onChange={({ target }) => setNewQuantityPerUnit(target.value)} />
            </div>
            <div>
                <label>Unit price</label>
            </div>
            <div>
                <input type="number" value={newUnitPrice} placeholder="Unit Price"
                    onChange={({ target }) => setNewUnitPrice(target.value)} />
            </div>
            <div>
                <label>Units in stock</label>
            </div>
            <div>
                <input type="number" value={newUnitsInStock} placeholder="Units in Stock"
                    onChange={({ target }) => setNewUnitsInStock(target.value)} />
            </div>
            <div>
                <label>Units on order</label>
            </div>
            <div>
                <input type="number" value={newUnitsOnOrder} placeholder="Units on order"
                    onChange={({ target }) => setNewUnitsOnOrder(target.value)} />
            </div>
            <label>Select if discontinued</label>
            <div>
                <input type="radio" value={newDiscontinued}
                    onChange={({ target }) => setNewDiscontinued(target.value)} />
            </div>
            <div>
                <label>Image link</label>
            </div>
            <div>
                <input type="text" value={newImageLink} placeholder="Image link"
                    onChange={({ target }) => setNewImageLink(target.value)} />
            </div>

            <input type="submit" value="Save"/>
            <input type="button" value="Back" onClick={() => setLisäystila(false)}/>

        </form>

    </div>
  )
}

export default ProductAdd