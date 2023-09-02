const fs = require('fs');


/**
 * @type {string[]} numbersArray, the expected numbers in this test
 */
var numbersArray = [];


/**
 * @type {string[]} userInputArray
 */
var userInputArray = [];

var intervalId = null;

let options = {
    timeZone: 'Asia/Shanghai',
    year: 'numeric',
    month: 'numeric',
    day: 'numeric',
    hour: 'numeric',
    minute: 'numeric',
};
let formatter = new Intl.DateTimeFormat([], options);


/**
 * 
 * @param {string} n 
 * @returns {string}
 * @description strip the float number to 12 digits to deal with javascript dumb float number
 */
function stripNum(n) {
    return (parseFloat(n).toPrecision(12));
}

function readInput() {
    const data = fs.readFileSync('input.txt', { encoding: 'utf8', flag: 'r' });
    numbersArray = data
        .trim()
        .split('\n')
        .map((line) => stripNum(line));
}

/**
 * 
 * @returns {void}
 * @description read the history.txt where each line contains a timestamp, an integer and 
 * an integer separated by a space. The first integer is the incorrect number user entered 
 * in that test, and the second integer is the time used in that test.
 */
function readHistory() {
    console.log("readHistory()");

    let historyArray = [];

    const data = fs.readFileSync('history.txt', { encoding: 'utf8', flag: 'r' });
    let tmpArray = data
        .trim()
        .split('\n')
        .map((line) => line.split(","));

    for (let i = 0; i < tmpArray.length; i++) {
        if (tmpArray[i].length != 3) { continue; }
        historyArray.push(tmpArray[i]);
    }
    console.log("historyArray: " + historyArray)

    return historyArray;
}


/** 
    * @param {Array} historyArray
    * @param {string} timestamp
    * @param {string} incorrectNumber
    * @param {string} timeUsed
    * @returns {void}
    * @description
    * This function adds a new score to the historyArray and writes the historyArray to the history.txt file.
*/
function addToHistory(historyArray, timestamp, incorrectNumber, timeUsed) {
    console.log("addToHistory()");

    const newScore = timestamp + "," + incorrectNumber + "," + timeUsed;

    console.log("newScore: " + newScore)
    console.log("old historyArray: " + historyArray)

    var fs = require('fs');

    var file = fs.createWriteStream('history.txt');
    file.on('error', function (err) { Console.log(err) });
    historyArray.forEach(row => file.write(`${row[0]},${row[1]},${row[2]}\n`));
    file.write(`${newScore}\n`);
    file.end();
}

function myTimer() {
    console.log('myTimer')
    const timerLabel = document.getElementById('timerLabel');
    timerLabel.textContent = parseInt(timerLabel.textContent) + 1;
}


/**
 * 
 * @param {string} str 
 * @returns 
 */
function isNumeric(str) {
    if (typeof str != "string") return false // we only process strings!  
    return !isNaN(str) && // use type coercion to parse the _entirety_ of the string (`parseFloat` alone does not do this)...
           !isNaN(parseFloat(str)) // ...and ensure strings of whitespace fail
  }

$(document).ready(function () {
    $("#startButton").click(function () {
        console.log('start test')
        $('#testPanel').css("display", 'block');
        $('#historyBoard').css("display", 'none');
        readInput();
        console.log("numbersArray: " + numbersArray);

        console.log('start timerLabel')

        const timerLabel = document.getElementById('timerLabel');
        timerLabel.textContent = '0';
        timerLabel.style.display = 'block';
        intervalId = setInterval(myTimer, 1000);

        $("#startButton").css("display", "none");
        $("#exitButton").css("display", "block");
        $("#historyButton").css("display", 'none');
        $("#msg").css("visibility", 'hidden');
        document.getElementById("inputText").focus();
    });

    $("#exitButton").click(function () {
        console.log('exit test')
        numbersArray = [];
        userInputArray = [];
        $("#startButton").css("display", "block");
        $("#historyButton").css("display", 'block');
        $("#exitButton").css("display", "none");
        $('#testPanel').css("display", 'none');
        $("#scoreBoard").css("display", 'none');
        $("#historyBoard").css("display", 'none');
        clearInterval(intervalId);
        $("#compareTable tbody tr").remove();
        $("#countLabel").text("1");
    });

    $("#historyButton").click(function () {
        console.log('historyButton clicked')

        $("#historyBoard").css("display", 'block');
        $("#historyButton").css("display", 'none');
        $("#historyTable tbody tr").remove();

        let history = readHistory();
        console.log("history: " + history)
        while (history.length > 100) {
            history.shift();
        }
        let tableBody = $("#historyTable tbody");
        for (let i = 0; i < history.length; i++) {
            newRow = "<tr><td>" + history[i][0] + "</td><td>" + history[i][1] + "</td><td>" + history[i][2] + "</td></tr>";
            tableBody.append(newRow);
        }

    });



    $("#inputText").keyup((event) => {
        if (event.key === 'Enter') {
            let inputText = $('#inputText');
            const userNumber = stripNum(inputText.val())
            inputText.val('');

            if (!isNumeric(userNumber)) {
                $("#errorMsg").css("visibility", 'visible');


            } else {
                $("#errorMsg").css("visibility", 'hidden');
                userInputArray.push(userNumber);

                if (userInputArray.length < numbersArray.length) {
                    console.log('userInputArray.length < numbersArray.length')
                    const tmp = userInputArray.length + 1;
                    $("#countLabel").text(tmp.toString());
                } else {
                    console.log('userInputArray.length >= numbersArray.length')
                    clearInterval(intervalId);
                    let timerLabel = $('#timerLabel');

                    const [expected_sum, user_sum] = compareResults(numbersArray, userInputArray);

                    $('#testPanel').css("display", 'none');

                    $("#scoreBoard").css("display", 'block');
                    $("#resultSummary").text("您总共输入了" + numbersArray.length + "张传票，用时" + timerLabel.text() + "秒。");
                    $("#userSum").text("您输入的总合计为: " + parseFloat(user_sum));
                    $("#expectedSum").text("而实际的总合计为: " + parseFloat(expected_sum));

                    if (user_sum === expected_sum) {
                        $("#compareResult").text("您的合计正确！具体如下：");
                    } else {
                        $("#compareResult").text("您的合计错误！具体如下：");

                    }
                    let tableBody = $("#compareTable tbody");

                    let incorrectNumber = 0;
                    for (let i = 0; i < numbersArray.length; i++) {
                        let u = parseFloat(userInputArray[i]);
                        let n = parseFloat(numbersArray[i]);
                        if (userInputArray[i] === numbersArray[i]) {
                            newRow = "<tr><td>" + u + "</td><td>" + n + "</td></tr>";
                        } else {
                            incorrectNumber += 1;
                            newRow = "<tr class='wrongRow'><td>" + u + "</td><td>" + n + "</td></tr>";
                        }

                        tableBody.append(newRow);
                    }

                    let historyArray = readHistory();
                    addToHistory(historyArray, formatter.format(new Date()), incorrectNumber.toString(), timerLabel.text());
                    $("#historyButton").css("display", 'block');
                }
            }
        }
    });

});

/**
 * 
 * @param {string[]} expectedArray 
 * @param {string[]} userInputArray 
 * @returns {string[]}
 */
function compareResults(expectedArray, userInputArray) {
    let expected_sum = 0;
    let user_sum = 0;

    // iterate over each item in the array
    for (let i = 0; i < expectedArray.length; i++) {
        expected_sum += parseFloat(expectedArray[i]);
        user_sum += parseFloat(userInputArray[i]);
    }
    return [stripNum(expected_sum), stripNum(user_sum)];
}