import { defineStore } from 'pinia';
import { v4 as uuid } from 'uuid';

import RaggaIcon from '../assets/images/ragga_icon.png'
import SideShowIcon from '../assets/images/sideshow_icon.png'

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
            const messages = state.chats.find(chat => chat.id === id).messages
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
            const chat = this.chats.find(chat => chat.id === chatID)
            let createMessage = messageFactory({ message: message, sent: sent, avatar: sent ? SideShowIcon : RaggaIcon })
            chat.messages.push(createMessage)
            return createMessage.id
        },
        chatRemove(chatID) {
            this.chats = this.chats.filter(chat => chat.id !== chatID)
        },
        chatActivate(id) {
            this.inactivateChat()
            this.chats = this.chats.map(chat => {
                if (chat.id === id) chat.active = true
                return chat
            })
        },
        async answerMessage(message) {

            if (this.chats.length === 0) this.createChat()

            const chatActive = this.chats.find(chat => chat.active) ?? null

            if (!chatActive) return

            this.answering = true
            this.createMessage(chatActive.id, message, true)
            try {
                const messageID = this.createMessage(chatActive.id, '...', false)
                this.answering = false
                await new Promise(resolve => setTimeout(resolve, 1000))
                chatActive.messages = chatActive.messages.map(message => {
                    if (message.id === messageID) message.message = randomMessages()
                    return message
                })

            }
            catch (e) {
                this.createMessage(chatActive.id, 'Buguei!! Refaça a sua pergunta, por favor?', false)
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
        'Tenha paciência!',
        'Vamos com calma, o dia do Hackatoon é só sábado!',
        'Tô com fome, me dá um lanche?',
        'Felicidade, nada mais é do que boa saúde e memória fraca',
        'Se você não sabe onde quer ir, qualquer caminho serve',
        'Quem não sabe para onde vai, qualquer caminho serve',
        'A vida é muito importante para ser levada a sério',
        'A vida é uma peça de teatro que não permite ensaios',
        'A vida é uma tragédia quando vista de perto, mas uma comédia quando vista de longe',
        'A vida é uma peça de teatro que não permite ensaios',
    ]
    return messages[Math.floor(Math.random() * messages.length)]
}

export const sliceStr = (str, char) => {
    return str.slice(0, char) + (str.length > char ? '...' : '')
}

export const chatFactory = ({
    chats = [],
    messages = [],
    id = uuid(),
    active = true,
    created_at = new Date(),
}) => {
    return {
        chats,
        messages,
        active,
        id,
        created_at,
    }
}

export const messageFactory = ({
    message = '',
    sent = true,
    avatar = RaggaIcon,
}) => {
    return {
        id: uuid(),
        created_at: new Date(),
        message: message,
        sent: sent,
        avatar: avatar,
    }
}