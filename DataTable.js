import React from 'react'

export class DataTable extends React.Component {

  static defaultProps = {
    primaryKey: 'id'
  }

  getColumns () {
    let cols = this.props.columns
    if (!cols) {
      // If we dont have explicit columns, try to be implicit.
      cols = this.getImplicitColumns()
    }
    return cols
  }

  getImplicitColumns () {
    let columns = {}
    this.props.items.map(i => {
      Object.keys(i).map(col => {
        if (typeof columns[col] === 'undefined') {
          columns[col] = {
            field: col,
            name: col
          }
        }
      })
    })

    let columnArray = []
    Object.keys(columns).map(col => {
      columnArray.push(columns[col])
    })

    return columnArray
  }

  renderColumnHeadings () {
    let cols = this.getColumns()

    return <tr>{cols.map(c => {
      return <th key={c.field}>{c.name}</th>
    })}</tr>
  }

  getFieldKey (item, column) {
    return item.name + column.field
  }

  renderField (item, column) {
    let key = this.getFieldKey(item, column)
    if (typeof column.field === 'function') {
      return <td key={key}>{column.field(item)}</td>
    }

    return <td key={key}>{item[column.field]}</td>
  }

  renderData () {
    let items = this.props.items
    let columns = this.getColumns();
    if (!items || !columns) {
      return ''
    }


    return items.map(i => {
      let cssClass = ''
      if (typeof i.className !== 'undefined') {
        cssClass = i.className
      }

      return <tr key={i.name} className={cssClass}>
        {
          columns.map(c => {
            return this.renderField(i, c)
          })
        }
      </tr>
    })
  }

  tableClasses () {
    let classNames = ['table']
    if (typeof this.props.classes !== 'undefined') {
      this.props.classes.map(c => {
        classNames.push(c)
      })
    }
    return classNames.join(' ')
  }

  render () {
    let headings = this.renderColumnHeadings()
    let data = this.renderData()
    let tClass = this.tableClasses()

    return (
      <table className={tClass}>
        <thead>{headings}</thead>
        <tbody>{data}</tbody>
      </table>
    )
  }
}
