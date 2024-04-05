<template>
    <div class="__chatComponent">
        <q-scroll-area style="height: 80vh" :bar-style="barStyle" :thumb-style="thumbStyle" ref="raggScroll">
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
                    <p>Faça alguma pergunta sobre o seriado "Os Simpsons"</p>
                </div>
            </template>
        </q-scroll-area>

    </div>
    <div class="__dialog" v-if="raggScroll != null">
        <DialogBox />
    </div>

</template>
<script>
import { computed, onMounted, provide, ref } from 'vue';
import { useStore } from '../../store';
import DialogBox from './dialog-box.vue';
export default {
    components: {
        DialogBox
    },

    setup() {
        const raggScroll = ref(null)
        provide('raggScroll', raggScroll)
       
        const useChat = useStore();
        const chatActive = computed(() => useChat.getChatActive);

        return {
            chatActive,
            thumbStyle: {
                right: '20px',
                backgroundColor: 'brown',
                width: '5px',
                opacity: 0.3
            },
            barStyle: {
                right: '20px',
                backgroundColor: 'brown',
                width: '5px',
                opacity: 0
            },
            raggScroll

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
        margin-left: 40px;
        margin-right: 40px;
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