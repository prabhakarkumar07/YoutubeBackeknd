const asyncHandler = (requestHandler) => {
  return (req, res, next) => {
    //use return for hider order for higher oreder function to return itself as  function
    Promise.resolve(requestHandler(req, res, next)).catch((err) => next(err));
  };
  retu;
};

export { asyncHandler };

// const asyncHandler = (fn) => async (req, res, next) => {
//   try {
//     await fn(req, res, next);
//   } catch (error) {
//     res.status(error.code || 500).json({
//       success: false,
//       message: error.message,
//     });
//   }
// };
