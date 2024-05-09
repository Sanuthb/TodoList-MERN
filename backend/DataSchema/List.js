import mongoose from 'mongoose'

const list_schema = mongoose.Schema({
    Task: {
        type: String,
        required: true
    },
    Status: {
        type: String,
        default: 'Pending'
    },
    Date: {
        type: String,
        default: new Date().toISOString()
    },
    Time: {
        type: String,
        default: new Date().toLocaleTimeString()
    }
})

export const List_Model = mongoose.model('TodoList',list_schema)