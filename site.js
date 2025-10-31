
// import the utility functions "decodeHtml" and "shuffle"
import { decodeHtml, shuffle } from './utils.js' 

// get the elements from the DOM
const questionElement = document.querySelector('#question')
const answersElement = document.querySelector('#answers')
const nextQuestionElement = document.querySelector('#nextQuestion');

// IIFE (so we can use async/await)
(async () => {

	// todo: create your "getNextQuestion" function
	const getNextQuestion = async url => {
		// fetch data from the api
		url = 'https://opentdb.com/api.php?amount=1&category=21&difficulty=easy&type=multiple'
		const response = await fetch(url)
		// convert response to json and add to json variable
		const json = await response.json()
		// destructure json array variable
		const { question, correct_answer: correct, incorrect_answers: incorrect } = json.results[0]
		const answers = shuffle([ ...incorrect, correct ])
		return { question, answers, correct }
	}

	// todo: create your "renderQuestion" function
	const renderQuestion = ({ question, answers, correct }) => {
		// display question in paragraph element
		questionElement.textContent = decodeHtml(question)
		// clear any buttons inside answers div
		answersElement.innerHTML = ""
		// for loop to create a button with answers, add to the div, and add event listeners to seperate correct vs incorrect answers
		answers.forEach((answer) => {
			const button = document.createElement('button')
			answersElement.append(button)
			button.textContent = decodeHtml(answer)
			button.addEventListener('click', () => {
				if (answer === correct) {
					button.classList.add('correct')
					answersElement.querySelectorAll('button').forEach(b => b.disabled = true)
					alert('Correct!')
					return
				}
					button.disabled = true
					alert('Incorrect!')
			})	
		}) 		
	}

	// todo: add the event listener to the "nextQuestion" button
	nextQuestionElement.addEventListener('click', async () => {
		renderQuestion(await getNextQuestion())
		nextQuestionElement.disabled = true
		setTimeout(() => nextQuestionElement.disabled = false, 10000)
	})

})()

// mimic a click on the "nextQuestion" button to show the first question
nextQuestionElement.click()
