import React from 'react'
import { Link } from 'react-router-dom'
import './BookItem.scss'

interface IProps {
  categories: string[]
  title: string
  image: string
  author: string[]
  desc: string
  id: string
}

export const BookItem: React.FC<IProps> = (props) => {
  const { categories, title, image, author, desc, id } = props

  return (
    <Link
      to={`/detailsBook/${id}`}
      state={{ categories, title, image, author, desc }}
      className="item"
    >
      {image ? <img src={image} alt="Image" /> : null}
      <div className="item__inner">
        <p className="item__categories"> {categories[0]} </p>
        <p className="item__title"> {title} </p>
        <p className="item__author">
          {Array.isArray(author) ? author.join(', ') : author}
        </p>
      </div>
    </Link>
  )
}
