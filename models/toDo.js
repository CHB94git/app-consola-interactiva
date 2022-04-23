const { v4: uuidv4 } = require('uuid')

class ToDo {
    id = ''
    desc = ''
    completedIn = null

    constructor(desc) {
        this.id = uuidv4()
        this.desc = desc
        this.completedIn = null
    }
}

module.exports = ToDo