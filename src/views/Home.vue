<template>
    <div class="row">
        <div class="col-2">
            <SidebarComponent />
        </div>
        <div class="col-10">
            <ChatComponent />
        </div>
    </div>

</template>

<script>
import ChatComponent from '../components/chat/chat-component.vue';
import SidebarComponent from '../components/chat/sidebar-component.vue';
export default {
    components: {
        SidebarComponent,
        ChatComponent
    }
}
</script>
