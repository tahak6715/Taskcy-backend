const ResponseObj = {
    status: null,
    data: null, 
    message: "",
    error: "",
};

const sendResponse = (status,data,message,error) => {
    ResponseObj.status = status;
    ResponseObj.data = data;
    ResponseObj.message = message;
    ResponseObj.errorerror =error;

    return ResponseObj;
};

module.exports = { 
    sendResponse,
}

