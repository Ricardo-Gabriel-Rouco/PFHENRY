import React from 'react'
import style from './DiscountLabel.module.css'

export const DiscountLabel = ({discount}) => {
  return (
    <div className={style.pointer}>
      <h5 className={style.discount}>{discount}</h5>
    </div>
  )
}
