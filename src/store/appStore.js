import {configureStore} from '@reduxjs/toolkit'
import taskReducer from './taskSlice'

const appStore=configureStore({
    reducer:{
        tasks:taskReducer
    }
})

export default appStore