import React from 'react';
import { Avatar, IconButton } from '@material-ui/core';
import SearchOutlined from '@material-ui/icons/SearchOutlined';
import AttachFile from '@material-ui/icons/AttachFile';
import MoreVert from '@material-ui/icons/MoreVert';
import InsertEmoticon from '@material-ui/icons/InsertEmoticon';
import MicIcon from '@material-ui/icons/Mic';
import './Chat.css';

const Chat = ({ messages }) => {
	return (
		<div className='chat'>
			<div className='chat__header'>
				<Avatar />

				<div className='chat__headerInfo'>
					<h3>Room name</h3>
					<p>Last seen at...</p>
				</div>

				<div className='chat__headerRight'>
					<IconButton>
						<SearchOutlined />
					</IconButton>
					<IconButton>
						<AttachFile />
					</IconButton>
					<IconButton>
						<MoreVert />
					</IconButton>
				</div>
			</div>

			<div className='chat__body'>
				{messages.map((message) => (
					<p
						className={`chat__message ${
							message.received && 'chat__receiver'
						}`}
						key={message.id}
					>
						<span className='chat__name'>{message.name}</span>
						{message.message}
						<span className='chat__timestamp'>
							{message.timestamp}
						</span>
					</p>
				))}
			</div>

			<div className='chat__footer'>
				<InsertEmoticon />
				<form>
					<input placeholder='Type a message' type='text' />
					<button type='submit'>Send a message</button>
				</form>
				<MicIcon />
			</div>
		</div>
	);
};

export default Chat;
