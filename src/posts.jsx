import './App.css'
import React, {useState, useEffect} from 'react'

const Posts = () => { 

    // Komponentin tilan määrittely. 
    const [posts, setPosts] = useState([]) 

    useEffect (() => {
      fetch("https://jsonplaceholder.typicode.com/posts")
      .then(res => res.json()) // muuttaa json-datan javascriptiksi
      .then(oliot => setPosts(oliot))
    }, []
    )

  return ( 
    <> 
        <h2>Posts from typicode</h2>

        {
          
          posts && posts.map(p => 
            <div className='postsContainer'>
            <div className='posts' key={p.id}>
            <h4>{p.title}</h4>
            <p>{p.body}</p>
            </div>
            </div>)
        }

    </>
  )
}

export default Posts