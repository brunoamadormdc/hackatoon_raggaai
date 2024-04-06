import { defineStore } from 'pinia';
import { v4 as uuid } from 'uuid';
import RaggaIcon from '../assets/images/ragga_icon.png'
import SideShowIcon from '../assets/images/sideshow_icon.png'
import { apiServices } from '../axios';

export const useStore = defineStore({
    id: 'chat',
    state: () => ({
        answering: false,
        chats: []
    }),
    getters: {
        getChatHistory: (state) => {
            return state.chats
        },
        getChatActive: (state) => {
            return state.chats.find(chat => chat.active) ?? null
        },
        getAnswering: (state) => {
            return state.answering
        },
        getChatTitleByID: (state) => (id) => {
            const messages = state.chats.find(chat => chat.chat_id === id).messages
            return messages.length > 0 ? sliceStr(messages[0].message, 15) : 'Sem Título'
        }
    },
    actions: {
        createChat() {
            this.inactivateChat()
            this.chats.push(chatFactory({}))
        },
        inactivateChat() {
            this.chats = this.chats.map(chat => {
                chat.active = false
                return chat
            })
        },
        createMessage(chatID, message, sent = true) {
            const chat = this.chats.find(chat => chat.chat_id === chatID)
            let createMessage = messageFactory({ message: message, sent: sent, avatar: sent ? SideShowIcon : RaggaIcon })
            chat.messages.push(createMessage)
            return createMessage.message_id
        },
        chatRemove(chatID) {
            this.chats = this.chats.filter(chat => chat.chat_id !== chatID)
        },
        chatActivate(id) {
            this.inactivateChat()
            this.chats = this.chats.map(chat => {
                if (chat.chat_id === id) chat.active = true
                return chat
            })
        },
        async answerMessage(message) {

            if (this.chats.length === 0) this.createChat()

            const chatActive = this.chats.find(chat => chat.active) ?? null

            if (!chatActive) return

            this.answering = true
            this.createMessage(chatActive.chat_id, message, true)
            try {
                const messageID = this.createMessage(chatActive.chat_id, '...', false)
                this.answering = false
                const {data} = await apiServices.postQuery('query', chatActive)
                chatActive.messages = chatActive.messages.map(message => {
                    if (message.message_id === messageID) message.message = data?.message ?? randomErrorMessages()
                    return message
                })

            }
            catch (e) {
                this.createMessage(chatActive.chat_id, randomErrorMessages(), false)
                this.answering = false
                console.error(e)
            }

        }
    },
    persist: true
})

export const randomMessages = () => {
    const messages = [
        'Só vou poder te responder no final de semana.',
    ]
    return messages[Math.floor(Math.random() * messages.length)]
}

export const randomErrorMessages = () => {
    const messages = [
        'Bad, bad server, no donut for you...'
    ]
    return messages[Math.floor(Math.random() * messages.length)]
}

export const sliceStr = (str, char) => {
    return str.slice(0, char) + (str.length > char ? '...' : '')
}

export const chatFactory = ({
    messages = [],
    chat_id = uuid(),
    active = true,
    created_at = new Date(),
}) => {
    return {
        messages,
        active,
        chat_id,
        created_at,
    }
}

export const messageFactory = ({
    message = '',
    sent = true,
    avatar = RaggaIcon,
}) => {
    return {
        message_id: uuid(),
        created_at: new Date(),
        message: message,
        sent: sent,
        avatar: avatar,
    }
}