const PORT = 3000;
const fs = require("fs");
const http = require("http");

const server = http.createServer((req, res) => {
  const { url, method } = req;

  if (url === "/") {
    res.write(
      '<html><body><form action="/form" method="post"><input type="text" name="name"/><input type="submit"/></form></body></html>'
    );
    res.end();
    return;
  }

  if (url === "/form") {
    const body = [];

    req.on("data", (chunk) => {
      body.push(chunk);
      console.log("here");
    });

    req.on("end", () => {
      const result = Buffer.concat(body).toString();
      fs.appendFile("text.txt", result, (err) => {
        if (err) {
          console.error("error", err);
          return;
        }
        res.write(
          `<html><body><h1>form submit successfully !!</h1><h2>${result}</h2></body></html>`
        );
        res.end();
      });
    });
  }
});

server.listen(PORT, () => console.log(`Listing on ${PORT} ....`));
