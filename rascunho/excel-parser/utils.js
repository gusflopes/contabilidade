const crypto = require('crypto');

module.exports = {
  generateFileName: () => {
    const date = new Date().getTime();
    const random = Math.random().toString();

    const file = `${crypto
      .createHash('sha1')
      .update(date + random)
      .digest('hex')}.txt`;

    // console.log(file);

    return file;
  },
};
