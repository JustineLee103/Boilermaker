
const { db } = require('./db/index')

const app = require('./index')
const port = process.env.PORT || 1207


db.sync()
    .then(() => {
        app.listen(port, () => console.log( `Listening on port ${port}`))
    })
