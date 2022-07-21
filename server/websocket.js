/* eslint-disable no-inner-declarations */
/* eslint-disable no-case-declarations */
/* eslint-disable no-shadow */
const WebSocket = require('ws');
const uuidv4 = require('uuid');
const { Op } = require('sequelize');
const { Message, User, Room, Post } = require('./db/models');

const { log } = console;
const wsServer = new WebSocket.Server({
  noServer: true, clientTracking: false,
});

const clientMap = new Map();

wsServer.on('connection', (ws, request) => {
  let postId;
  let userName;
  let userId = uuidv4.v4();
  clientMap.set(userId, ws);

  ws.on('message', async (message) => {
    const parsedMessage = JSON.parse(message);
    switch (parsedMessage.type) {
      case 'CONNECTION':
        console.log('CONNECTION');
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
        const name = parsedMessage.userName;
        console.log('parsedMessage: ', parsedMessage);
        if (parsedMessage.payload.message && parsedMessage.payload.id) {
          const ownerPost = await Post.findOne({
            where: {
              id: parsedMessage.payload.id,
            },
          });
          let room = await Room.findAll({ where: {
            [Op.or]: [
              { [Op.and]: [{ user1_id: parsedMessage.payload.id }, { user2_id: ownerPost.user_id }] },
              { [Op.and]: [{ user2_id: parsedMessage.payload.id }, { user1_id: ownerPost.user_id }] },
            ],

          } });

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
              room_id: room[0].id,
            });
            sendMessage(newMessage);
          }
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

        const res = message.map((mess) => ({
          userName: mess.User.name, message: mess.message, userId: mess.user_id,
        }));

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
