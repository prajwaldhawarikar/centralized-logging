const sendLog = (call, callback) => {
  console.log(call.request.namespace, call.request.data);
  callback(null, { ack: 'Ok' });
};

module.exports = { sendLog };
