import { DataTable } from './DataTable'
import React from 'react'

export class PaginatedDataTable extends DataTable {
  constructor (props) {
    super(props);
    this.state = {page: 1};
  }

  static defaultProps = {
      prevPageLabel: 'Prev Page',
      nextPageLabel: 'Next Page',
  }

  getPerPage () {
    if (typeof this.props.perPage === "undefined") {
      return 25;
    }
    return this.props.perPage;
  }

  getStartIndex(perPage = this.getPerPage()) {
    return (this.state.page - 1) * perPage;
  }

  getEndIndex(startIndex = false, perPage = this.getPerPage()) {
    if (!startIndex) {
      startIndex = this.getStartIndex(perPage);
    }
    return startIndex + perPage;
  }

  getItems () {
    let items = this.props.items;
    let paginateAmount = this.getPerPage();

    if (items.length <= paginateAmount) {
      return items;
    }

    let perPage = this.getPerPage();
    let startIndex = this.getStartIndex(perPage);
    let endIndex = this.getEndIndex(startIndex, perPage);

    return items.slice(startIndex, endIndex);
  }

  renderNextButton () {
    let hasNext = this.getEndIndex() <= this.props.items.length;
    if (hasNext) {
      return <button
        className="btn button is-pulled-right"
        onClick={this.nextPage.bind(this)}
      >{this.props.nextPageLabel}</button>;
    }
    return '';
  }

  renderPrevButton () {
    if (this.state.page > 1) {
      return <button
        className="btn button"
        onClick={this.prevPage.bind(this)}
      >{this.props.prevPageLabel}</button>;
    }
    return '';
  }

  renderControls () {
    let colCount = this.getColumns().length;

    return (
      <>
        <tr><td colSpan={colCount}>
          {this.renderPrevButton()}
          {this.renderNextButton()}
        </td></tr>
      </>
    )
  }

  nextPage () {
    let nextPage = this.state.page + 1;
    this.setState({page: nextPage});
  }

  prevPage () {
    if (this.state.page > 1) {
      let prevPage = this.state.page - 1;
      this.setState({ page: prevPage });
    }
  }

  renderData () {
    let items = this.getItems();
    let columns = this.getColumns();
    if (!items || !columns) {
      return ''
    }


    return items.map(i => {
      let cssClass = '';
      if (typeof i.className !== "undefined") {
        cssClass = i.className;
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

  render () {
    let headings = this.renderColumnHeadings()
    let data = this.renderData()
    let tClass = this.tableClasses()

    return (
      <table className={tClass}>
        <thead>{headings}</thead>
        <tfoot>{this.renderControls()}</tfoot>
        <tbody>{data}</tbody>
      </table>
    )
  }
}