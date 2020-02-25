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
	console.log('CLI 퀴즈에 오신것을 환영합니다.');
}

const study = () => {
	let desscription = '기본적인 commander 명령어에 대해 알아봅시다. \n ';
	console.log(desscription);
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