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
const KoreMsgPreprocessor=(requestBody)=>{
    if(requestBody.message.contact_message.text_message?.text!=undefined)
    {
        return requestBody.message.contact_message.text_message?.text
    }else{
        let msg=requestBody.message.contact_message.choice_response_message?.postback_data
        console.log('in preprocessor',msg)
        msg=msg.split("_")
        return msg[1]
    }

}
module.exports={koreWebhookFetch,KoreMsgPreprocessor}