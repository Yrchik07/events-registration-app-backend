import createHttpError from "http-errors";

export const errorHandlerMiddleware = (error, req, res, next) => {
  if(error instanceof createHttpError) {
    res.status(error.status).json({
      status: error.status,
      message: error.message,
      data: {
        message: error.message,
      },
    });

  }
  res.status(500).json({
    status: 500,
    message: "Internal server error",
    data: {
      message: error.message,
    },
  });
};
