const config = require('../config');
const axios = require('axios');

function convoStatusUtil() {}

convoStatusUtil.prototype.isStarted=async (conversationId)=>{

    const url = `https://bots.kore.ai/api/public/tables/${config.KoreDataTableConfig.TABLE_NAME}/query`;

    const headers = {
      'auth': config.KoreDataTableConfig.AUTH_TOKEN,
      'content-type': 'application/json',
    };
    
    const data = {
      query: {
        expressions: [
          { field: 'conversationId', operand: '=', value:conversationId  },
        ],
      },
    };
    
    try{
        
        const response=await axios.post(url, data, { headers })
        console.log(response.data)
        return [response.data.total,null]
    }
    catch(error){
        console.log(error)
        return [null,error]
    }
}

convoStatusUtil.prototype.Start=async(conversationId, contactId, channel,channelId)=>{

    const url = `https://bots.kore.ai/api/public/tables/${config.KoreDataTableConfig.TABLE_NAME}`;

    const headers = {
      'auth': config.KoreDataTableConfig.AUTH_TOKEN,
      'content-type': 'application/json',
    };
    
    const data = {
      "data": {
        conversationId,
        contactId,
        channelId,
        channel
       }
     };
    try{
        
        const response=await axios.post(url, data, { headers })
        console.log(response.data)
        return [response.data,null]
    }
    catch(error){
        console.log(error)
        return [null,error]
    }

    
}

module.exports.newInstance=()=>{
    return new convoStatusUtil()
}