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
            return messages.length > 0 ? messages[0].message : 'Sem Título'
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
            chat.messages.push(messageFactory({ message: message, sent: sent, avatar: sent ? SideShowIcon : RaggaIcon}))
        },
        chatActivate(id) {
            this.inactivateChat()
            this.chats = this.chats.map(chat => {
                if(chat.id === id) chat.active = true
                return chat
            })
        },
        async answerMessage(message) {
            if(this.chats.length === 0) this.createChat()
            
            const chatActive = this.chats.find(chat => chat.active) ?? null
            
            if(!chatActive) return
            
            this.answering = true
            this.createMessage(chatActive.id, message, true)
            await new Promise(resolve => setTimeout(resolve, 1000))
            this.createMessage(chatActive.id, randomMessages() , false)
            this.answering = false
        }
    }
})

export const randomMessages = () => {
    const messages = [
        'Só vou poder te responder no sábado! Aguarde',
        'Apressadinho você, não?',
        'Bad, Bad server, no donuts for you!',
        'Aguarde até sábado, por favor',
        'Eu sou uma piada pra você?',
        'Calma, Inteligêncio Artificial!',
        'Pergunta pro Google!',
        'Tenha paciência, amigo!',
        'Nasceu de quantos meses?',
        'Você não cansa de falar comigo?',
        'Tem algo de errado nessa sua pergunta!',
        'Existe um botão de desligar, sabia?',
        'Maldita Inclusão digital!',
        'Você tá muito ansioso! Quer um chá de camomila?',
        'Tá querendo atenção??', 
        'Tem bife de casquinha?'
    ]
    return messages[Math.floor(Math.random() * messages.length)]
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