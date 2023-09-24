exports.errorName = {
  //NEW Contact
  USER_ALREADY_EXISTS: "USER_ALREADY_EXISTS",
  FIELDS_REQUIRED: "FIELDS_REQUIRED",
  //ID
  ID_IS_REQUIRED: "ID_IS_REQUIRED",
  ID_NOT_EXIST: "ID_NOT_EXIST",
  //EMAIL
  EMAIL_IS_REQUIRED: "EMAIL_IS_REQUIRED",
  EMAIL_NOT_EXIST:"EMAIL_NOT_EXIST",
  //Server
  SERVER_ERROR: "SERVER_ERROR",
};

exports.errorType = {
      //NEW Contact
  USER_ALREADY_EXISTS: {
    message: "User is already exists.",
    statusCode: 403,
  },
  FIELDS_REQUIRED: {
    message: "All Fields is required.",
    statusCode: 404,
  },
    //ID
  ID_IS_REQUIRED: {
    message: "ID is required.",
    statusCode: 403,
  },
  ID_NOT_EXIST: {
    message: "There is no Contact With this id.",
    statusCode: 404,
  },
    //EMAIL
  EMAIL_IS_REQUIRED: {
    message: "Email is required.",
    statusCode: 404,
  },
  EMAIL_NOT_EXIST: {
    message: "There is no Contact With this email.",
    statusCode: 404,
  },
    //Server
  SERVER_ERROR: {
    message: "Server error.",
    statusCode: 500,
  },
};
