<template>
    <div class="__sidebarComponent">

        <div class="__raggaLogo">
            <img src="../../assets/images/logo.png" alt="Ragga AI" />
        </div>

        <q-scroll-area style="height: 80vh">
            <template v-if="chatsHistory.length > 0">
                <div class="__chatHistory">
                    <div class="--boxHistory" v-for="chat in chatsHistory" :key="chat.chat_id"
                        @click="activateChat(chat.chat_id)">
                        <i class="fa-solid fa-comments"></i> <span>{{ chatName(chat.chat_id) }}</span>
                        <span class="--chatTrash"><i class="fa-solid fa-trash" @click="removeChat(chat.chat_id)"></i></span>
                    </div>
                </div>
            </template>

        </q-scroll-area>

        <q-scroll-area style="height: 10vh">
            <div class="__createChat">
                <q-btn class="btn-fixed-width" @click="createChat()" color="brown-5" label="Novo Tópico"
                    icon="lightbulb_outline" />
            </div>
        </q-scroll-area>

    </div>
</template>
<script>
import { computed } from 'vue';
import { useStore } from '../../store';

export default {
    setup() {
        const useChat = useStore();
        const createChat = useChat.createChat;
        const activateChat = useChat.chatActivate;
        const chatsHistory = computed(() => useChat.getChatHistory);

        const removeChat = (id) => {
            useChat.chatRemove(id);
        }

        const chatName = (id) => {
            return useChat.getChatTitleByID(id);
        }

        return {
            activateChat,
            createChat,
            chatsHistory,
            chatName,
            removeChat
        }
    }
}
</script>
<style lang="scss">
.__raggaLogo {
    display: flex;
    justify-content: center;
    align-items: center;
    margin-top: 10px;

    img {
        width: 200px;
    }

}

.__sidebarComponent {
    padding: 0;
    height: 100vh;
    overflow-y: auto;
    width: 100%;
    background-color: #fff;

    box-shadow: 0 0 5px rgba(0, 0, 0, 0.1);

    .__chatHistory {
        padding: 2rem;

        .--boxHistory {
            border: 1px dashed #eee;
            background-color: #f9f9f9;
            padding: 0.5rem;
            border-radius: 10px;
            margin-bottom: 1rem;
            cursor: pointer;

            .--chatTrash {
                float: right;

                i {
                    font-size: 10px;
                    color: rgb(109, 109, 109);
                }

            }
        }
    }

    .__createChat {
        display: flex;
        justify-content: center;
        align-items: center;
        padding: 0rem;
        margin-top: 20px;
    }
}
</style>