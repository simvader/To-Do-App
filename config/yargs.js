const description = {
    demand: true,
    alias: 'd',
    desc: 'Description of the to-do list'
}

const complete = {
    alias: 'c',
    desc: 'Marca como completada una tarea'
}

const argv = require('yargs')
    .command('create', 'Crea una elemento nuevo en la lista', {
        description
    })
    .command('delete', 'Delete a task from the list', {
        description
    })
    .command('update', 'Crea una elemento nuevo en la lista', {
        description,
        complete,
    })
    .help()
    .argv


module.exports = {
    argv
}