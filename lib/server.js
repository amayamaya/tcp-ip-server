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
  console.log('hey');
  const server = net.createServer((socket) => {
    logOut(`We're IN the computer!`);
    socket.on('data', (data) => {
      logOut(`Received data: ${data}`);
      //when the server receives a request,
      //it will log the request to the console as a response
      //if statement for method nd path method === GET & path = '/'  and '/post'
      //this shows us what kind of method we'll be using
      // [ method, path, ]
      const dataString = data.toString();
      logOut('Data we have', data.toString());
      const lines = dataString.split('\n');
      const startLine = lines[0];
      const [method, path] = startLine.split(' ');
      if (method == 'GET' && path == '/') {
        console.log('half way there');
        //look into double vs triple equals
        const body = `
        <html>
            <main>
                <h1>Howdy World</h1>
                    <article>
                        <p>If you walk into a room like people will love you chances are they will.</p>
                    </article>
            </main>
        </html>`;
        socket.write(`HTTP/1.1 200 Ok
Content-Length: ${body.length}
Content-Type: text/html; charset=UTF-8
        
${body}`);
// content-type header was missing (socket.write is replacing res.json) 
// also indentation was pissed.
} else if (method === 'GET' && path === '/posts') {
  console.log('hit the posts endpoint');
  const object = {
    firstName: 'wicked',
    nextName: 'cool',
  };
  socket.write(`HTTP/1.1 200 Ok
Content-Length: ${JSON.stringify(object).length}
Content-Type: application/json
`);
} else {
  const denied = `<html><h1>Denied</h1></html>`;
  socket.write(`HTTP/1.1 404 Access Denied
content-length: ${denied.length}
Accept: application/json, text/html
${denied}`);
}
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
}
serve();