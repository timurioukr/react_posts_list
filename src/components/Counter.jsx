import React, { useState } from "react";

const Counter = () => {
    const [count, setCount] = useState(0)

    function increment(params) {
        setCount(count +1)
      }
    
      function decrement(params) {
        setCount(count -1)
      }

    return (
        <div>
            <h2>{count}</h2>
            <button onClick={increment} >Increm</button>
            <button onClick={decrement}>Decrem</button>
        </div>
    )
}

export default Counter