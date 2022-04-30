<template>
    <img src="@/assets/logo.svg" class="logo" alt="logo">
    <div class="container">
        <h1>Организационная структура</h1>
        <my-button @click="dialogVisible = !dialogVisible">
            + Добавить
        </my-button>
        <divisions-list
            v-if="divisions.length"
            :divisions="divisions"
            :key="divisions"
            @removeDivision="removeDivision"
            @updateDivision="updateDivision"
        />
    </div>
    <teleport to="#modales">
        <my-dialog v-model:show="dialogVisible">
            <divisions-create-list @addNewDivisions="addNewDivisions"/>
        </my-dialog>
    </teleport>
</template>

<script>
import DivisionsList from "@/components/DivisionsList";
import DivisionsCreateList from "@/components/DivisionsCreateList";
import {mapState, mapGetters, mapActions, mapMutations} from 'vuex'

export default {
    name: 'App',
    components: {
        DivisionsList,
        DivisionsCreateList
    },
    data() {
        return {
            dialogVisible: false
        }
    },
    computed: {
        ...mapState({
            divisions: state => state.divisions.divisions
        })
    },
    methods: {
        ...mapActions([
            "getDivisions",
            "addDivisions",
            "deleteDivisions",
            "editDivisions"
        ]),
        addNewDivisions(event) {
            for (const item of event) {
                this.addDivisions(item)
                    .then(() => {
                        this.getDivisions();
                    })
            }
            this.dialogVisible = false
        },
        removeDivision(event) {
            this.deleteDivisions(event)
                .then(() => {
                    this.getDivisions();
                })
        },
        updateDivision(event) {
            const newDivision = this.divisions.filter(item => item.id == event)
            const division = {
                id: newDivision[0].id,
                name: newDivision[0].name,
                count: newDivision[0].count,
                children: newDivision[0].children
            }
            this.editDivisions(division)
                .then(() => {
                    this.getDivisions();
                })
        }
    },
    mounted() {
        this.getDivisions()
    }
}
</script>

<style lang="scss" scoped>
    .logo {
        position: absolute;
        top: 20px;
        left: 50%;
        transform: translateX(-50%);
    }
    h1 {
        background: $background-block;
        color: $main-title;
        border-radius: 4px;
        font-size: 25px;
        padding: 10px 20px;
    }
    button {
        margin: 20px 0;
    }
</style>
