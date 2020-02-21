/*

CLI 프로그램에 필요한 기본적인 메소드들 입니다.

readline : input을 읽어주는 모듈
readline.question : 사용자의 입력을 기다림
readline.close : 해당 파일을 종료함
console.clear : 콘솔창의 내용을 모두 지움

*/

const readline = require('readline');

const rl = readline.createInterface({
	input: process.stdin,
    output: process.stdout,
});

console.clear();
const answerCallback = (answer) => {
    if (answer === 'y') {
    	console.log('감사합니다');
        rl.close();
    }else if (answer === 'n') {
    	console.log('죄송합니다');
        rl.close();
    }else {
    	console.clear();
    	console.log('y 또는 n만 입력하세요');
        rl.question('예제가 재미있습니까? (y/n)', answerCallback);
    }
};

rl.question('예제가 재미있습니까? (y/n)', answerCallback);