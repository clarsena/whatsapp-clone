// importing
import express from 'express';
import mongoose from 'mongoose';
import Messages from './dbMessages.js';
import Pusher from 'pusher';
import cors from 'cors';

// app config
const app = express();
const port = process.env.PORT || 9000;

const pusher = new Pusher({
	appId: '1082143',
	key: 'ab9dae3417d39890ec98',
	secret: 'dfe5b98e49d3d0d69fb8',
	cluster: 'us2',
	useTLS: true,
});

// middlewares
app.use(express.json());
app.use(cors());

// DB config
const dbURL =
	'mongodb+srv://admin:yvBtIGaSgoYC3why@cluster0.dkovb.mongodb.net/whatsappclone?retryWrites=true&w=majority';

mongoose.connect(dbURL, {
	useCreateIndex: true,
	useNewUrlParser: true,
	useUnifiedTopology: true,
});

const db = mongoose.connection;

db.once('open', () => {
	console.log('DB connected');

	const msgCollection = db.collection('messages');
	const changeStream = msgCollection.watch();

	changeStream.on('change', (change) => {
		if (change.operationType === 'insert') {
			const messageDetails = change.fullDocument;
			pusher.trigger('messages', 'inserted', {
				name: messageDetails.name,
				message: messageDetails.message,
				timestamp: messageDetails.timestamp,
				received: messageDetails.received,
			});
		} else {
			console.log('Error triggering Pusher');
		}
	});
});

// ????

// api routes
app.get('/', (req, res) => res.status(200).send('Hello World!!!'));

app.get('/messages/sync', (req, res) => {
	Messages.find((err, data) => {
		if (err) {
			res.status(500).send(err);
		} else {
			res.status(200).send(data);
		}
	});
});

app.post('/messages/new', (req, res) => {
	const dbMessage = req.body;
	Messages.create(dbMessage, (err, data) => {
		if (err) {
			res.status(500).send(err);
		} else {
			res.status(201).send(`New message created: \n ${data}`);
		}
	});
});

// listener
app.listen(port, () => console.log(`Server is running on port ${port}`));
