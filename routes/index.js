const express = require('express');
const router = express.Router();
const fs = require('fs');
const child_process = require('child_process');
const path = require('path');

router.get('/', function (req, res, next) {
    res.render('index', {title: 'Express'});
});

router.post('/submit', function (req, res, next) {
    let result = "";
    const randomNum = Math.floor(Math.random() * 10000);
    try {
        if (!fs.existsSync(__dirname + '/../testenv')) fs.mkdirSync(__dirname + '/../testenv');
    } catch (e) {
        console.error(e.message);
    }
    try {
        fs.writeFileSync(path.join(__dirname, '..', 'testenv', 'temp' + randomNum + '.c'), req.body.data);

    } catch (err) {
        console.error(err.message);
        return;
    }
    try {
        let output = child_process.execSync(`make BOARD_SRCS=${path.join(__dirname, '..', 'testenv', 'temp' + randomNum + '.c')}`, {
            cwd: path.join(__dirname, '..', 'testenv'),
        });
        result += output.toString();

        fs.unlinkSync(path.join(__dirname, '..', 'testenv', 'temp' + randomNum + '.o'));


    } catch (err) {
        console.error(err.message);
        console.error(err.stdout ? err.stdout.toString() : '');
        console.error(err.stderr ? err.stderr.toString() : '');
        result += err.stdout ? err.stdout.toString() + "\n\n" : '';
        result += err.stderr ? err.stderr.toString() + "\n\n" : '';
    } finally {
        fs.unlinkSync(path.join(__dirname, '..', 'testenv', 'temp' + randomNum + '.c'));
        try {
            fs.unlinkSync(path.join(__dirname, '..', 'testenv', 'temp' + randomNum + '.o'));
        } catch (e) {
            console.error(e.message);
        }
    }
    res.send(result);
})
module.exports = router;
