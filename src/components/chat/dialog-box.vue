<template>
    <div class="__dialogBox">
        <div class="--dialogContent">
            <div class="row">
                <div class="col-11 --dialogInput">
                    <input type="text" v-model="messageValue" placeholder="Pergunte ao Ragga!" />
                </div>

                <div class="col-1 --dialogSend">
                    <i class="fa-solid fa-paper-plane" v-if="!answeringMessage" style="color:#8d6e63"
                        @click="sendMessage()"></i>
                        <i class="fa-solid fa-spinner" v-else style="color:#8d6e63"></i>
                    
                </div>
            </div>
        </div>
    </div>
</template>
<script>
import { computed, ref } from 'vue';
import { useStore } from '../../store';

export default {
    name: 'DialogBox',
    setup() {
        const useChat = useStore();

        const answeringMessage = computed(() => useChat.getAnswering);
        const messageValue = ref('');

        const sendMessage = async () => {
            if (messageValue.value) {
                await useChat.answerMessage(messageValue.value);
                messageValue.value = '';
            }
        }

        return {
            sendMessage,
            messageValue,
            answeringMessage
        }
    }

}
</script>
<style lang="scss">
.__dialogBox {
    position: relative;
    bottom: 20px;
    z-index: 1000;
    width: 100%;

    .--dialogContent {
        background-color: #fff;
        border-radius: 10px;
        padding: 15px;
        margin: 0 20rem 0 20rem;
        box-shadow: 0 0 5px rgba(0, 0, 0, 0.1);

        .--dialogInput {
            display: flex;
            align-items: center;

            input[type=text] {
                width: 100%;
                border: none;
                outline: none;
                font-size: 20px;
            }
        }

        .--dialogSend {
            text-align: center;

            i {
                font-size: 1.5rem;
                color: #000;
                width: auto;
                border-radius: 50%;
                padding: 10px;
                cursor: pointer;
            }
        }

    }
}
</style>