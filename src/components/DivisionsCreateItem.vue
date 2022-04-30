<template>
    <li class="create__body">
        <ul class="create__divisions">
            <li>
                <span :style="{ marginLeft: level * 30 + 'px' }">
                    {{ division.name }}
                </span>
            </li>
            <li>{{ division.count }}</li>
            <li>
                <my-button @click="getDivision(division)"> + </my-button>
            </li>
        </ul>
        <divisions-create-item
            v-for="division in division.children"
            :division="division"
            :level="level + 1"
            @setDivision="getDivision"
        />
    </li>
</template>

<script>
export default {
    name: "divisions-create-item",
    props: {
        division: {
            type: Object
        },
        level: {
            type: Number
        }
    },
    methods: {
        getDivision(event) {
            this.$emit('setDivision', event)
        }
    }
}
</script>

<style lang="scss" scoped>
    button {
        margin: 0 !important;
        border-radius: 50% !important;
        width: 10px !important;
        height: 28px !important;
        display: flex !important;
        align-items: center !important;
        justify-content: center !important;
    }
</style>
