import React from 'react'
import './Select.scss'

interface IProps {
  data: { name: string; value: string; id: number }[]
  title: string
  idHtml: string
  onChangeValue: (value: string) => void
}

export const Select: React.FC<IProps> = ({ data, idHtml, onChangeValue }) => {
  return (
    <div className="multiplySort">
      <select
        name="categories"
        id={idHtml}
        onChange={(e) => onChangeValue(e.target.value)}
      >
        {data.map((item) => (
          <option key={item.id} value={item.value}>
            {item.name}
          </option>
        ))}
      </select>
    </div>
  )
}
