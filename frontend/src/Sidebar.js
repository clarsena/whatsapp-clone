import React from 'react';
import './Sidebar.css';
import ChatIcon from '@material-ui/icons/Chat';
import MoreVertIcon from '@material-ui/icons/MoreVert';
import DonutLargeIcon from '@material-ui/icons/DonutLarge';
import SearchOutlined from '@material-ui/icons/SearchOutlined';
import { Avatar, IconButton } from '@material-ui/core';
import SidebarChat from './SidebarChat';

const Sidebar = () => {
	return (
		<div className='sidebar'>
			<div className='sidebar__header'>
				<Avatar src='https://avatars2.githubusercontent.com/u/38796016?s=400&v=4' />
				<div className='sidebar__headerRight'>
					<IconButton>
						<DonutLargeIcon />
					</IconButton>
					<IconButton>
						<ChatIcon />
					</IconButton>
					<IconButton>
						<MoreVertIcon />
					</IconButton>
				</div>
			</div>

			<div className='sidebar__search'>
				<div className='sidebar__searchContainer'>
					<SearchOutlined />
					<input placeholder='Search or start new chat' type='text' />
				</div>
			</div>

			<div className='sidebar__chats'>
				<SidebarChat />
				<SidebarChat />
				<SidebarChat />
			</div>
		</div>
	);
};

export default Sidebar;
