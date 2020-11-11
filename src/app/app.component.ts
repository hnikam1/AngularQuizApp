import { Component, OnInit, ViewChild } from '@angular/core';
import { Observable } from 'rxjs';
import { ModalDirective } from '../../node_modules/ngx-bootstrap';
import { QuestionClass } from './question-class';
import { ToastrService } from 'ngx-toastr';




@Component({
	selector: 'app-root',
	templateUrl: './app.component.html',
	styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
	isQuestionCardShow: boolean = false;
	totalAnswered: number = 0;
	rightAnswer: number;
	questionObj = new QuestionClass();
	@ViewChild('submitModal') submitModal: ModalDirective;
	@ViewChild('addQuestionModal') addQuestionModal : ModalDirective;
	@ViewChild('answerModal') answerModal : ModalDirective;
	@ViewChild('questionForm') questionForm: any;
	@ViewChild('questionTest') questionTest : any;

	constructor( private toastr: ToastrService) { }

	answerArray = [];

	allQuestions: any = [{
		"id": 1,
		"question": " _____ is used to find and fix bugs in the Java programs.",
		"a": "JVM",
		"b": "JRE",
		"c": "JDK",
		"d": "JDB",
		"answer": "d"
	},
	{
		"id": 2,
		"question": "What is the return type of the hashCode() method in the Object class?",
		"a": "Object",
		"b": "int",
		"c": "long",
		"d": "void",
		"answer": "b"
	},
	{
		"id": 3,
		"question": "In which memory a String is stored, when we create a string using new operator?",
		"a": "Stack",
		"b": "String memory",
		"c": "Heap memory",
		"d": "Random storage space",
		"answer": "c"
	}
	];

	/**Method call on submit the test */
	submitTest() {
		this.rightAnswer = 0;
		this.totalAnswered = 0;
		for (let i = 0; i < this.allQuestions.length; i++) {
			if ("selected" in this.allQuestions[i] && (this.allQuestions[i]["selected"] != null)) {
				this.totalAnswered++;
				if (this.allQuestions[i]["selected"] == this.allQuestions[i]["answer"]) {
					this.rightAnswer++;
				}
			}

		}
		this.submitModal.show();

	}

	startQuiz() {
		for (let i = 0; i < this.allQuestions.length; i++) {
			if ("selected" in this.allQuestions[i]) {
				delete this.allQuestions[i]["selected"];
			}

		}
		this.questionTest.reset();
		this.isQuestionCardShow = true;

	}
	HomePage() {
		this.isQuestionCardShow = false;
	}
	addQuestion(){
		this.addQuestionModal.show();
	}
	submitAddQuestion(){
		let quesTemp = JSON.parse(JSON.stringify(this.questionObj));
		quesTemp["id"] = this.allQuestions.length+1;
		this.allQuestions.push(quesTemp);
		this.questionForm.reset();
		this.toastr.success("Question Added Successfully!!");
		this.addQuestionModal.hide();

	}
	checkAnswers(){
		this.submitModal.hide();
		this.answerModal.show();
	}

	ngOnInit() {



	}

}
