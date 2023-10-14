const config = require('../config');
const axios = require('axios');

const koreWebhookFetch=async(message)=>{
    console.log('in koreWebhookFetch',message)
    const headers = {
        'Content-Type': 'application/json',
        'Authorization': `bearer ${config.koreConfig.AUTH_TOKEN}`
            }; 

    const post_data={
                "message":{
                       "type": "text",
                       "val":message
                       },
               "from" :{
                   "id": "ragul.sivakumar@kore.com"
                       }
           }  

    try{
        const result=await axios.post(config.koreConfig.WEBHOOK_URL, post_data, { headers })
        console.log(result.data)
        return [result.data,null]
    }
    catch(error){
        console.log('in error',error)
        return [null,error]
    }
    
}
module.exports={koreWebhookFetch}