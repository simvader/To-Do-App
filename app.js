const argv = require('./config/yargs').argv
const to_do = require('./to_do/to_do')
const colors = require('colors')
const { loadDB } = require('./to_do/to_do')

let command = argv._[0]

switch (command) {
    case 'create':
        console.log(to_do.crear(argv.description))
        break
    case 'list':
        let tasks = to_do.list_tasks()
        console.log("============== To Do List ==============".green)
        if (tasks.length == 0) {
            console.log("The To-Do List its empty :(".red)
        } else {
            for (task of tasks) {
                console.log(`Task : ${task.description}`)
                console.log(`Done : ${ task.is_done ? colors.green("Done") : colors.red("Nope")  }`)
                console.log('----------------------------')
            }
        }
        console.log("============== ********** ==============".green)
        break
    case 'update':
        if (to_do.update_task(argv.description, argv.complete)) {
            console.log("Actualizado correctamente !".green);
        } else {
            console.log("No se pudo actualizar el registro !".red);
        }
        break
    case 'delete':
        if (to_do.delete_task(argv.description)) {
            console.log("El elemento fue eliminado existosamente".green);
        } else {
            console.log("El elemento no se pudo eliminar, quizas no existe.".red);
        }
        break
    default:
        console.log('comando no reconocido');
}