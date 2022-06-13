var http = require("http");
var fs = require("fs");
var Datastore = require('nedb')
var playList = new Datastore({
    filename: 'kolekcja.db',
    autoload: true
});


var server = http.createServer(function (req, res) {
    console.log(req.method)

    switch (req.method) {
        case "GET":
            if (req.url.startsWith("/spotify/")) {
                if (req.url.endsWith(".jpg")) {
                    var path = decodeURIComponent(req.url).substr(8)
                    fs.readFile('./static/' + path, function (error, data) {
                        res.writeHead(200, { "Content-Type": 'image/jpeg; charset=utf-8' });
                        res.write(data)
                        res.end()
                    })
                } else if (req.url.endsWith(".mp3")) {
                    console.log(req.url)
                    var path = decodeURIComponent(req.url).substr(8)
                    var stats = fs.statSync(__dirname + "/static/" + path)
                    fs.readFile('./static/' + path, function (error, data) {
                        res.writeHead(200, {
                            "Content-Type": "audio/mpeg", "Access-Control-Allow-Origin": "*",
                            "Content-length": stats.size,
                            "Accept-ranges": "bytes"

                        })
                        res.write(data)
                        res.end()
                    })
                }
            }
            break;
        case "POST":
            servRes(req, res)
            break;
    }
})
function servRes(req, res) {
    var allData = "";

    req.on("data", function (data) {
        console.log("data: " + data)
        allData += data;
    })

    req.on("end", function () {
        var finish = JSON.parse(allData);
        if (finish.info == "FIRST") {
            res.writeHead(200, { "content-type": "application/json", "Access-Control-Allow-Origin": "*" })
            var infoFirst = {
                albums: [ // tablica stringow z nazwami albumow

                ],
                files: [ // tablica obiektow songow (warosci name i size)

                ],

            }
            fs.readdir(__dirname + "/static", function (err, files) {
                infoFirst.albums = files
                fs.readdir(__dirname + "/static/" + infoFirst.albums[0], function (err, files) {
                    for (let i = 0; i < files.length; i++) {
                        var sng = {
                            name: files[i],
                            size: fs.statSync(__dirname + "/static/" + infoFirst.albums[0] + "/" + files[i]).size
                        }
                        if (sng.name != "cover.jpg") {
                            infoFirst.files.push(sng)
                        }
                    }
                    res.end(JSON.stringify(infoFirst));
                })
            })

        } else if (finish.info == "NEXT") {
            res.writeHead(200, { "content-type": "application/json", "Access-Control-Allow-Origin": "*" })
            var pliki = []
            fs.readdir(__dirname + "/static/" + finish.album, function (err, files) {
                for (let i = 0; i < files.length; i++) {
                    var sng = {
                        name: files[i],
                        size: fs.statSync(__dirname + "/static/" + finish.album + "/" + files[i]).size
                    }
                    if (sng.name != "cover.jpg") {
                        pliki.push(sng)
                    }
                }
                res.end(JSON.stringify(pliki))
            })
        } else if (finish.info == "ADDSONG") {
            res.writeHead(200, { "content-type": "application/json", "Access-Control-Allow-Origin": "*" })
            var doc = {
                name: finish.name,
                album: finish.album,
                size: finish.size
            }

            playList.insert(doc, function (err, newDoc) {
                console.log("dodano dokument (obiekt):")
                console.log(newDoc)
                console.log("losowe id dokumentu: " + newDoc._id)
            });
            res.end(JSON.stringify(doc))
        } else if (finish.info == "SHOWLIST") {
            res.writeHead(200, { "content-type": "application/json", "Access-Control-Allow-Origin": "*" })
            playList.find({}, function (err, docs) {
                //zwracam dane w postaci JSON
                console.log("----- tablica obiektów pobrana z bazy: \n")
                console.log(docs)
                console.log("----- sformatowany z wcięciami obiekt JSON: \n")
                console.log(JSON.stringify({ "docsy": docs }, null, 5))
                res.end(JSON.stringify(docs))
            });
        }

    })
}
server.listen(3000, function () {
    console.log("serwer startuje na porcie 3000")
});