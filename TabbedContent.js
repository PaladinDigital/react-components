import React from 'react'

export class TabbedContent extends React.Component {
  constructor (props) {
    super(props);
    this.state = {
      activeTab: this.setDefaultTab()
    }
    this.changeTab = this.changeTab.bind(this);
  }

  setDefaultTab () {
    return Object.keys(this.props.content).slice(0, 1)[0];
  }

  changeTab (e) {
    let key = e.target.attributes["data-tab"].value;
    this.setState({activeTab: key});
  }

  renderTabs () {
    let content = this.props.content;
    return Object.keys(content).map(key => {
      let tab = content[key];
      if (tab.title === this.state.activeTab.title) {
        return <li key={key} className="is-active">{content[key].title}</li>
      } else {
        return <li key={key}><a data-tab={key} onClick={this.changeTab}>{content[key].title}</a></li>      }
    })
  }

  renderActiveTabContent () {
    let tabKey = this.state.activeTab;
    return this.props.content[tabKey].content;
  }

  render () {
    if (Object.keys(this.props.content).length > 0) {
      let tabs = <div className="tabs"><ul>{this.renderTabs()}</ul></div>;
      let content = this.renderActiveTabContent();

      return (
        <>
          {tabs}
          {content}
        </>
      )
    }
    return '';
  }
}