<template>
    <div class="create">
        <li class="create__divisions">
            <ul class="create__head">
                <li></li>
                <li>Фактическое количество</li>
                <li>Действие</li>
            </ul>
            <divisions-create-item
                v-for="division in divisions"
                :division="division"
                :level="0"
                @setDivision="setDivision"
            />
        </li>
        <div v-if="isCreate">
            <p>{{ isMain ? 'Раздел' : 'Подраздел' }}</p>
            <my-input
                v-model="newDivisions.name"
                placeholder="Регион...."
                v-focus
            />
            <my-input
                v-model="newDivisions.count"
                placeholder="Количество...."
                type="number"
                v-on:keyup.enter="addDivisions"
            />
            <my-button @click="addDivisions">
                Добавить раздел
            </my-button>
        </div>
        <br>
        <div v-if="isSave">
            <my-button @click="toggleCreate">
                {{ !isCreate ? '+' : '-' }} Добавить раздел
            </my-button>
            <my-button @click="setDivisions">
                Схранить
            </my-button>
        </div>
    </div>
</template>

<script>
import DivisionsCreateItem from "./DivisionsCreateItem";

export default {
    name: "divisions-create-list",
    components: {
        DivisionsCreateItem
    },
    data() {
        return {
            isCreate: true,
            isSave: false,
            isMain: true,
            divisions: [],
            newDivisions: {
                id: null,
                name: '',
                count: null,
                children: []
            },
            newDivisionsChildren: {
                id: null,
                parent: null,
                name: '',
                count: null,
                children: []
            }
        }
    },
    methods: {
        addDivisions() {
            if (this.newDivisions.name && this.newDivisions.count) {
                this.newDivisions.id = new Date().getTime()

                if (this.newDivisionsChildren.name) {
                    this.newDivisionsChildren.children.push(this.newDivisions)
                } else {
                    this.divisions.push(this.newDivisions)
                }

                this.isSave = this.isMain = true
                this.isCreate = false
                this.newDivisions = {
                    id: null,
                    name: '',
                    count: null,
                    children: []
                }
                this.newDivisionsChildren = {
                    id: null,
                    parent: null,
                    name: '',
                    count: null,
                    children: []
                }
            }
        },
        setDivisions() {
            let divisions = this.divisions
            this.$emit('addNewDivisions', divisions)
        },
        setDivision(event) {
            this.isCreate = true
            this.isMain = false
            this.newDivisionsChildren = event
        },
        toggleCreate() {
            this.isCreate = !this.isCreate
            this.newDivisionsChildren = {
                id: null,
                parent: null,
                name: '',
                count: null,
                children: []
            }
            this.isMain = true
        }
    }
}
</script>

<style lang="scss">
    .create {
        &__head {
            li {
                background: $background-block;
                border-left: 1px solid $background;
            }
        }
        &__body {
            //background: #08348445;
            background: rgba(0, 79, 255, 0.14);
        }
        input,
        button {
            margin-right: 30px;
        }
        p {
            margin: 20px 0 5px;
        }
        ul {
            display: flex;
            flex-wrap: wrap;
            justify-content: space-between;
            li {
                padding: 10px 20px;
                &:nth-child(1) {
                    width: 35%;
                    border-left: none;
                }
                &:nth-child(2) {
                    width: 35%;
                }
                &:nth-child(3) {
                    width: 30%;
                }
            }
        }
    }
</style>
