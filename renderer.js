

var numbersArray = []; // expected
var userInputArray = []; // user input
var intervalId = null;

function readInput() {

    fs.readFile('input.txt', 'utf8', (err, data) => {
        if (err) {
            console.error('Error reading "input.txt":', err);
        } else {
            numbersArray = data
                .trim()
                .split('\n')
                .map((line) => parseFloat(line));
        }
    });
}


function myTimer() {
    console.log('myTimer')
    const timerLabel = document.getElementById('timerLabel');
    timerLabel.textContent = parseInt(timerLabel.textContent) + 1;
}

$(document).ready(function () {
    $("#startButton").click(function () {
        console.log('start test')
        $('#testPanel').css("display", 'block');
        readInput();
        console.log("numbersArray: " + numbersArray);

        console.log('start timerLabel')

        const timerLabel = document.getElementById('timerLabel');
        timerLabel.textContent = '0';
        timerLabel.style.display = 'block';
        intervalId = setInterval(myTimer, 1000);

        $("#startButton").css("display", "none");
        $("#generateButton").css("display", "none");
        $("#exitButton").css("display", "block");
        $("#msg").css("visibility", 'hidden');
    });

    $("#exitButton").click(function () {
        console.log('exit test')
        numbersArray = [];
        userInputArray = [];
        $("#startButton").css("display", "block");
        $("#generateButton").css("display", "block");
        $("#exitButton").css("display", "none");
        $('#testPanel').css("display", 'none');
        $("#scoreBoard").css("display", 'none');
        clearInterval(intervalId);
        $("#compareTable tbody tr").remove();
        $("#countLabel").text("1");
    });


    $("#generateButton").click(function () {
        generateRandomInputFile();
        $("#msg").text("成功生成新的测试, 已保存至input.txt文件中。")
        $("#msg").css("visibility", 'visible');
    })



    $("#inputText").keyup((event) => {
        if (event.key === 'Enter') {
            let inputText = $('#inputText');
            const userNumber = parseFloat(inputText.val())
            inputText.val('');

            if (isNaN(userNumber)) {
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
                    $("#userSum").text("您输入的总合计为: " + user_sum);
                    $("#expectedSum").text("而实际的总合计为: " + expected_sum);

                    if (user_sum === expected_sum) {
                        $("#compareResult").text("您的结果正确！");
                    } else {
                        $("#compareResult").text("您的结果错误！具体错误如下：");

                    }
                    compareTable = $("#compareTable")
                    tableBody = $("#compareTable tbody");
                    for (let i = 0; i < numbersArray.length; i++) {
                        if (numbersArray[i] === userInputArray[i]) {
                            console.log("numbersArray[i]:", numbersArray[i])
                            console.log("userInputArray[i]:", userInputArray[i])
                            newRow = "<tr><td>" + userInputArray[i] + "</td><td>" + numbersArray[i] + "</td></tr>";
                        } else {
                            newRow = "<tr class='wrongRow'><td>" + userInputArray[i] + "</td><td>" + numbersArray[i] + "</td></tr>";
                        }

                        tableBody.append(newRow);
                    }
                }
            }
        }
    });

});

function compareResults(expectedArray, userInputArray) {
    let expected_sum = 0;
    let user_sum = 0;

    // iterate over each item in the array
    for (let i = 0; i < expectedArray.length; i++) {
        expected_sum += expectedArray[i];
        user_sum += userInputArray[i]
    }
    return [expected_sum, user_sum];
}