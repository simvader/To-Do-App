const fs = require('fs')
const { resolve } = require('path')

let list_to_do = []


const save_bd = () => {
    let data = JSON.stringify(list_to_do)
    fs.writeFile('./database/data.json', data, (err) => {
        if (err) {
            throw new Error(`no se pudo guardar por el siguiente error : ${err}`)
        }
    })
}

const loadDB = () => {
    try {
        list_to_do = require('../database/data.json')
    } catch (error) {
        list_to_do = []
    }
}


const crear = (description) => {
    loadDB()
    let to_do = {
        description,
        is_done: false
    };
    list_to_do.push(to_do)
    save_bd()
    return list_to_do
}

const list_tasks = () => {
    loadDB()
    return list_to_do
}


const update_task = (description, is_done = 'true') => {
    loadDB()
    let index = search_task(description)
    if (index) {
        list_to_do[index].is_done = (is_done == 'true')
        save_bd()
        return true
    }
    return false
}


const search_task = (description) => {
    let index = list_to_do.findIndex((task) => description === task.description)
    if (index > -1) {
        return index
    } else {
        return false
    }
}


const delete_task = (description) => {
    loadDB()

    let nuevo_listado = list_to_do.filter(task => { return task.description !== description })
    if (nuevo_listado.length < list_to_do.length) {
        list_to_do = nuevo_listado
        save_bd()
        return true
    } else {
        return false
    }
}

module.exports = {
    crear,
    list_tasks,
    update_task,
    delete_task
}