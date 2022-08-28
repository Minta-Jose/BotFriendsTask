const request = require("request");

module.exports = {
  call: (url, headers) => {
    return new Promise((resolve, reject) => {
      request(
        url,
        {
          json: true,
          headers,  
        },
        (err, res, body) => {
          if (err) reject(err);
          resolve(body);
        }
      );
    });
  },
};
