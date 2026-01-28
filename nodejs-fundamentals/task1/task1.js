const http = require("http");
const url = require("url");
const fs = require("fs");

const server = http.createServer((req, res) => {
  if (req.url.startsWith("/product")) {
    const parsedUrl = url.parse(req.url, true);
    const name = parsedUrl.query.name;
    const price = Number(parsedUrl.query.price);
    const discount = Number(parsedUrl.query.discount);

    if (!name || !price || !discount) {
      res.writeHead(400, { "Content-Type": "text/plain" });
      res.end("Missing name, price, or discount");
      return;
    }

    const finalPrice = price - (price * discount) / 100;

    const log = `Product: ${name}, Price: ${price}, Discount: ${discount}%, Final Price: ${finalPrice}\n`;
    fs.appendFileSync("searches.txt", log);

    res.writeHead(200, { "Content-Type": "text/plain" });
    res.end(
      `Product Found\n` +
      `Name: ${name}\n` +
      `Original Price: ${price}\n` +
      `Discount: ${discount}%\n` +
      `Final Price: ${finalPrice}`
    );
  } else {
    res.writeHead(404, { "Content-Type": "text/plain" });
    res.end("Route not found");
  }
});

server.listen(8000, () => {
  console.log("Server running on http://localhost:8000");
});
