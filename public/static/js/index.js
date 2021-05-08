// start button click event 
const startButton = document.querySelector(".start-button");
startButton.addEventListener("click", async ( event ) => {
    startButton.textContent = "loading..";
    gameStart();
    // setTimeout(() => {
    //     gameStart();
    // }, 1000);
});

// 레이아웃 그리기
function redrawLayout() {
    const gameContainer = document.querySelector(".game-container");
    gameContainer.innerHTML=`
    <div class="game-header-container">
        <i id="exit-button" class="fas fa-chevron-left"></i>
        <span>UP&DOWN CHAT 🍻</span>
    </div>
    <div class="game-body-container">
        
    </div>
    <div class="game-bottom-container">
        <input id="player-value-input" placeholder="숫자를 입력하세요."/>
    </div>
    `;
}

// 랜덤 숫자 생성
function createRandomValue() {
    return Math.floor(Math.random() * 100) + 1;
}

// 안녕봇 메시지 출력
function createHelloBotMessage( message ) {
    const botChatDom = document.createElement("div");
    botChatDom.className = "left-chat-container";
    botChatDom.innerHTML = `
    <div class="message-container">
        <div class="avatar-container">
            <i class="fab fa-android"></i>
            <span>안녕봇</span>
        </div>
        <span class="content-container">
            ${ message }
        </span>
    </div>
    
    `;

    const gameBodyContainer = document.querySelector(".game-body-container");
    gameBodyContainer.appendChild( botChatDom );
}

// 플레이어 메시지 출력
function createPlayerMessage( message ) {
    const playerChatDom = document.createElement("div");
    playerChatDom.className = "right-chat-container";
    playerChatDom.innerHTML = `
    <div class="message-container">
        <!-- <div class="avatar-container">
            <span>플레이어</span>
        </div> -->
        <span class="content-container">
            ${ message }
        </span>
    </div>
    
    `;

    const gameBodyContainer = document.querySelector(".game-body-container");
    gameBodyContainer.appendChild( playerChatDom );
}

function createFinishRandomContent( ) {
    const imageArray = [
        {
            "img":"assets/img01.jpg",
            "comment":"걸렸닭, 너가 치킨 쏜닭 🥳"
        },
        {
            "img":"assets/img02.jpg",
            "comment":"소주한병 원샷 🙈"
        }
    ];

    const imageArrayRandomNum = Math.floor(Math.random() * imageArray.length);

    console.log(imageArray[imageArrayRandomNum]);

    return imageArray[imageArrayRandomNum];
}

// 플레이어가 작성한 숫자 받는 이벤트
function inputPlayerValueEvnet( randomValue ) {
    // 제한된 낮은 수
    let lowLimitValue = 0; 
    // 제한된 높은 수
    let highLimitValue = 101;

    // 인풋 체인지 이벤트
    const playerValueInput = document.querySelector("#player-value-input");
    playerValueInput.addEventListener("change", ( event ) => {
        console.log(`랜덤 숫자 : ${ randomValue }`);
        console.log(`플레이어 숫자 : ${ event.target.value }`);
        // input 박스
        const playerInput = event.target;
        // input 박스 값
        const playerValue = event.target.value;

        // 사용자 채팅 생성
        createPlayerMessage( playerValue );
        // 숫자가 아닌경우
        if(Number(playerValue) !== 0 && !Number(playerValue)){
            createHelloBotMessage("숫자만 입력할 수 있습니다.<br/>다시 입력해주세요. 🤨");
        }
        // 1 ~ 100 사이의 숫자가 아닌 경우( 사용자가 이전에 입력했던 값보다 낮거나, 높은 값 입력한 경우 ) 
        else if( playerValue <= lowLimitValue || playerValue >= highLimitValue){
            createHelloBotMessage(`${ Number(lowLimitValue) + 1 } ~ ${ Number(highLimitValue) - 1 } 사이의 값만 입력할 수 있어요.<br/>다시 입력해주세요. 😤`);
        }
        // 결과값보다 숫자가 클경우
        else if( playerValue > randomValue ){
            highLimitValue = playerValue;
            createHelloBotMessage(`DOWN 👎👎<br/>남은 경우의 수 : <strong>${ Number(lowLimitValue) + 1 } ~ ${ Number(highLimitValue) - 1 }</strong>`);
        }
        // 결과값보다 숫자가 작을 경우
        else if( playerValue < randomValue){
            lowLimitValue = playerValue;
            createHelloBotMessage(`UP 👍👍<br/>남은 경우의 수 : <strong>${ Number(lowLimitValue) + 1 } ~ ${ Number(highLimitValue) - 1 }</strong>`);
        }
        // 결과값 === 사용자 숫자
        else {
            const {img, comment} = createFinishRandomContent();
            console.log(img);
            console.log(comment);
            createHelloBotMessage(`<img src="${img}" alt="당첨 이미지">`);
            createHelloBotMessage(comment);
            createHelloBotMessage(`
            <button class="restart-button" onclick="gameStart();">재시작</button>
            <button class="home-button" onclick="location.href='/';">메인화면으로</button>
            `);
        }
        
        // 스크롤 맨 밑으로 내리기
        setTimeout(()=>{
            const gameBodyContainer = document.querySelector(".game-body-container");
            gameBodyContainer.scrollTop = document.body.scrollHeight;
            // input 초기화
            playerInput.value = "";
        }, 100);
    });
}

// 종료버튼 클릭 이벤트
function exitButtonClickEvent() {
    // exit button click event
    if( document.querySelector("#exit-button") ){
        const exitButton = document.querySelector("#exit-button");
        exitButton.addEventListener("click", ( event ) => {
            const result = confirm("게임을 종료하시겠습니까");
            if( result ) location.href = "/";
        });
    }
}

function gameStart() {
    redrawLayout();
    
    createHelloBotMessage("랜덤숫자를 생성중입니다..🎲 ");
    const randomValue = createRandomValue();
    createHelloBotMessage("랜덤숫자가 생성되었습니다.<br/>숫자를 입력해주세요!");

    inputPlayerValueEvnet( randomValue );

    exitButtonClickEvent();
}