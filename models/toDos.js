const ToDo = require('./toDo')

class ToDos {

    _list = {}

    constructor() {
        this._list = {}
    }

    get listArray () {
        const list = []
        Object.keys(this._list).forEach(key => {
            const todo = this._list[key]
            list.push(todo)
        })
        return list
    }

    deleteToDo (id) {
        if (this._list[id]) {
            delete this._list[id]
        }
    }

    loadToDosFromArray (todos = []) {
        todos.forEach(todo => {
            this._list[todo.id] = todo
        })
    }

    createToDo (desc = '') {
        const todo = new ToDo(desc)
        this._list[todo.id] = todo
    }

    completeList () {

        console.log('\n')

        this.listArray.forEach((todo, i) => {
            const index = `${i + 1}`.green
            const { desc, completedIn } = todo
            const state = (completedIn)
                ? 'Completado'.green
                : 'Pendiente'.red
            console.log(`${index} ${desc} :: ${state}`)
        })
    }

    listPendingCompleted (completed) {
        console.log('\n')
        let index = 0

        this.listArray.forEach((todo) => {

            const { desc, completedIn } = todo
            const state = (completedIn)
                ? 'Completado en'.green
                : 'Pendiente'.red

            if (!completed) {
                if (!completedIn) {
                    // Listar tareas Pendientes
                    index += 1
                    console.log(`${(index + '.').green} ${desc} :: ${state}`)
                }
            } else if (completedIn) {
                // Listar tareas completadas
                index += 1
                console.log(`${(index + '.').green} ${desc} :: ${state} :: ${(completedIn.substring(0, 10)).blue}`)
            }
        })
    }

    completedToggle (ids = []) {

        ids.forEach(id => {
            const todo = this._list[id]

            if (!todo.completedIn) {
                todo.completedIn = new Date().toISOString().substring(0, 10);
            }
        })

        this.listArray.forEach(todo => {

            if (!ids.includes(todo.id)) {
                /* const todo = this._list[todo.id]
                todo.completedIn = null */

                // Asignación directa
                this._list[todo.id].completedIn = null
            }
        })
    }
}



module.exports = ToDos