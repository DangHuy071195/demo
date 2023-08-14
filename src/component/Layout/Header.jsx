import { Button, Image } from 'antd'
import React, { useState } from 'react'
import Bag from '../../resources/images/bag.svg'
import Pencil from '../../resources/images/pencil.svg'
import Chat from '../../resources/images/chat.png'
import LunaImg from '../../resources/images/luna.svg'
import SearchImg from '../../resources/images/search.svg'
import Flag from '../../resources/images/flag.svg'
import Email from '../../resources/images/mail.svg'
import Ring from '../../resources/images/ring.svg'
import Profile from '../../resources/images/profile.svg'
import { Link } from 'react-router-dom'
import { Layout } from 'antd'
import { MenuFoldOutlined, MenuUnfoldOutlined } from '@ant-design/icons'
const { Header, Content, Footer, Sider } = Layout

const MainHeader = ({ collapsed, setCollapsed }) => {
	return (
		<Header className='navigation'>
			<Button
				type='text'
				icon={collapsed ? <MenuUnfoldOutlined /> : <MenuFoldOutlined />}
				onClick={() => setCollapsed(!collapsed)}
				style={{
					fontSize: '16px',
					width: 64,
					height: 64,
				}}
			/>
			<ul className='navigation-list'>
				<div className='navigation-item'>
					<li>
						<Link>
							<Image preview={false} src={Bag} />
						</Link>
					</li>
					<li>
						<Link>
							<Image preview={false} src={Pencil} />
						</Link>
					</li>
					<li>
						<Link>
							<Image preview={false} src={Chat} />
						</Link>
					</li>
				</div>
				<div className='navigation-item'>
					<li>
						<Link>
							<Image preview={false} src={LunaImg} />
						</Link>
					</li>
					<li>
						<Link>
							<Image preview={false} src={Flag} />
						</Link>
					</li>
					<li>
						<Link>
							<Image preview={false} src={Email} />
						</Link>
					</li>
					<li>
						<Link>
							<Image preview={false} src={Ring} />
						</Link>
					</li>
					<li>
						<Link>
							<Image preview={false} src={Profile} />
						</Link>
					</li>
				</div>
			</ul>
		</Header>
	)
}

export default MainHeader
