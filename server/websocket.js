/* eslint-disable no-case-declarations */
/* eslint-disable no-shadow */
const WebSocket = require('ws');
// const { Message } = require('./db/models/message');
const uuidv4 = require('uuid');
const { getMessages } = require('./WScontroller/controller');
const { Message, User } = require('./db/models');

const wsServer = new WebSocket.Server({
  noServer: true, clientTracking: false,
});

const clientMap = new Map();

wsServer.on('connection', (ws, request) => {
  // const { userId, userName } = request.session;
  // console.log(request.session);
  const userId = uuidv4.v4();
  console.log('USERID', userId);
  const userName = 'vasya';
  ws.userId = userId;
  ws.userName = userName;

  clientMap.set(userId, ws);
  // console.log('ckient conected', clientMap);

  ws.on('message', async (message) => {
    const parsedMessage = JSON.parse(message);
    console.log(parsedMessage);

    switch (parsedMessage.type) {
      case 'USER_CONNECTED':
        getMessages().then(console.log);
        clientMap.forEach((client) => {
          if (client.readyState === WebSocket.OPEN) {
            client.send(JSON.stringify({
              type: parsedMessage.type,
              payload: { userName },
            }));
          }
        });
        break;

      case 'NEW_MESSAGES':
        if (parsedMessage.payload.message && parsedMessage.payload.id) {
          const newMessage = await Message.create({
            message: parsedMessage.payload.message,
            user_id: parsedMessage.payload.id,
            room_id: 1,
          });

          clientMap.forEach((client) => {
            client.send(JSON.stringify({
              type: 'NEW_MESSAGES',
              payload: { userName, newMessage },
            }));
          });
        }
        //
        break;

      case 'GET_MESSAGES':

        console.log(123123123123123);
        const message = await Message.findAll({
          include: {
            model: User,
          },
          order: [
            ['id', 'ASC'],
          ],
        });
        const res = message.map((mess) => ({
          userName: mess.User.name, message: mess.message, ownMessage: mess.user_id,
        }));
        console.log(res);

        clientMap.forEach((client) => {
          if (client.readyState === WebSocket.OPEN) {
            client.send(JSON.stringify({
              type: 'GET_MESSAGES',
              payload: res,
            }));
          }
        });

        break;

      default:
        break;
    }
  });
});

module.exports = { wsServer };

// case 'NEW_MESSAGE_PRIVATE':
//   clientMap.forEach((client) => {
//     if (client.readyState === WebSocket.OPEN) {
//       if (+parsedMessage.sendTo === client.userId || client.userId === userId) {
//         // const [room] = await Room.finAll({where:{
//         //   [Op.or]: [{user1:+parsedMessage.sendTo}, {user1:userId}],
//         //   [Op.or]: [{user2:+parsedMessage.sendTo}, {user2:userId}]
//         // }})
//         // if (!room) {

//         // }
// console.log('=====><=========', parsedMessage.sendTo, client.userId, userId);

//         client.send(JSON.stringify({
//           type: parsedMessage.type,
//           payload: {
//             userName,
//             message: parsedMessage.payload.message,
//             ownMessage: userId === client.userId,
//           },
//         }));
//       }
//     }
//   });
//   break;
