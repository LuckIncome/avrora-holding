import { createStore } from 'vuex'
import divisions from './modules/divisions'

export default createStore({
    modules: {
        divisions,
    }
})
