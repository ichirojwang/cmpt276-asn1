var btnAdd = document.querySelector('input[value="ADD ROW"]')
var btnMean = document.querySelector('input[value="MEAN"]')
var btnWeighted = document.querySelector('input[value="WEIGHTED"]')
var gradeInputs = document.querySelectorAll('input[name="grade-num"], input[name="grade-denom"]');

//updating percent in real time
//got assistance from chatbot to figure out how to update percent in real time
function addEventListeners() {
    var gradeInputs = document.querySelectorAll('input[name="grade-num"], input[name="grade-denom"]');
    gradeInputs.forEach(function(input) {
        input.addEventListener('input', function(evt) {
            updatePercent(evt);
        });
    });
}

addEventListeners()

//function for updating percent in real time
function updatePercent(evt) {

    var input = evt.target;
    var row = input.closest('tr');  //get closest table row

    //grab the numerator and denominator and convert to float
    var gradeNum = row.cells[3].querySelector('input[name="grade-num"]').value
    var gradeDenom = row.cells[3].querySelector('input[name="grade-denom"]').value

    //check if cell is empty
    if (gradeNum.trim() === '') {
        gradeNum = 0
    }
    else {
        gradeNum = parseFloat(gradeNum)
    }
    if (gradeDenom.trim() === '') {
        gradeDenom = 0
    }
    else {
        gradeDenom = parseFloat(gradeDenom)
    }

    //check if inputs are valid
    if (gradeDenom === 0 && gradeNum !== 0) {
        console.log("denominator cannot be zero")
        row.cells[4].textContent = ""
    }
    else if (isNaN(gradeNum) || isNaN(gradeDenom)) {
        console.log("invalid inputs in numerator or denominator")
        row.cells[4].textContent = ""
    }
    else if (gradeNum < 0 || gradeDenom < 0) {
        console.log("cannot be negative")
        row.cells[4].textContent = ""
    }
    //if cells were left empty, or user inputted both as zero
    else if (gradeNum === 0 && gradeDenom === 0) {
        console.log("both empty, do nothing")
        row.cells[4].textContent = ""
    }
    //once we have validated inputs, calculate
    else {
        console.log("calculating percent")
        row.cells[4].textContent = ((gradeNum/gradeDenom)*100).toFixed(2) + "%"
    }

}

//when user clicks add row
btnAdd.addEventListener('click', function(evt) {
    evt.preventDefault()
    addRow()
    addEventListeners()
}) 

//function for adding a row to our table
function addRow() {

    console.log('add')  //for testing

    var myTable = document.querySelector('table') //selecting table
    var newRow = myTable.insertRow()    //insert row

    var cells = []  //iterate to create cell vars
    for (let i = 0; i < 5; i++) {
        cells[i] = newRow.insertCell()
    }

    //get table height (minus header)
    var rowNum = myTable.rows.length - 1
    
    //add appropriate content to each cell
    cells[0].innerHTML = 'Activity ' +  rowNum
    cells[1].innerHTML = 'A' + rowNum
    cells[2].innerHTML = '<input name="weight" id="weight" type="text">'
    cells[3].innerHTML = '<input name="grade-num" id="grade-num" type="text"> / <input name="grade-denom" id="grade-denom" type="text">'
    cells[4].innerHTML = ''

}


//if user wants to calculate the mean of grades
btnMean.addEventListener('click', function(evt) {
    evt.preventDefault()
    calcMean()
}) 

