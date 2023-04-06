import React, { useState } from 'react'


function Form() {

  return (
    <div>
      <form action="">
        <input type="text" placeholder='Titulo' />
        <input type="text" placeholder='Stock' />
        <input type="text" placeholder='Price' />
        <button type='submit'></button>
      </form>
    </div>
  )
}

export default Form