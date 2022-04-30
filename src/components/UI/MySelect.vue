<template>
    <div class="my-select" :class="{'my-select-active' : show}">
        <my-button @click="show = !show">{{ option.name }} <i></i></my-button>
        <Transition>
            <ul class="my-select__options" v-if="show">
                <li
                    v-for="item in options"
                    class="my-select__option"
                    :class="{'my-select__option-active' : option.name == item.name}"
                    @click="toggle(item)"
                >
                    {{ item.name }}
                </li>
            </ul>
        </Transition>
    </div>
</template>

<script>
import {ref} from "vue";

export default {
    name: 'my-select',
    props: {
        modelValue: {
            type: String
        },
        options: {
            type: Array,
            default: () => []
        }
    },
    setup(_, {emit}) {
        const show = ref(false)

        const option = ref({
            name: 'Выберите из списка',
            value: '',
        })

        const toggle = event => {
            option.value.name = event.name
            option.value.value = event.value
            show.value = false
            emit('update:modelValue', option.value.value);
        }

        return {
            show,
            option,
            toggle
        }
    }
}
</script>

<style lang="scss" scoped>
    .my-select {
        position: relative;
        display: inline-block;
        min-width: 220px;
        button {
            width: 100%;
            padding-right: 25px;
            display: flex;
            align-items: center;
            justify-content: space-between;
            i {
                margin-left: 10px;
                display: inline-block;
                position: relative;

                &::before {
                    content: ' ';
                    position: absolute;
                    transition: .4s;
                    left: 0;
                    top: 0;
                    width: 7px;
                    height: 2px;
                    background: $main;
                    transform: rotate(45deg);
                }

                &::after {
                    content: ' ';
                    position: absolute;
                    transition: .4s;
                    left: 5px;
                    top: 0;
                    width: 7px;
                    height: 2px;
                    background: $main;
                    transform: rotate(-45deg);
                }
            }
        }
        &__options {
            width: 100%;
            position: absolute;
            margin-top: 15px;
            border: 1px solid $main;
            border-radius: 4px;
            background: $background;
        }
        &__option {
            width: 100%;
            padding: 11px 13px;
            transition: .4s;
            cursor: pointer;
            font-size: 13.5px;
            &:hover, &-active {
                background: $hover;
            }
        }
        &-active {
            button {
                i {
                    &::before {
                        transform: rotate(-45deg);
                    }

                    &::after {
                        transform: rotate(45deg);
                    }
                }
            }
        }
    }
    .v-enter-active,
    .v-leave-active {
        transition: opacity .3s ease;
    }
    .v-enter-from,
    .v-leave-to {
        opacity: 0;
    }
</style>