//function to validate inputs and calculate mean
function calcMean() {

    console.log('mean') //for testing

    //selecting table and rows
    var myTable = document.querySelector('table')
    var myRows = myTable.getElementsByTagName('tr')
    //tracking sum of grades and total activities
    var sumGrades = 0
    var sumActivities = 0

    //for loop to iterate through each row
    for (let i = 1; i < myTable.rows.length; i++) {

        //grab the numerator and denominator and convert to float
        var gradeNum = myRows[i].cells[3].querySelector('input[name="grade-num"]').value
        var gradeDenom = myRows[i].cells[3].querySelector('input[name="grade-denom"]').value

        //check if cell is empty
        if (gradeNum.trim() === '') {
            gradeNum = 0
        }
        else {
            gradeNum = parseFloat(gradeNum)
        }
        if (gradeDenom.trim() === '') {
            gradeDenom = 0
        }
        else {
            gradeDenom = parseFloat(gradeDenom)
        }

        //check if inputs are valid
        if (gradeDenom === 0 && gradeNum !== 0) {
            console.log("denominator cannot be zero")
            alert("The denominator cannot equal zero.")
        }
        else if (isNaN(gradeNum) || isNaN(gradeDenom)) {
            console.log("invalid inputs in numerator or denominator")
            alert("Make sure to enter a number.")
        }
        else if (gradeNum < 0 || gradeDenom < 0) {
            console.log("cannot be negative")
            alert("Grades cannot be negative.")
        }
        //if cells were left empty, or user inputted both as zero
        else if (gradeNum === 0 && gradeDenom === 0) {
            console.log("both empty, do nothing")
            // myRows[i].cells[4].textContent = ""
        }
        //once we have validated inputs, calculate
        else {
            console.log("adding to sum of grades")
            var grade = gradeNum / gradeDenom
            // myRows[i].cells[4].textContent = (grade*100).toFixed(2) + "%"
            sumGrades += grade
            sumActivities++
        }

    }

    //if at least 1 activity has been filled in, then return the result
    if (sumActivities > 0) {
        var result = sumGrades/sumActivities*100
        console.log(result.toFixed(2))
        document.querySelector('.result').textContent = 'Mean of grades: ' + result.toFixed(2) + '%';
    }
    else {
        console.log(0)
        document.querySelector('.result').textContent = '';
        alert("The result could not be calculated.")
    }
}

btnWeighted.addEventListener('click', function(evt) {
    evt.preventDefault()
    calcWeighted()
}) 

function calcWeighted() {

    console.log('weighted')

    //selecting table and rows
    var myTable = document.querySelector('table')
    var myRows = myTable.getElementsByTagName('tr')
    //tracking sum of grades and total activities
    var sumGrades = 0
    var sumWeights = 0

    //for loop to iterate through each row
    for (let i = 1; i < myTable.rows.length; i++) {

        //grab the numerator and denominator and convert to float
        var gradeNum = myRows[i].cells[3].querySelector('input[name="grade-num"]').value
        var gradeDenom = myRows[i].cells[3].querySelector('input[name="grade-denom"]').value
        var weight = myRows[i].cells[2].querySelector('input[name="weight"]').value

        //check if cell is empty
        if (gradeNum.trim() === '') {
            gradeNum = 0
        }
        else {
            gradeNum = parseFloat(gradeNum)
        }
        if (gradeDenom.trim() === '') {
            gradeDenom = 0
        }
        else {
            gradeDenom = parseFloat(gradeDenom)
        }
        if (weight.trim() === '') {
            weight = 0
        }
        else {
            weight = parseFloat(weight)
        }

        //check if inputs are valid
        if (gradeDenom === 0 && gradeNum !== 0) {
            console.log("denominator cannot be zero")
            alert("The denominator cannot equal zero.")
        }
        else if (isNaN(weight) || weight < 0) {
            console.log("invalid inputs in the weight")
            alert("Please enter a valid number as the weight.")
        }
        else if (isNaN(gradeNum) || isNaN(gradeDenom)) {
            console.log("invalid inputs in numerator or denominator")
            alert("Make sure to enter a number as your grade.")
        }
        else if (gradeNum < 0 || gradeDenom < 0) {
            console.log("cannot be negative")
            alert("Grades cannot be negative.")
        }
        //if grades were left empty, or user inputted both as zero
        else if (gradeNum === 0 && gradeDenom === 0) {
            console.log("both empty, do nothing")
            // myRows[i].cells[4].textContent = ""
        }
        //once we have validated inputs, calculate
        else {
            console.log("adding to sum of weighted grades")
            var gradeWeighted = (gradeNum / gradeDenom) * weight
            // myRows[i].cells[4].textContent = (gradeWeighted*100).toFixed(2) + "%"
            sumGrades += gradeWeighted
            sumWeights += weight
        }

    }

    //if at least 1 activity has been filled in, then return the result
    if (sumWeights > 0) {
        var result = sumGrades/sumWeights*100
        console.log(result.toFixed(2))
        document.querySelector('.result').textContent = 'Weighted grade: ' + result.toFixed(2) + '%';
    }
    else {
        console.log(0)
        document.querySelector('.result').textContent = '';
        alert("The result could not be calculated.")
    }

}