const response = (StatusCode, data, message, res) => {
  res.status(StatusCode).json({
    payload: {
      status_code: StatusCode,
      datas: data,
      message: message,
    },
  });
};

module.exports = response;
