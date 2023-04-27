import io from 'socket.io-client';
import RESOURCE from '../config/resource';

export const setupSocketClient = (callBack) => {
  let socket = io(RESOURCE.API_HOST.split(":")[1], { transports: ["websocket"], });
  socket.on('welcome', (data) => {
    console.log('data::', data);
    // alert("welcome")
  });
  socket.on('AUCTION_UPDATED', async (data) => {
    console.log("AUCTION_UPDATED");
    callBack();

  });
};
