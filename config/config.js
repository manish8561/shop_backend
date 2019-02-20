const config = {
  url:
    "mongodb+srv://shopuser:shopuser@cluster0-6so3n.mongodb.net/shop?retryWrites=true"
};

config.secret =
  process.env.NODE_ENV === "production" ? process.env.SECRET : "secret";

//const config = {url:'mongodb://localhost/shopping'};
module.exports = config;
