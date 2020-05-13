var score = 0;
var studentAnswers = '';

function updateStorage() {
	/*
	localStorage.setItem("ID","123");
	*/
}

function isEnter(e, question) {
	if (e.keyCode == 13) {
		check_code(question);
	}
}

function isFirstCheck (page) {
	var IDP = localStorage.getItem("ID") + page;
	alert (IDP);
	
	if (localStorage.getItem(IDP) === null) {
		localStorage.setItem(IDP, "+");
		return true;
	} else {
		alert("תשובותיך לדף זה כבר נשלחו בעבר.");
		return false;
	}	
}

function check_answers (page, fromQ, toQ) {
	/*
	if (!isFirstCheck(page)) {
		return;
	}
	*/
	for (let q=fromQ; q<=toQ; q++) {
		var question = 'q' + q;
		
		switch (questions_data[page][question].questionType) {
		case '':
			continue;
			break;
		
		case 'number':
			check_number(page, question);
			break;
	
		case 'radio':
			check_radio(page, question,questions_data[page][question].addInfo);
			break;
		
		case 'select': 
			check_select(page, question);
			break;
		
		case 'code': 
			check_code(page, question);
			break;
		
		case 'text':
			check_text(page, question);
			break;
			
		case 'p2q11':
			check_p2q11(page, question);
			break;
		}
	}
	
	var IDP = localStorage.getItem("ID") + page;
	localStorage.setItem(IDP + "S", score);
	localStorage.setItem(IDP + "R", studentAnswers);
	
	alert (studentAnswers + score);
}

function check_number(page, question) {
	var ansField = document.getElementById(question);
	var ans = ansField.value;
	
	if (ans == questions_data[page][question].answer) {
		ansField.classList.add("correct");
		score += questions_data[page][question].score;
	} else {
		ansField.classList.add("wrong");
	}
	studentAnswers += "<" + question + " - " + ans + ">\n";
	ansField.disabled = true;
}

function check_radio(page, question, groupName) {
	var radioButtons = document.getElementsByName(groupName);
	var foundAnswer = false;
	
	for (let btn in radioButtons) {
		if (radioButtons[btn].checked) {
			foundAnswer = true;
			var ans = radioButtons[btn].value;

			if (ans == questions_data[page][question].answer) {
				score += questions_data[page][question].score;
			}
			document.getElementById("img"+question+btn).style.visibility = 'visible';
		} 
		
		radioButtons[btn].disabled = true;
	}
		
	if (!foundAnswer) {
			document.getElementById("img"+question).style.visibility = 'visible';
	}
	
	studentAnswers += "<" + question + " - " + ans + ">\n";
}

function check_select(page, question) {
	var ansField = document.getElementById(question);
	if (ansField == null) {
		studentAnswers += "<" + question + " - no answer >\n";
		return;
	}
	
	var ans = ansField.value;
		
	if (ans == questions_data[page][question].answer) {
		score += questions_data[page][question].score;
		ansField.classList.add("correct");
	} else {
		ansField.classList.add("wrong");
	}
	ansField.disabled = true;
	
	studentAnswers += "<" + question + " - " + ans + ">\n";
}

function check_code (page, question) {
	var ansField = document.getElementById(question);
	if (ansField == null) {
		studentAnswers += "<" + question + " - no answer >\n";
		return;
	}
	var ans = ansField.value;
	
	// remove spaces from student's answer
	ans = ans.trim().replace(/\s\s+/g, ' ');
	ansField.value = ans;
	
	if (ans == questions_data[page][question].answer) {
		score += questions_data[page][question].score;
		ansField.classList.add("correct");
	} else {
		ansField.classList.add("wrong");
	}

	ansField.disabled = true;
	
	studentAnswers += "<" + question + " - " + ans + ">\n";
}

function check_text (page, question) {
	var ansField = document.getElementById(question);
	if (ansField == null) {
		studentAnswers += "<" + question + " - no answer >\n";
		return;
	}
	var ans = ansField.value;
	ans = ans.trim();
	ansField.value = ans;
	
	if (ans == questions_data[page][question].answer) {
		score += questions_data[page][question].score;
		ansField.classList.add("correct");
	} else {
		ansField.classList.add("wrong");
	}

	ansField.disabled = true;
	
	studentAnswers += "<" + question + " - " + ans + ">\n";
}

function check_p2q11 (page, question) {
	var ansField = document.getElementById(question);
	if (ansField == null) {
		studentAnswers += "<" + question + " - no answer >\n";
		return;
	}
	var ans = ansField.value;
	ans = ans.trim();
	ansField.value = ans;
	ans = ans.split(" ");
	
	if (ans.length == 3 && ans[0]=="Hello" && ans[1]==ans[2]) {
		score += questions_data[page][question].score;
		ansField.classList.add("correct");
	} else {
		ansField.classList.add("wrong");
	}

	ansField.disabled = true;
	
	studentAnswers += "<" + question + " - " + ans + ">\n";
}
