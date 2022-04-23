require('colors')

const {
    inquirerMenu,
    pause,
    readInput,
    deleteToDoList,
    confirmDelete,
    showListCheckToComplete
} = require('./helpers/inquirer')

const { saveDB, readDB } = require('./helpers/saveFile')

const ToDos = require('./models/toDos')


const mainApp = async () => {

    let option = ''
    const todos = new ToDos()

    const todosDB = readDB()

    if (todosDB) {
        // Cargar las Tareas
        todos.loadToDosFromArray(todosDB)
    }

    do {
        option = await inquirerMenu()

        switch (option) {
            case '1':
                const desc = await readInput('Descripción:')
                todos.createToDo(desc)
                console.log('\nTarea creada correctamente!'.green)
                break;

            case '2':
                todos.completeList()
                break;

            case '3': // Completadas
                todos.listPendingCompleted(true)
                break;

            case '4': // Pendientes
                todos.listPendingCompleted(false)
                break;

            case '5':
                const ids = await showListCheckToComplete(todos.listArray)
                todos.completedToggle(ids)
                console.log('\nCambios efectuados correctamente!'.green)
                break;

            case '6':
                const id = await deleteToDoList(todos.listArray)
                if (id !== '0') {
                    const ok = await confirmDelete('\nEstá seguro(a) de eliminar la tarea seleccionada?')

                    if (ok) {
                        todos.deleteToDo(id)
                        console.log('\nTarea eliminada correctamente!'.green)
                    }
                }
                break;
        }

        saveDB(todos.listArray)

        await pause()

    } while (option !== '0');
}

mainApp()