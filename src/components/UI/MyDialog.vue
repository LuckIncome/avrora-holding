<template>
    <div class="dialog" v-if="show" @click="hideDialog">
        <div @click.stop class="dialog__content">
            <slot></slot>
        </div>
    </div>
</template>

<script>
import toggleMixin from "@/mixins/toggleMixin";

export default {
    name: "my-dialog",
    mixins: [toggleMixin]
}
</script>

<style lang="scss" scoped>
    .dialog {
        position: fixed;
        top: 0;
        bottom: 0;
        left: 0;
        right: 0;
        background: rgba(0,0,0, 0.5);
        display: flex;
        z-index: $z-dialog;
        &__content {
            margin: auto;
            background: $background;
            border-radius: 12px;
            min-height: 50vh;
            min-width: 70%;
            padding: 20px;
        }
    }
</style>
