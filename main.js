var express = require('express')
var app = express()
var path = require('path')
var fs = require('fs')

app.get('/', function(req, res) {
    const tracks = fs.readdirSync(path.join(__dirname, 'tracks')).map(file => {
        if(file.indexOf('.mp3') === -1) {
            return
        }
        return `
    <div class="bottom_two">
    <div class="track">
        <div class="titles">
            <h3>${file}</h3>
        </div>
        <div class="audios">
            <audio class="form-itens" controls style="width: 100%" preload="metadata" >
                <source src="/track/${file}" type="audio/mpeg">
                Your browser does not support the audio element.
            </audio>
        </div>
    </div>
    <div>`
    })
    res.send(`
        <html>
            <head>
                <title>Music Player</title>
                <link rel="stylesheet" href="/index.css" />
            </head>
            <body style="text-align:center;">

            <div class="buttom">
            <div class="toggle">
            <input id="switch" type="checkbox" name="theme">
            <label for="switch">Toggle</label>
            </div>
            <img src="/images/light.svg">
            </div>

                <h1 class="title">Music Player</h1>
                <h2 class="subtitle">Put MP3 files on the tracks directory to see them here</h2>
                <div class="bottom">
                ${tracks.join('')}
                <script src="/index.js" /> 
                </div>
                <script src="/scripts.js"></script>
            </body>
        </html>
    `)
})

app.get('/track/:track', function(req, res) {
    res.sendFile(path.join(__dirname, 'tracks', req.params.track))
})

app.use(express.static(__dirname + '/public'));

app.listen(9090)

