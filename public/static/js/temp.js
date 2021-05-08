function getRandomResult() {
    return Math.floor(Math.random() * 100)+1;
}

function validationResult( randomNumber, playerNumber ) {
    console.log(`시스템 랜덤 숫자 : ${ randomNumber }`);
    console.log(`사용자 숫자 : ${ playerNumber }`);
    const descDom = document.querySelector(".desc-wrapper");
    
    if( randomNumber < playerNumber ){
        descDom.innerHTML = "Down!!";
    }else if( randomNumber > playerNumber ) {
        descDom.innerHTML = "UP!!";
    }else {
        descDom.innerHTML = "당첨!!";
        alert("술 한병 원샷하세용");
        return false;
    }
}

(function init() {
    const randomNumber = getRandomResult();
    
    // button Click event
    const resultButton = document.querySelector("#result-btn");
    resultButton.addEventListener("click", (e) => {
        // 사용자 번호 추출
        const resultInput = document.querySelector("#input");
        const value = resultInput.value;
        if( value < 0 || 100 < value ){
            alert("1~100 사이의 숫자만 입력하세요!!");
            return false;
        }
        resultInput.value = "";
        // 두 값 비교
        validationResult( randomNumber, value );
    });
})();