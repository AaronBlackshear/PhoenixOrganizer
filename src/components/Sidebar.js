import React, { Component } from 'react'
import { Layout, Menu, Icon } from 'antd'
import Link from 'next/link';

const { Sider } = Layout

class Sidebar extends Component {
  state = {
    collapsed: true,
    view: '/',
  }

  onCollapse = (collapsed) => {
    this.setState({ collapsed })
  }
  
  render () {
    const { view, collapsed } = this.state;

    return (
      <Sider
        style={{ backgroundColor: '#fff' }}
        collapsible
        collapsed={collapsed}
        onCollapse={this.onCollapse}
      >
        <Menu
          mode="inline"
          defaultSelectedKeys={[`${window.location.pathname}`]}
          style={{ height: '100%', borderRight: 0 }}
        >
          <Menu.Item key={'/'}>
            <Link href="/">
              <a>
                <Icon style={{ fontSize: '22px' }} type="calendar" theme="outlined" />
                <span>Calendar</span>
              </a>
            </Link>
          </Menu.Item>
          <Menu.Item key='/notepad'>
            <Link href="/notepad">
              <a>
                <Icon style={{ fontSize: '22px' }} type="book" theme="outlined" />
                <span>Notepad</span>
              </a>
            </Link>
          </Menu.Item>
          <Menu.Item key='/chat-room'>
            <Link href="/chat-room">
              <a>
                <Icon style={{ fontSize: '22px' }} type="wechat" theme="outlined" />
                <span>Chat Room</span>
              </a>
            </Link>
          </Menu.Item>
          <Menu.Item key='/this-week'>
            <Link href="/this-week">
              <a>
                <Icon style={{ fontSize: '22px' }} type="schedule" theme="outlined" />
                <span>This Week</span>
              </a>
            </Link>
          </Menu.Item>
          <Menu.SubMenu title={<span><Icon style={{ fontSize: '22px' }} type='laptop' /><span>Blog</span></span>}>
            <Menu.Item key='/articles'>
              <Link href="/blog/articles">
                <a>Articles</a>
              </Link>
            </Menu.Item>
            <Menu.Item key='/videos'>
              <Link href="/blog/videos">
                <a>Videos</a>
              </Link>
            </Menu.Item>
            <Menu.Item key='/inspiration'>
              <Link href="/blog/inspiration">
                <a>Inspiration</a>
              </Link>
            </Menu.Item>
            <Menu.Item key='/diy'>
              <Link href="/blog/diy">
                <a>DIY's</a>
              </Link>
            </Menu.Item>
          </Menu.SubMenu>
          <Menu.Item key='/my-profile'>
            <Link href="/my-profile">
              <a>
                <Icon style={{ fontSize: '22px' }} type="user" theme="outlined" />
                <span>My Profile</span>
              </a>
            </Link>
          </Menu.Item>
        </Menu>
      </Sider>
    )
  }
}

export default Sidebar
