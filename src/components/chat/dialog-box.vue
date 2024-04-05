<template>
    <div class="__dialogBox">
        <div class="--dialogContent">
            <div class="row">
                <div class="col-11 --dialogInput">
                    <form @submit.prevent="sendMessage()">
                        <input type="text" v-model="messageValue" placeholder="Pergunte ao Ragga!" />
                    </form>
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
import { computed, inject, onMounted, ref } from 'vue';
import { useStore } from '../../store';

export default {
    name: 'DialogBox',
    
    setup() {
        const useChat = useStore();
        const answeringMessage = computed(() => useChat.getAnswering);
        const messageValue = ref('');
        const raggScroll = inject('raggScroll')

        raggScroll.value.setScrollPosition('vertical', raggScroll.value.getScroll().verticalSize)
        
        const sendMessage = async () => {
            if (messageValue.value) {
                await useChat.answerMessage(messageValue.value);
                raggScroll.value.setScrollPosition('vertical', raggScroll.value.getScroll().verticalSize)
                messageValue.value = '';
            }
        }

        return {
            sendMessage,
            messageValue,
            answeringMessage,
            raggScroll
            
            
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
        margin: 0 8rem 0 8rem;
        box-shadow: 0 0 5px rgba(0, 0, 0, 0.1);

        .--dialogInput {
            display: flex;
            align-items: center;

            form {
                width: 100%;

                input[type=text] {
                    width: 100%;
                    border: none;
                    outline: none;
                    height: auto;
                    overflow: hidden;
                    font-size: 15px;
                }
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