import axios from 'axios'

const state = {
    divisions: []
}

const getters = {

}

const actions = {
    getDivisions({ commit }) {
        return axios.get('http://localhost:3000/divisions')
            .then((divisions) => {
                commit('setDivisions', divisions.data)
            })
    },
    addDivisions({}, division) {
        return axios.post(`http://localhost:3000/divisions/`, division)
    },
    deleteDivisions({}, id) {
        // console.log(id)
        return axios.delete(`http://localhost:3000/divisions/${id}`)
    },
    editDivisions({}, division) {
        // console.log(division)
        return axios.put(`http://localhost:3000/divisions/${division.id}`, division)
    },
}

const mutations = {
    setDivisions: (state, divisions) => {
        state.divisions = divisions
    }
}

export default {
    state,
    getters,
    mutations,
    actions
}
