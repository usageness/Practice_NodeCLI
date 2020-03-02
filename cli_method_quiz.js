const program = require('commander');
const inquirer = require('inquirer');
const chalk = require('chalk');

// *
// * CLI 메소드 퀴즈 프로그램
// *
// * 기본적인 CLI 메소드의 사용법을 공부해봅시다.
// *

const takeQuiz = () => {
	let score = 0;
	console.log('CLI 퀴즈에 오신것을 환영합니다. 아래 보기 중 정답을 골라주시면 됩니다.\n');
	
	inquirer.prompt([{
		type: 'list',
		name: 'menu',
		message: '준비되셨나요?',
		choices: ['예', '아니요'],
	}])
	.then((answers) => {
		quizSelected(answers.menu);
	})
	
	const calculate = (answers) => {
		let finalscore = 0;
		if(answers.q1 === 'commander') finalscore += 1;
		if(answers.q2 === 'version') finalscore += 1;
		if(answers.q3 === 'usage') finalscore += 1;
		if(answers.q4 === 'description') finalscore += 1;
		if(answers.q5 === 'alias') finalscore += 1;
		if(answers.q6 === 'option') finalscore += 1;
		if(answers.q7 === 'action') finalscore += 1;
		return finalscore;
	}
	
	const quizSelected = (menu) => {
		if (menu === '예') {
			console.clear();
			inquirer.prompt([{
				type: 'list',
				name: 'q1',
				message: 'Q1. commander의 프로그램 실행문을 지정하는 명령어는?',
				choices: ['execute', 'commander'],
			}, {
				type: 'list',
				name: 'q2',
				message: 'Q2. commander의 프로그램 버전을 확인하는 명령어는?',
				choices: ['version', 'bersion'],
			}, {
				type: 'list',
				name: 'q3',
				message: 'Q3. commander의 사용법을 작성하는 명령어는?',
				choices: ['howto', 'usage'],
			}, {
				type: 'list',
				name: 'q4',
				message: 'Q4. commander의 명렁어 설명을 작성하는 명령어는?',
				choices: ['script', 'description'],
			}, {
				type: 'list',
				name: 'q5',
				message: 'Q5. commander의 프로그램 실행 명령어의 약어를 지정하는 명령어는?',
				choices: ['vision', 'alias'],
			}, {
				type: 'list',
				name: 'q6',
				message: 'Q6. commander의 기능을 명명하는 명령어는?',
				choices: ['option', 'operation'],
			}, {
				type: 'list',
				name: 'q7',
				message: 'Q7. commander의 명령어 실행 내용을 작성하는 명령어는?',
				choices: ['behaivor', 'action'],
			}])
			.then((answers) => {
				console.clear();
				score = calculate(answers);
				console.log("당신의 점수는 " + chalk.green(score) + "점 입니다!");
			})
		}else if (menu === '아니요') {
			console.clear();
			inquirer.prompt([{
				type: 'list',
				name: 'menu',
				message: '메뉴를 선택하세요.',
				choices: ['공부 하기', '퀴즈 풀기'],
			}])
			.then((answers) => {
				console.log(chalk.green(answers.menu) + "를 선택하셨습니다.");
				selected(answers.menu);
			})
		}
	}
}

const study = () => {
	let description = '\n기본적인 commander 명령어에 대해 알아봅시다.\n\n.command : 실행 명령어\n.version : 프로그램의 버젼\n.usage : 사용법\n.description : 해당 명령어 설명\n.alias : 별명, 이 프로그램을 실행하는 명령어의 약어\n.option : 기능 명령어\n.action : 실행 내용\n';
	console.log(description);
	
	inquirer.prompt([{
		type: 'list',
		name: 'menu',
		message: '메뉴를 선택하세요.',
		choices: ['공부 하기', '퀴즈 풀기'],
	}])
	.then((answers) => {
		console.log(chalk.green(answers.menu) + "를 선택하셨습니다.");
		selected(answers.menu);
	})
}

const selected = (menu) => {
	if (menu === '퀴즈 풀기') {
		takeQuiz();
	}else if (menu === '공부 하기') {
		study();
	}
}

let triggered = false;

program
	.version('0.1', '-v, --version')
	.usage('[options]')
	.command('quiz')
	.action(() => {
		triggered = true;
	});

program.parse(process.argv);

if(!triggered) {
	inquirer.prompt([{
		type: 'list',
		name: 'menu',
		message: 'CLI에 오신것을 환영합니다. 메뉴를 선택하세요.',
		choices: ['공부 하기', '퀴즈 풀기'],
	}])
	.then((answers) => {
		console.log(chalk.green(answers.menu) + "를 선택하셨습니다.");
		selected(answers.menu);
	})
}