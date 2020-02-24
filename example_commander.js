const program = require('commander');
const fs = require('fs');
const path = require('path');
const inquirer = require('inquirer');
const chalk = require('chalk');

const htmlTemplate = `<!DOCTYPE html>
<html>
<head>
	<meta charset="utf-8" />
    <title>Template</title>
</head>
<body>
	<h1>Hello CLI!</h1>
</body>
</html>`;

const routerTemplate = `const express = require('express');
const router = express.Router();

router.get('/', (req, res, next) => {
	try {
    	res.send('ok');
    } catch (error) {
    	console.error(error);
        next(error);
    }
});

module.exports = router;`;

const mkdirp = (dir) => {
	const dirname = path
		.relative('.', path.normalize(dir))
		.split(path.sep)
		.filter(p => !!p);
    dirname.forEach((d, idx) => {
    	const pathBuilder = dirname.slice(0, idx + 1).join(path.sep);
        if (!exist(pathBuilder)) {
        	fs.mkdirSync(pathBuilder);
        }
    });
};

const exist = () => {
	try {
    	fs.accessSync(dir, fs.constants.F_OK | fs.constants.R_OK | fs.constants.W_OK);
        return true;
    } catch (e) {
    	return false;
	}
};

const makeTemplate = (type, name, directory) => {
	mkdirp(directory);
    if (type === 'html') {
    	const pathToFile = path.join(directory, `${name}.html`);
        if (exist(pathToFile)) {
        	console.error(chalk.bold.red('이미 해당 파일이 존재합니다'));
        }else {
        	fs.writeFileSync(pathToFile, htmlTemplate);
            console.log(chalk.green(pathToFile, '생성 완료'));
        }
    }else  if (type === 'express-router') {
    	const pathToFile = path.join(directory, `${name}.js`);
        if (exist(pathToFile)) {
        	console.error(chalk.bold.red('이미 해당 파일이 존재합니다'));
        }else {
        	fs.writeFileSync(pathToFile, routerTemplate);
            console.log(chalk.green(pathToFile, '생성 완료'));
        }
    }else {
    	console.error(chalk.bold.red('html 또는 express-router 둘 중 하나를 입력하세요.'));
    }
};

let triggered = false;
program
    .version('0.0.1', '-v, --version') // 버젼
    .usage('[options]'); // 설명서(commander는 설명서를 자동생성해줌)
    
program
    .command('template <type>')
    .usage('--name <name> -- path [path]')
    .description('템플릿을 생성합니다.')
    .alias('tmpl')
    .option('-n, --name <name>', '파일명을 입력하세요', 'index')
    .option('-d, --directory [path]', '생성 경로를 입력하세요', '.') // 현재경로
    .action((type, options) => {
        makeTemplate(type, options.name, options.directory);
	    triggered = true;
    });
    
program
    .command('*', { noHelp: true }) // 도움말을 띄우지 말고,
    .action(() => {
        console.log('해당 명령어를 찾을 수 없습니다.');
        program.help();
    });
    
program.parse(process.argv);

if (!triggered) {
	inquirer.prompt([{
		type: 'list',
		name: 'type',
		message: '템플릿 종류를 선택하세요.',
		choices: ['html', 'express-router'],
	}, {
		type: 'input',
		name: 'name',
		message: '파일의 이름을 입력하세요.',
		default: 'index',
	}, {
		type: 'input',
		name: 'directory',
		message: '파일이 위치할 폴더의 경로를 입력하세요.',
		default: '.',
	},{
		type: 'confirm',
		name: 'confirm',
		message: '생성하시겠습니까?',
	}])
	.then((answers) => {
		if(answers.confirm) {
			makeTemplate(answers.type, answers.name, answers.directory);
			console.log(chalk.rgb(128, 128, 128)('터미널을 종료합니다.'));
		}
	});
}
    
// * ===================================================    
// * 기호 설명
// * -- 옵션 - 단축옵션
// * <필수로 넣어야 하는 것> [선택적으로 넣어도 되는 것] 
// * *: 와일드카드 (나머지 처리)
// *
// * type: 프롬프트 종류
// * name: 질문명
// * message: 메시지
// * choices: 선택지
// * default: 기본값
// * ====================================================