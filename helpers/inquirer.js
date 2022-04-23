const inquirer = require('inquirer')
require('colors')


const questions = [
    {
        type: 'list',
        name: 'option',
        message: '¿Qué desea hacer?',
        choices: [
            {
                value: '1',
                name: `${'1.'.green} Crear tarea`
            },
            {
                value: '2',
                name: `${'2.'.green} Listar tareas`
            },
            {
                value: '3',
                name: `${'3.'.green} Listar tareas completadas`
            },
            {
                value: '4',
                name: `${'4.'.green} Listar tareas pendientes`
            },
            {
                value: '5',
                name: `${'5.'.green} Completar tarea(s)`
            },
            {
                value: '6',
                name: `${'6.'.green} Borrar tarea`
            },
            {
                value: '0',
                name: `${'0.'.green} Salir`
            }
        ]
    }
]


const inquirerMenu = async () => {

    /* console.clear() */

    console.log('==========================='.green)
    console.log('   Seleccione una opción   '.white)
    console.log('===========================\n'.green)

    const { option } = await inquirer.prompt(questions)
    return option
}


const pause = async () => {
    const question = [
        {
            type: 'input',
            name: 'pause',
            message: `Presione ${'ENTER'.green} para continuar`
        }
    ]
    console.log('\n')

    const { pause } = await inquirer.prompt(question)
    return pause
}


const readInput = async (message) => {
    const question = [
        {
            type: 'input',
            name: 'desc',
            message,
            validate (value) {
                if (value.length === 0) {
                    return 'Por favor ingrese un valor'
                }
                return true
            }
        }
    ]

    const { desc } = await inquirer.prompt(question)
    return desc
}


const deleteToDoList = async (todos = []) => {
    const choices = todos.map((todo, i) => {

        const index = `${i + 1}.`.green

        return {
            value: todo.id,
            name: `${index} ${todo.desc}`
        }
    })

    // Agregar opción al inicio
    choices.unshift({
        value: '0',
        name: '0. '.green + 'Cancelar'.red
    })

    const questions = [
        {
            type: 'list',
            name: 'id',
            message: 'Borrar',
            pageSize: `${choices.length}`,
            choices
        }
    ]

    const { id } = await inquirer.prompt(questions)
    return id
}


const confirmDelete = async message => {
    const question = [
        {
            type: 'confirm',
            name: 'ok',
            message
        }
    ]

    const { ok } = await inquirer.prompt(question)
    return ok
}


const showListCheckToComplete = async (todos = []) => {
    const choices = todos.map((todo, i) => {

        const index = `${i + 1}.`.green

        return {
            value: todo.id,
            name: `${index} ${todo.desc}`,
            checked: (todo.completedIn) ? true : false,
        }
    })

    const question = [
        {
            type: 'checkbox',
            name: 'ids',
            pageSize: `${choices.length}`,
            message: 'Seleccionado(s)',
            choices
        }
    ]

    const { ids } = await inquirer.prompt(question)
    return ids
}


module.exports = {
    inquirerMenu,
    pause,
    readInput,
    deleteToDoList,
    confirmDelete,
    showListCheckToComplete
}

