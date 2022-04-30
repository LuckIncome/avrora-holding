<template>
    <li class="divisions">
        <ul class="divisions__head">
            <li></li>
            <li>Общее количество</li>
            <li>Фактическое количество</li>
            <li>Действие</li>
        </ul>
        <divisions-item
            v-for="(division, index) in divisions"
            :key="division.id"
            :division="division"
            :index="index"
            :parentDivisionId="division.id"
            :level="0"
            @removeDivision="removeDivision"
            @updateDivision="updateDivision"
        />
    </li>
</template>

<script>
import DivisionsItem from "@/components/DivisionsItem";

export default {
    name: "divisions-list",
    components: {
        DivisionsItem
    },
    props: {
        divisions: {
            type: Array
        }
    },
    methods: {
        removeDivision(event) {
            this.$emit("removeDivision", event);
        },
        updateDivision(event) {
            this.$emit("updateDivision", event);
        }
    }
}
</script>

<style lang="scss">
    .divisions {
        &__head {
            li {
                min-height: 40px;
                background: $background-block;
                border-left: 1px solid $background;
            }
        }
        &__body {
            //background: #08348445;
            background: rgba(0, 79, 255, 0.14);
        }
        ul {
            display: flex;
            flex-wrap: wrap;
            align-items: center;
            justify-content: space-between;
            li {
                padding: 10px 20px;
                &:nth-child(1) {
                    width: 30%;
                    border-left: none;
                }
                &:nth-child(2) {
                    width: 25%;
                }
                &:nth-child(3) {
                    width: 25%;
                }
                &:nth-child(4) {
                    width: 20%;
                }
            }
        }
    }
</style>
