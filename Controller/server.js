//imports modules
const http = require('http')
const fs = require('fs')
const model = require('../Model/SearchInFile')

/**Methods**/
function displayFormCommand(req, res) {
    fs.readFile('./View/index.html', 'utf8', (err, data) => {
        if (err)
            console.log(err)
        else
            res.write(data)
        res.end()
    })
}
function searchTextCommand(req, res) {
    let result = model.searchText('hello', 'hello world\n good bye\n')
    res.write(result)
    res.end()
}
//creating map - using Command Design Pattern
let commands = new Map()
commands.set('/', displayFormCommand)
commands.set('/search', searchTextCommand)
//creating server and setting app commands Map as Listener
const server = http.createServer((req, res) => {
    if (commands.has(req.url))
        commands.get(req.url)(req, res)
    else
        res.write("Invalid request")
})
//start server at port 8080
server.listen(8080, () => console.log("server started on port 8080"))