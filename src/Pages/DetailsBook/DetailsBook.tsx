import { Link, useLocation } from 'react-router-dom'
import './DetailsBook.scss'
export const DetailsBook = () => {
  const {
    state: { categories = [], title = '', image = '', author = [], desc = '' },
  } = useLocation()

  return (
    <div className="detailsBook">
      <div className="detailsBook__wrapper">
        <div className="detailsBook__img">
          <img src={image} alt="Book" />
        </div>
        <div className="detailsBook__info">
          {categories  ?  <p className="detailsBook__info-category">
            {categories.map((item:any) => (
                <span key={item}> {item} </span>
            ))}
          </p> : null}
          <h3 className="detailsBook__info-title">{title}</h3>
          {author ?  <p className="detailsBook__info-author">
            {author.map((item:any, index:number) => (
                <span key={index}>
            {item}
                  {index < author.length - 1 && ', '}
          </span>
            ))}
          </p> : null}
          <p className="detailsBook__info-desc">{desc}</p>
        </div>
      </div>
      <div className="detailsBook__back">
        <Link to="/">
          <button className="detailsBook__back-btn">Back</button>
        </Link>
      </div>
    </div>
  )
}
