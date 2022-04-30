<template>
    <input :value="modelValue" @input="updateInput" type="text">
</template>

<script>
export default {
    name: "my-input",
    props: {
        modelValue: [String, Number]
    },
    setup(props, { emit }) {
        const updateInput = event => {
            emit('update:modelValue', event.target.value)
        }
        return { updateInput }
    }
}
</script>

<style lang="scss" scoped>
    input {
        color: $main;
        border: 1px solid $main;
        border-radius: 4px;
        padding: 11px 13px;
        &::placeholder {
            color: $text;
        }
    }
</style>
