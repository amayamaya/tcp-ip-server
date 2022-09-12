import chalk from 'chalk';
import net from 'net';

const logOut = (...args) => {
  if (process.env.NODE_ENV !== 'test') {
    console.log(chalk.cyan('[server]'), ...args);
  }
};
const logErr = (...args) => {
  if (process.env.NODE_ENV !== 'test') {
    console.error(chalk.cyan('[server]'), ...args);
  }
};

export const serve = (host, port) => {
  const server = net.createServer((socket) => {
    logOut(`We're IN the computer!`);
    socket.on('data', (data) => {
        //when the server receives a request, 
        //it will log the request to the console as a response
        //if statement for method nd path method === GET & path = '/'  and '/post' 
        //this shows us what kind of method we'll be using
        // [ method, path, ]
      logOut('Data we have', data.toString());
      socket.write(data);
      logout('Data written', data.toString());
    });
    socket.on('error', (er) => {

      logErr('Error with socket', err);
    });
    socket.on('close', () => {
      logOut('Connection dropped');
    });
  });
  server.listen(port, host, () => {
    logOut(`Server listening on ${host}:${port}`);
  });
  logOut(`Listening on ${host}:${port}...`);
  return server;
};
