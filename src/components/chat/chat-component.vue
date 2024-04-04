<template>
    <div class="__chatComponent">
        <q-scroll-area style="height: 80vh">
            <template v-if="chatActive != null">
                <template v-for="message in chatActive.messages" :key="message.id">
                    <div class="__chatBox">
                        <q-chat-message :name="message.sent ? 'Ragga Boy' : 'Ragga AI'" :avatar="message.avatar"
                            :text="[message.message]" :sent="message.sent" />
                    </div>
                </template>
            </template>
            <template v-else>
                <div class="__noChat">
                    <p>Selecione um chat ou digite a sua pergunta.</p>
                </div>
            </template>
        </q-scroll-area>

    </div>
    <div class="__dialog">
        <DialogBox />
    </div>

</template>
<script>
import { computed } from 'vue';
import { useStore } from '../../store';
import DialogBox from './dialog-box.vue';
export default {
    components: {
        DialogBox
    },
    setup() {

        const useChat = useStore();
        const chatActive = computed(() => useChat.getChatActive);

        return {
            chatActive
        }
    }
}
</script>
<style lang="scss">
.__chatComponent {
    height: 90vh;
    overflow-y: auto;
    padding: 2rem 5rem 2rem 5rem;
    .__chatBox {
        margin-left:40px;
        margin-right:40px;
    }
}

.__noChat {
    display: flex;
    justify-content: center;
    align-items: center;
    height: 100%;

    p {

        font-size: 1.5rem;
    }

}

.__dialog {
    height: 10vh;
}
</style>