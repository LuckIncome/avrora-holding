<template>
    <button>
        <slot></slot>
    </button>
</template>

<script>
export default {
    name: "my-button"
}
</script>

<style lang="scss" scoped>
    button {
        color: $main;
        border: 1px solid $main;
        border-radius: 4px;
        padding: 11px 13px;
        &:hover {
            background: $hover;
        }
    }
</style>
