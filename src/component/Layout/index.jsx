import React, { useState } from 'react'
import { Image, Layout, Menu, Row } from 'antd'
import Bag from '../../resources/images/bag.svg'
import Pencil from '../../resources/images/pencil.svg'
import Chat from '../../resources/images/chat.png'
import LunaImg from '../../resources/images/luna.svg'
import SearchImg from '../../resources/images/search.svg'
import Flag from '../../resources/images/flag.svg'
import Email from '../../resources/images/mail.svg'
import Ring from '../../resources/images/ring.svg'
import Profile from '../../resources/images/profile.svg'
import Top from '../../resources/images/top.svg'
import MainHeader from './Header'
import { UserOutlined } from '@ant-design/icons'

const { Sider, Content, Footer } = Layout

const MainLayout = (props) => {
	const [collapsed, setCollapsed] = useState(false)
	const items = [
		{
			key: 'bag',
			icon: <UserOutlined />,
			label: 'Danh sách khách hàng',
		},
	]
	return (
		<Layout style={{ minHeight: '100vh' }}>
			<Sider
				width={220}
				collapsedWidth={56}
				collapsible
				collapsed={collapsed}
				onCollapse={(value) => setCollapsed(value)}
				theme='light'>
				<div className='layout-logo'>{collapsed ? 'TL' : 'tranlinhmobile'}</div>
				<Menu theme='light' defaultSelectedKeys={['1']} mode='inline' items={items} />
			</Sider>
			<Layout>
				<MainHeader collapsed={collapsed} setCollapsed={(val) => setCollapsed(val)} />
				<Content className='content'>{props.children}</Content>
				<Footer className='px-28'>
					<Row justify={'space-between'} align={'middle'}>
						<div className='footer'>© 2023. tranlinhmobile</div>
						<Image src={Top} className='cursor-pointer' preview={false} />
					</Row>
				</Footer>
			</Layout>
		</Layout>
	)
}

export default MainLayout
