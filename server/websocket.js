/* eslint-disable no-inner-declarations */
/* eslint-disable no-case-declarations */
/* eslint-disable no-shadow */
const WebSocket = require('ws');
// const { Message } = require('./db/models/message');
const uuidv4 = require('uuid');
const { Op } = require('sequelize');
const { getMessages } = require('./WScontroller/controller');
const { Message, User, Room, Post } = require('./db/models');

const { log } = console;
const wsServer = new WebSocket.Server({
  noServer: true, clientTracking: false,
});

const clientMap = new Map();

wsServer.on('connection', (ws, request) => {
  // const { userId, userName } = request.session;
  console.log('START CONNECTION');

  // console.log('USERID', userId);
  // console.log('USRNAME', userName);

  // ws.userId = userId;
  // ws.userName = userName;
  let postId;
  let userName;
  let userId;
  clientMap.set(userId, ws);
  // console.log('ckient conected', clientMap);

  ws.on('message', async (message) => {
    const parsedMessage = JSON.parse(message);

    switch (parsedMessage.type) {
      case 'CONNECTION':
        console.log('CONNECTION');
        // getMessages().then(console.log);
        postId = parsedMessage.postId;
        userId = parsedMessage.userId;
        userName = parsedMessage.userNamed;
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
          const ownerPost = await Post.findOne({
            where: {
              id: parsedMessage.payload.postId,
            },
          });
          log('USER', parsedMessage.payload.id);
          log('OWNER', ownerPost.user_id);

          let room = await Room.findAll({ where: {
            [Op.or]: [
              { [Op.and]: [{ user1_id: parsedMessage.payload.id }, { user2_id: ownerPost.user_id }] },
              { [Op.and]: [{ user2_id: parsedMessage.payload.id }, { user1_id: ownerPost.user_id }] },
            ],

          } });
          log('room', room);

          function sendMessage(newMessage) {
            clientMap.forEach((client) => {
              if (userId === parsedMessage.payload.postId) {
                client.send(JSON.stringify({
                  type: 'NEW_MESSAGES',
                  payload: newMessage,
                }));
              }
            });
          }

          if (!room.length) {
            room = await Room.create({ user1_id: parsedMessage.payload.id, user2_id: ownerPost.user_id });
            const newMessage = await Message.create({
              message: parsedMessage.payload.message,
              user_id: parsedMessage.payload.id,
              room_id: room.id,
            });
            sendMessage(newMessage);
          } else {
            const newMessage = await Message.create({
              message: parsedMessage.payload.message,
              user_id: parsedMessage.payload.id,
              room_id: room.id,
            });
            sendMessage(newMessage);
          }

          // log('=======>', room);

          // if (!room.length) {
          //   room = await Room.create({ user1_id: parsedMessage.payload.id, user2_id: ownerPost.user_id });
          //   const newMessage = await Message.create({
          //     message: parsedMessage.payload.message,
          //     user_id: parsedMessage.payload.id,
          //     room_id: room.id,
          //   });
          // }

          // console.log('IIIII', parsedMessage.payload.id);
        }
        //
        break;

      case 'GET_MESSAGES':

        const message = await Message.findAll({
          include: {
            model: User,

          },
          order: [
            ['id', 'ASC'],
          ],

        });

        // const myMsg = message.filter((el) => el.dataValues.user_id === userId);
        // console.log('-=--=-=-=-=-=-=-', message[0].dataValues.user_id);
        // console.log(myMsg);

        // console.log('MEESAGE', message);
        const res = message.map((mess) => ({
          userName: mess.User.name, message: mess.message, ownMessage: mess.user_id,
        }));
        // console.log(res);

        clientMap.forEach((client) => {
          if (client.readyState === WebSocket.OPEN) {
            client.send(JSON.stringify({
              type: 'GET_MESSAGES',
              payload: res,
            }));
          }
        });
        break;

        // case 'NEW_PRIVATE_MESSAGE':
        //   const ownerId = await Post.findOne({
        //     where: {

        //     }
        //   })
        //   clientMap.forEach((client) => {
        //     if ()
        //   })

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
