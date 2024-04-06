import axios from 'axios'

const HTTP = axios.create({
    baseURL: 'http://localhost:8000/',
    headers: {
        'Content-Type': 'application/json',
        'Access-Control-Allow-Origin': '*',
        'Access-Control-Allow-Methods': 'GET, POST, PUT, DELETE, OPTIONS',
        'Access-Control-Allow-Headers': 'Content-Type, X-Requested-With, X-Auth-Token',
        'Access-Control-Allow-Credentials': true,
    }

})

export const apiServices = {
    postQuery(path, chat) {
        const payload = {
            chat_id: chat.chat_id,
            messages: chat.messages.map(message => {
                return {
                    message_id: message.message_id,
                    message: message.message,
                }
            })
        }
        return HTTP.post(path, payload)
    }
}