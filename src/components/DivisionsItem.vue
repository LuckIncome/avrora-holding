<template>
    <li class="divisions__body">
        <ul class="division">
            <li @click="isShow = !isShow">
                <span :style="{ marginLeft: level * 30 + 'px' }">
                    <img
                        src="../assets/icons/arrow.svg"
                        v-if="division.children.length"
                        class="arrow"
                        :class="{ 'arrow-active': isShow }"
                    />
                    {{ division.name }}
                </span>
            </li>
            <li>{{ totalCount }}</li>
            <li>{{ division.count }}</li>
            <li>
                <my-button
                    @click="removeDivision"
                    style="margin-right: 10px;"
                >
                    Удалить
                </my-button>
                <my-button @click="dialogVisible = !dialogVisible">
                    Изменить
                </my-button>
            </li>
        </ul>
        <divisions-item
            v-show="isShow"
            v-for="(children, subIndex) in division.children"
            :key="division.id"
            :division="children"
            :index="subIndex"
            :parentDivision="division"
            :parentDivisionId="parentDivisionId"
            :level="level + 1"
            @removeDivision="removeDivision"
            @updateDivision="updateDivision"
            @getCount="getCount"
        />
        <teleport to="#modales">
            <my-dialog v-model:show="dialogVisible" class="dialog-item">
                    <div v-if="!isCreate">
                        <my-input
                            v-model="newDivision.name"
                            placeholder="Регион...."
                        />
                        <my-input
                            v-model="newDivision.count"
                            placeholder="Количество...."
                            type="number"
                            v-on:keyup.enter="updateDivision"
                            v-focus
                        />
                    </div>
                    <div v-else>
                        <my-input
                            v-model="newDivisionChildren.name"
                            placeholder="Регион...."
                            v-focus
                        />
                        <my-input
                            v-model="newDivisionChildren.count"
                            placeholder="Количество...."
                            type="number"
                            v-on:keyup.enter="updateDivision"
                        />
                    </div>
                    <my-button @click="isCreate = !isCreate">
                        {{ !isCreate ? 'Добавить подраздел' : 'Назад' }}
                    </my-button>
                    <my-button @click="updateDivision">
                        {{ !isCreate ? 'Изменить' : 'Добавить' }}
                    </my-button>
            </my-dialog>
        </teleport>
    </li>
</template>

<script>
import DivisionsItem from "@/components/DivisionsItem";

export default {
    name: "divisions-item",
    components: {
        DivisionsItem
    },
    props: {
        division: {
            type: Object
        },
        level: {
            type: Number
        },
        index: {
            type: Number
        },
        parentDivision: {
            type: Object
        },
        parentDivisionId: {
            type: Number
        }
    },
    data() {
        return {
            isCreate: false,
            isShow: false,
            dialogVisible: false,
            newDivision: JSON.parse(JSON.stringify(this.division)),
            countDivision: JSON.parse(JSON.stringify(this.division)),
            newDivisionChildren: {
                id: null,
                name: '',
                count: null,
                children: []
            },
            totalCount: null,
        }
    },
    methods: {
        getCount(countChildren) {
            this.countDivision.count = Number(this.countDivision.count) + countChildren
            this.$emit('getCount',  countChildren)
        },
        setCount() {
            const sum = this.countDivision.children.reduce((acc, curr) => {return acc + Number(curr.count);}, 0)
            this.totalCount = sum + Number(this.countDivision.count)
            this.$emit('getCount',  sum)
        },
        removeDivision() {
            if (this.parentDivision !== undefined) {
                this.parentDivision.children.splice(this.index, 1)
                this.updateDivision()
            } else {
                this.$emit("removeDivision", this.parentDivisionId)
            }
        },
        updateDivision() {
            if (this.newDivisionChildren.name.length && this.newDivisionChildren.count.length) {
                this.newDivisionChildren.id = new Date().getTime()
                this.newDivision.children.push(this.newDivisionChildren)
                this.division.children = this.newDivision.children
            }
            this.division.name = this.newDivision.name
            this.division.count = this.newDivision.count
            this.dialogVisible = false
            this.$emit("updateDivision", this.parentDivisionId)
        }
    },
    mounted() {
        this.setCount()
    }
}
</script>

<style lang="scss">
    .division {
        li:first-child {
            cursor: pointer;
            user-select: none;
            transition: .2s;
            opacity: 1;
            &:hover {
                opacity: .7;
            }
        }
        span {
            position: relative;
            display: flex;
            align-items: center;
        }
        .arrow {
            width: 6px;
            left: -10px;
            position: absolute;
            transform: rotate(0deg);
            transition: .2s;
            &-active{
                transform: rotate(90deg);
            }
        }
    }
    .dialog-item {
        button, input {
            margin: 0 5px
        }
        .dialog__content {
            min-height: auto !important;
            min-width: auto !important;
            display: flex;
            align-items: center;
        }
    }
</style>
