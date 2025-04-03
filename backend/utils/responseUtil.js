/**
 * Function to standardize the success response
 * @param {Object} res - The response object from Express
 * @param {Object} result - The result object containing status, message, and data
 */
function sendSuccessResponse(req, res, result) {
    if(result.token) {
      res.status(result.status || 200).send({
        success: true,
        data: result.data || null,
        message: result.message || 'Request was successful',
        token: result.token
      });
    }else{
      res.status(result.status || 200).send({
        success: true,
        data: result.data || null,
        message: result.message || 'Request was successful',
      });
    }
  }

  function sendFailedResponse( req, res, result) {
    res.status(result.status || 500).send({
      success: false,
      errror: result.error || null,
      message: result.message || 'Request was failed',
    });
  }
  
  module.exports = { sendSuccessResponse, sendFailedResponse };
  