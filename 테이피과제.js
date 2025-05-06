class Game2048 {
    constructor(보드Id, scoreId, restartId) {
      this.보드 = document.getElementById(보드Id); 
      this.scoreDisplay = document.getElementById(scoreId); 
      this.restartBtn = document.getElementById(restartId); 
  
      this.tiles = []; // 숫자를 담을 배열 (칸 16개)
      this.score = 0; // 점수는 처음에 0점
  
      // 새 게임 버튼 누르면 init 함수 실행
      this.restartBtn.addEventListener("click", this.init.bind(this));
      //handleKey 함수 실행
      document.addEventListener("keydown", this.handleKey.bind(this));
  
      this.init();
    }
    // 게임시작하면 게임 처음 화면을 보여줌
    init() {
      for (let i = 0; i < 16; i++) {
        this.tiles[i] = 0;
      }
  
      this.score = 0; 
      this.updateScore();
  
      this.spawn(); 
      this.spawn(); 
  
      this.draw(); 
    }
    // 점수판에 점수를 보여줌
    updateScore() {
      this.scoreDisplay.textContent = this.score; 
    }
  
    draw() {
      this.보드.innerHTML = ""; //초기화 시킴
  
      for (let i = 0; i < 16; i++) {
        let tile = document.createElement("div"); // 칸 만들기
        tile.className = "tile"; //칸 모양
  
        if (this.tiles[i] !== 0) { // 0은 빈칸
          tile.textContent = this.tiles[i]; // 숫자 표시
          tile.classList.add("tile-" + this.tiles[i]); // 숫자마다 색 다름
        }
  
        this.보드.appendChild(tile); 
      }
    }
    // 빈칸을 기억하고 무작위로 2는 90% 4는 10%확율로 채워짐
    spawn() {
      let empty = []; 
  
      for (let i = 0; i < 16; i++) {
        if (this.tiles[i] === 0) {
          empty.push(i); 
        }
      }
  
      if (empty.length > 0) { 
        let randIndex = empty[Math.floor(Math.random() * empty.length)]; 
        if (Math.random() < 0.9) {
          this.tiles[randIndex] = 2; 
        } else {
          this.tiles[randIndex] = 4; 
        }
      }
    }
    // 방향키에 따라 움직임 실행
    handleKey(e) {
      
      if (e.key === "ArrowLeft") {
        this.move("left"); 
      } else if (e.key === "ArrowRight") {
        this.move("right");
      } else if (e.key === "ArrowUp") {
        this.move("up"); 
      } else if (e.key === "ArrowDown") {
        this.move("down");
      }
    }
    // 방향키에 따라 숫자들을 한 줄씩 꺼내 움직이게 하고 보드에 다시 넣고 움직였으면 새 숫자를 추가하고 화면과 점수를 갱신한다.
    move(direction) {
      let moved = false; 
  
      for (let i = 0; i < 4; i++) { 
        let line = []; 
  
        for (let j = 0; j < 4; j++) {
          let index = 0;
  
         
          if (direction === "left") {
            index = i * 4 + j;
          } else if (direction === "right") {
            index = i * 4 + (3 - j);
          } else if (direction === "up") {
            index = j * 4 + i;
          } else if (direction === "down") {
            index = (3 - j) * 4 + i;
          }
  
          line.push(this.tiles[index]); 
        }
  
        let newLine = this.merge(line); 
  
        for (let j = 0; j < 4; j++) {
          let index = 0;
  
         
          if (direction === "left") {
            index = i * 4 + j;
          } else if (direction === "right") {
            index = i * 4 + (3 - j);
          } else if (direction === "up") {
            index = j * 4 + i;
          } else if (direction === "down") {
            index = (3 - j) * 4 + i;
          }
  
          
          if (this.tiles[index] !== newLine[j]) {
            this.tiles[index] = newLine[j];
            moved = true;
          }
        }
      }
  
      if (moved) {
        this.spawn(); // 움직이면 새로운 숫자 생성
        this.draw(); // 다시 보여주기
        this.updateScore(); // 점수 업데이트
      }
    }
    // 같은 수가 만나면 합쳐지고 빈자리는 0으로 채워지는 로직
    merge(line) {
      let temp = [0, 0, 0, 0]; 
      let index = 0;
  
      for (let i = 0; i < 4; i++) {
        if (line[i] !== 0) {
          temp[index] = line[i];
          index++;
        }
      }
  
      for (let i = 0; i < 3; i++) {
        if (temp[i] === temp[i + 1] && temp[i] !== 0) {
          temp[i] = temp[i] * 2; 
          this.score += temp[i]; 
          temp[i + 1] = 0; 
        }
      }
  
      let result = [0, 0, 0, 0]; 
      index = 0;
  
      for (let i = 0; i < 4; i++) {
        if (temp[i] !== 0) {
          result[index] = temp[i]; 
          index++;
        }
      }
  
      return result; 
    }
  }
  
  // 버튼 누르면 시작됨
  new Game2048("보드", "score", "restart"); 
