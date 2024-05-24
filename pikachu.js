// 21130506_Nguyễn_Ngọc_Quý_0931089737_DH21DTC
// Mảng chứa đường dẫn của các hình ảnh
const imagePaths = [
  "./imgPikachu/pieces1.png",
  "./imgPikachu/pieces2.png",
  "./imgPikachu/pieces3.png",
  "./imgPikachu/pieces4.png",
  "./imgPikachu/pieces5.png",
  "./imgPikachu/pieces6.png",
  "./imgPikachu/pieces7.png",
  "./imgPikachu/pieces8.png",
  "./imgPikachu/pieces9.png",
  "./imgPikachu/pieces10.png",
  "./imgPikachu/pieces11.png",
  "./imgPikachu/pieces12.png",
  "./imgPikachu/pieces13.png",
  "./imgPikachu/pieces14.png",
  "./imgPikachu/pieces15.png",
  "./imgPikachu/pieces16.png",
  "./imgPikachu/pieces17.png",
  "./imgPikachu/pieces18.png",
  "./imgPikachu/pieces19.png",
];

// số hàng và số cột qui định
let numCols = 12;
let numRows = 9;

// Lấy ra board
const board = document.querySelector(".board");

// thiết lập lại kích thước của board khi biết số hàng và cột
board.style.width = numCols * 48 + "px";
board.style.height = numRows * 48 + "px";

// Tạo và thêm các div vào trong board
for (let row = 1; row <= numRows; row++) {
  for (let col = 1; col <= numCols; col++) {
    const cell = document.createElement("div");
    cell.className = "cell";
    cell.id = ((row - 1) * numCols + col).toString();
    cell.textContent = "1";
    board.appendChild(cell);
  }
}
//Mảng các ô trong board
let cells = document.querySelectorAll(".cell");
function initializeBoardUI() {
  let leftOffset = 0;
  let topOffset = 0;
  let cellCount = 0;
  // xếp các vị trí cho thẻ khi dùng absoluted
  cells.forEach((cell, i) => {
    cell.style.left = leftOffset + "px";
    cell.style.top = topOffset + "px";
    leftOffset += 48; // Tăng giá trị left thêm 48px
    cellCount++;
    if (cellCount >= numCols) {
      // Nếu đã vẽ đủ số cột trong hàng
      topOffset += 48; // Di chuyển xuống dòng mới
      leftOffset = 0; // Reset left về 0
      cellCount = 0; // Reset số lượng ô đã vẽ
    }
  });
}

// hàm chuyển đổi từ vị trí trên ma trận thành các ô trên board
function convertMatrixToCell(x, y) {
  // x, y là tọa độ tương ứng
  return cells[numCols * (x - 1) + (y - 1)];
}
// chuyển đổi về ma trận
let matrix = [];
for (let i = 0; i < numRows + 2; i++) {
  matrix[i] = [];
  for (let j = 0; j < numCols + 2; j++) {
    if (i === 0 || i === numRows + 1 || j === 0 || j === numCols + 1) {
      matrix[i][j] = "0";
    } else {
      matrix[i][j] = convertMatrixToCell(i, j).textContent;
    }
  }
}
console.log(matrix);

// các đối tượng liên quan đến âm thanh nền trong game
let soundButton = document.getElementById("soundButton");
let volumeIcon = document.getElementById("volumeIcon");
let isMuted = false;
let audioBackground = document.getElementById("myAudio");

// bật tắt âm thanh nền qua icon
soundButton.addEventListener("click", function () {
  isMuted = !isMuted;
  if (isMuted) {
    audioBackground.pause();
    volumeIcon.classList.add("muted");
  } else {
    audioBackground.play();
    volumeIcon.classList.remove("muted");
  }
});

// phát lại audio khi đã kết thúc
audioBackground.addEventListener("ended", function () {
  this.currentTime = 0; // Quay lại thời gian ban đầu
  this.play();
});
audioBackground.volume = 0.3; // setup âm lượng nền

// Âm thanh của button và các đối tượng trong game
let soundBtn = document.querySelector(".soundBtn"); // nút play
let soundCell = document.querySelector(".soundCell"); // các thẻ chọn
let soundWrongChoose = document.querySelector(".wrongChoose"); // khi chọn sai
let soundTrueChoose = document.querySelector(".trueChoose"); // khi chọn đúng
let victory = document.querySelector(".victory"); // khi chiến thắng
soundTrueChoose.volume = 0.5;
soundWrongChoose.volume = 0.5;

// Bắt đầu game bằng nút play
let interface = document.querySelector(".interface"); // giao diện nền trước khi bắt đầu game
let board_guide = document.querySelector(".board_guide"); // bảng thông tin và hướng dẫn trò chơi
let board_pause = document.querySelector(".board_pause"); // bảng tạm dừng
let board_lose = document.querySelector(".board_lose"); // bảng điểm sau khi hết thời gian chơi
let board_win = document.querySelector(".board_win"); // bảng thông báo chiến thắng trò chơi
let btnClose = board_guide.querySelector("button"); // nút thoát khỏi bảng hướng dẫn
let opacity_bgk = document.querySelector(".opacity_bgk"); // nền phụ giúp làm nổi bậc bảng hướng dẫn
let opacity_bgk1 = document.querySelector(".opacity_bgk1"); // nền phụ giúp làm nổi bậc bảng điểm/ bảng pause
let opacity_bgk2 = document.querySelector(".opacity_bgk2"); // nền phụ giúp làm nổi bậc bảng win game
let btn_start = document.querySelector(".btn_start"); // nút play bắt đầu khởi tạo game
let btn_guide = document.querySelector(".btn_guide"); // nút guide đê mở bảng thông tin và hướng dẫn trò chơi
let board_guide_lv4 = document.querySelector(".board_guide_lv4"); // bảng thông tin về level hiện tại
let board_guide_lv5 = document.querySelector(".board_guide_lv5"); // bảng thông tin về level hiện tại
let board_guide_lv6 = document.querySelector(".board_guide_lv6"); // bảng thông tin về level hiện tại
let imgGuide = document.querySelector(".imgGuide");

let timeline = document.querySelector(".timeline");
let currentWidth = parseFloat(window.getComputedStyle(timeline).width);
let targetWidth = 0; // giữ giá trị hiện tại của timeline sau khi update (-1px)
btn_start.addEventListener("click", function () {
  soundBtn.play();
  audioBackground.play();
  volumeIcon.classList.remove("muted");
  imgGuide.style.display = "block";
  setTimeout(() => {
    interface.style.display = "none"; // ẩn nền đi
    infBtn.style.display = "none"; // ẩn about me
    initializeGame(); // hàm khởi tạo game
  }, 100);
});
btn_guide.addEventListener("click", function () {
  soundBtn.play();
  setTimeout(() => {
    board_guide.style.display = "block";
    opacity_bgk.style.display = "block";
  }, 100);
});
btnClose.addEventListener("click", function () {
  soundBtn.play();
  setTimeout(() => {
    board_guide.style.display = "none";
    opacity_bgk.style.display = "none";
    if (interface.style.display == "none") {
      opacity_bgk1.style.display = "block";
      board_pause.style.display = "block";
    }
  }, 100);
});
let infBoard = document.querySelector(".opacity_bgk0");
let infBtn = document.getElementById("infBtn");
infBtn.onclick = function () {
  soundBtn.play();
  infBoard.style.display = "block";
};
window.onclick = function (event) {
  if (event.target == infBoard) {
    infBoard.style.display = "none";
  }
  if (event.target == opacity_bgk) {
    board_guide.style.display = "none";
    opacity_bgk.style.display = "none";
  }
  if (event.target == imgGuide) {
    imgGuide.style.display = "none";
  }
};

// hàm ràng buộc điều kiện khi nào mới được reload nếu còn nhiều qá thì không reload
// function conditionReload() {
//   let reload = reloads[0];
//   //   let remainCell = 0;
//   //   // chạy lại để lấy số lượng thẻ còn lại (total phải luôn chẵn)
//   //   cells.forEach((cell) => {
//   //     if (cell.style.visibility !== "hidden") remainCell += 1;
//   //   });
//   //   if (remainCell > 80) {
//   //     reload.style.color = "rgba(0,0,0,0.5)";
//   //     reload.style.cursor = "auto";
//   //     reload.setAttribute("title", "không được thay đổi");
//   //     reload.removeEventListener("click", reRenderBoardIMG);
//   //   } else {
//   reRenderBoardIMG;
//   //   }
// }

// hàm tìm kiếm cặp thẻ đầu tiên trong bảng để gợi ý
function help() {
  let currentRemainCell = [];
  let foundPath = false;
  cells.forEach((cell) => {
    if (cell.style.visibility !== "hidden") {
      currentRemainCell.push(cell);
    }
  });
  for (let i = 0; i < currentRemainCell.length - 1; i++) {
    if (foundPath) {
      break;
    }
    for (let j = i + 1; j < currentRemainCell.length; j++) {
      let x1 =
        Math.floor(
          (parseInt(currentRemainCell[i].getAttribute("id")) - 1) / numCols
        ) + 1;
      let y1 =
        ((parseInt(currentRemainCell[i].getAttribute("id")) - 1) % numCols) + 1;
      let x2 =
        Math.floor(
          (parseInt(currentRemainCell[j].getAttribute("id")) - 1) / numCols
        ) + 1;
      let y2 =
        ((parseInt(currentRemainCell[j].getAttribute("id")) - 1) % numCols) + 1;
      if (
        currentRemainCell[i].style.backgroundImage ===
          currentRemainCell[j].style.backgroundImage &&
        findPath(x1, y1, x2, y2) !== null
      ) {
        console.log("found new path");
        currentRemainCell[i].style.opacity = "0.6";
        currentRemainCell[j].style.opacity = "0.6";
        currentRemainCell[i].style.outline = "5px solid rgba(96, 231, 84, 0.8)";
        currentRemainCell[j].style.outline = "5px solid rgba(96, 231, 84, 0.8)";
        foundPath = true;
        break;
      }
    }
  }
  if (!foundPath) {
    reRenderBoardIMG();
  }
}
// hàm thay đổi trạng thái khi click reload board khi đủ điều kiện
function canReload() {
  numHelp.textContent = "5";
  numReload.textContent = "5";
  opacity_bgk1.style.display = "none";
  board_lose.style.display = "none";
  opacity_bgk2.style.display = "none";
  board_win.style.display = "none";
  board_guide_lv4.style.display = "none";
  board_guide_lv5.style.display = "none";
  board_guide_lv6.style.display = "none";
  updateCellIds();
  initializeBoardIMG();
  initializeScore();
  restoreBoard();
  resetTimeline();
  resetButtonLevel();
  checkLevel();
  initializeTimeLine();
}

//header
let pause = document.querySelector(".fa-pause");
let houses = document.querySelectorAll(".fa-house");
let resume = document.querySelector(".fa-play");
let tip = document.querySelector(".fa-lightbulb");
let numHelp = document.querySelector(".numHelp");
let bookGuide = document.querySelector(".fa-book-tanakh");
let reloads = document.querySelectorAll(".fa-rotate-left");
let numReload = document.querySelector(".numReload");
tip.addEventListener("click", function () {
  numHelp.textContent = parseFloat(numHelp.textContent) - 1;
  if (parseFloat(numHelp.textContent) > 0) {
    help();
  } else {
    tip.style.cursor = "auto";
    tip.style.color = "rgba(0,0,0,0.5)";
    tip.setAttribute("title", "Hết lượt gợi ý");
    numHelp.textContent = 0;
  }
});
reloads.forEach((reload) => {
  if (
    reload.parentNode.className == "board_lose" ||
    reload.parentNode.className == "board_win"
  ) {
    reload.addEventListener("click", canReload);
  } else {
    reload.addEventListener("click", function () {
      numReload.textContent = parseFloat(numReload.textContent) - 1;
      if (parseFloat(numReload.textContent) > 0) {
        reRenderBoardIMG();
      } else {
        reload.style.cursor = "auto";
        reload.style.color = "rgba(0,0,0,0.5)";
        reload.setAttribute("title", "không được thay đổi");
        numReload.textContent = 0;
      }
    });
  }
});
pause.addEventListener("click", function () {
  soundBtn.play();
  opacity_bgk1.style.display = "block";
  board_pause.style.display = "block";
  stopTimeLine();
});
houses.forEach((house) => {
  house.addEventListener("click", function () {
    soundBtn.play();
    audioBackground.pause();
    opacity_bgk1.style.display = "none";
    opacity_bgk2.style.display = "none";
    board_pause.style.display = "none";
    board_win.style.display = "none";
    interface.style.display = "block";
    infBtn.style.display = "block";
    board_guide_lv4.style.display = "none";
    board_guide_lv5.style.display = "none";
    board_guide_lv6.style.display = "none";
  });
});
resume.addEventListener("click", function () {
  soundBtn.play();
  opacity_bgk1.style.display = "none";
  board_pause.style.display = "none";
  if (running == false) {
    running = true;
    initializeTimeLine();
  }
});
bookGuide.addEventListener("click", function () {
  soundBtn.play();
  board_pause.style.display = "none";
  board_guide.style.display = "block";
});

// sự kiện đổi level thủ công
let listBtnLevel = document.querySelectorAll(".btn");

// sự kiện click vào nút chọn level và chuyển tới level và mức chơi mới
function resetButtonLevel() {
  firstClicked = null;
  listBtnLevel.forEach((btn) => {
    if (btn.classList.contains("btn-level1")) {
      btn.classList.add("choosed");
    } else {
      btn.classList.remove("choosed");
    }
    btn.addEventListener("click", function () {
      numHelp.textContent = "5";
      tip.style.cursor = "pointer";
      tip.style.color = "white";
      tip.setAttribute("title", "Gợi ý");
      numReload.textContent = "5";
      reloads[0].style.color = "white";
      reloads[0].style.cursor = "pointer";
      reloads[0].setAttribute("title", "Thay đổi");
      listBtnLevel.forEach((otherBtn) => {
        otherBtn.classList.remove("choosed");
      });
      btn.classList.add("choosed");
      if (
        btn.classList.contains("btn-level4") ||
        btn.classList.contains("btn-level5") ||
        btn.classList.contains("btn-level6")
      ) {
        if (btn.classList.contains("btn-level6")) {
          countCheckTrue = 0;
          initializeBoardIMGOfLevel5(16);
          board_guide_lv6.style.display = "block";
          board_guide_lv5.style.display = "none";
          board_guide_lv4.style.display = "none";
        } else {
          if (btn.classList.contains("btn-level4")) {
            board_guide_lv4.style.display = "block";
            board_guide_lv5.style.display = "none";
            board_guide_lv6.style.display = "none";
          } else {
            board_guide_lv5.style.display = "block";
            board_guide_lv4.style.display = "none";
            board_guide_lv6.style.display = "none";
          }
          initializeBoardIMGOfLevel5(10);
        }
      } else {
        board_guide_lv5.style.display = "none";
        board_guide_lv4.style.display = "none";
        board_guide_lv6.style.display = "none";
        initializeBoardIMG();
      }
      initializeBoardUI();
      initializeScore();
      restoreBoard();
      resetTimeline();
      initializeTimeLine();
      checkLevel();
      updateCellIds();
    });
  });
}

// thiết lập lại các giá trị của thời gian, điểm, hình ảnh của trò chơi
function setUpNextLevel() {
  if (currentLevel === "4" || currentLevel === "5" || currentLevel === "6") {
    if (currentLevel === "6") {
      countCheckTrue = 0;
      initializeBoardIMGOfLevel5(16);
      board_guide_lv6.style.display = "block";
      board_guide_lv5.style.display = "none";
    } else {
      if (currentLevel === "4") {
        board_guide_lv4.style.display = "block";
      } else {
        board_guide_lv5.style.display = "block";
        board_guide_lv4.style.display = "none";
      }
      initializeBoardIMGOfLevel5(10);
    }
  } else {
    initializeBoardIMG();
  }
  initializeBoardUI();
  restoreBoard();
  resetTimeline();
  initializeTimeLine();
  checkLevel();
  updateCellIds();
}

// Điểm
let score = document.querySelector(".score");
let loseScore = document.querySelector(".loseScore");

// check level ?
let currentLevel;
function checkLevel() {
  listBtnLevel.forEach((btn) => {
    if (btn.classList.contains("choosed")) {
      console.log("checklevel " + btn.getAttribute("id"));
      setListenerFromLevel(btn.getAttribute("id"));
      currentLevel = btn.getAttribute("id");
    } else {
      console.log("errrorrr !!");
    }
  });
}

// thiết lập tự động đổi level khi đã hoàn thành level hiện tại dựa vào điểm số
function autoIncreaseLevel() {
  console.log("current :: : : : : :" + currentLevel);
  let nextForeach = true;
  listBtnLevel.forEach((btn, index) => {
    if (nextForeach) {
      let currentScore = parseInt(score.textContent);
      if (
        currentLevel == parseInt(btn.getAttribute("id")) - 1 &&
        currentScore >= 54 * 10
      ) {
        listBtnLevel.forEach((otherBtn) => {
          otherBtn.classList.remove("choosed");
        });
        btn.classList.add("choosed");
        currentLevel = btn.getAttribute("id");
        numHelp.textContent = parseFloat(numHelp.textContent) + 5;
        numReload.textContent = parseFloat(numReload.textContent) + 5;
        setUpNextLevel();
        setListenerFromLevel(parseInt(currentLevel) + 1);
        nextForeach = false;
      }
    }
  });
  //   if (parseInt(currentLevel) == 6) {
  //     console.log("................win................");
  //     checkWinEndGame();
  //   }
}

function checkWinEndGame() {
  victory.play();
  opacity_bgk2.style.display = "block";
  board_win.style.display = "block";
}

function handleCellClick(event) {
  let clickedCell = event.target;
  let level = currentLevel;
  soundCell.play();
  // tính toán tọa độ hàng và cột dựa trên ID của cell
  // nên khi tăng level sẽ phải setup lại ID nếu ko sẽ sai toạ độ hàng và cột được click
  let cellId = parseInt(clickedCell.getAttribute("id"));
  let row = Math.floor((cellId - 1) / numCols) + 1;
  let col = ((cellId - 1) % numCols) + 1;
  // let row = (Math.floor((index) / numCols)) + 1;
  // let col = ((index) % numCols) + 1;
  clickedCell.classList.toggle("clicked");
  if (firstClicked === null) {
    firstClicked = clickedCell;
    locateFirst = [row, col];
    console.log(
      "firstClicked :" + firstClicked.getAttribute("id") + "-" + locateFirst
    );
  } else {
    let secondClicked = clickedCell;
    let locateSecond = [row, col];
    console.log(
      "secondClicked :" + secondClicked.getAttribute("id") + "-" + locateSecond
    );
    if (
      firstClicked !== secondClicked &&
      firstClicked.style.backgroundImage === secondClicked.style.backgroundImage
    ) {
      // còn 1 điều kiện là phải có đường đi thõa 3 line nữa
      switch (level) {
        case "1":
          checkTrue(firstClicked, secondClicked, locateFirst, locateSecond);
          break;
        case "2":
          checkTrueLv2(firstClicked, secondClicked, locateFirst, locateSecond);
          break;
        case "3":
          checkTrueLv3(firstClicked, secondClicked, locateFirst, locateSecond);
          break;
        case "4": // TH level 4 chưa hoàn thiện nên sẽ delay 1 level
          checkTrueLv5(firstClicked, secondClicked, locateFirst, locateSecond);
          break;
        case "5":
          checkTrueLv6(firstClicked, secondClicked, locateFirst, locateSecond);
          break;
        case "6":
          checkTrueLv7(firstClicked, secondClicked, locateFirst, locateSecond);
          break;
        case "7":
          checkTrueLv7(firstClicked, secondClicked, locateFirst, locateSecond);
          break;
        default:
          break;
      }
      // checkTrueLv2(firstClicked, secondClicked, locateFirst, locateSecond)
    } else {
      firstClicked.classList.toggle("clicked");
      secondClicked.classList.toggle("clicked");
      soundWrongChoose.play();
      if (level === "4" || level === "5" || level === "6") {
        decreaseWidth();
      }
    }
    firstClicked = null;
  }
}

// sự kiện click chọn các thẻ
let firstClicked = null;
let locateFirst = [2];
function setListenerFromLevel(level) {
  console.log("level : " + level);
  cells.forEach((cell) => {
    cell.removeEventListener("click", handleCellClick);
    cell.addEventListener("click", handleCellClick);
  });
}

// hàm khởi tạo board && fix khi mà reload sẽ bỏ các thẻ bị ẩn để tránh việc lẻ thẻ
function initializeBoardIMG() {
  // mảng tạm tạo dùng để xóa cái img đã đủ sl khi khởi tạo (tránh việc random lẻ hình)
  let imagePathsCopy = [];

  let a = randomNumImgs(); // gán biến để cố định (ko bị random nhìu lần)
  for (let i = 0; i < a.length; i++) {
    // chạy số phần tử trong mảng a (vì mảng a là mảng số lượng ảnh)
    for (let j = 0; j < a[i]; j++) {
      // lấy từng phần tử 1 bỏ vào mảng imagePathsCopy
      imagePathsCopy.push(imagePaths[i]);
    }
  }

  // random so cặp thẻ theo thứ tự (đảm bảo ko trùng khi reset)
  function randomNumImg() {
    let max = 3;
    let min = 2;
    if (numCols > 12) {
      // test cho thấy nếu vượt quá 12 cột 9 hàng sẽ thiếu thẻ phải tăng thêm số lượng random
      max = 5;
      min = 3;
    } else if (numCols < 5) {
      max = 2;
      min = 1;
    }
    return Math.floor(Math.random() * max) + min;
  }

  // Mảng random số lượng thẻ của từng hình xuất hiện trong board (vd : image1 xuất hiện ngẫu nhiên 4 lần ...)
  // thêm 1 điều kiện là các thẻ được random sẽ có giá trị là 1 nếu là 0 thì sẽ ko tính (chưa thực thi)
  function randomNumImgs() {
    let total = numRows * numCols;
    let arr = [];
    let count = 0;
    let numTest = 0;
    while (count !== total && numTest < 100) {
      // Thử nhiều lần để lấy đủ số thẻ trong board
      arr = [];
      count = 0;
      for (let i = 0; i < imagePaths.length; i++) {
        arr.push(randomNumImg() * 2);
        count += arr[i];
      }
      numTest++;
    }
    // console.log('numTest : ' + numTest)
    // console.log(count)
    return arr;
  }

  // trả về 1 thứ tự thẻ ngẫu nhiên trong mảng tạm vừa tạo
  function randomImg() {
    let i = Math.floor(Math.random() * imagePathsCopy.length);
    return i;
  }

  // chèn từng hình trong mảng tạm vào board và xóa nó để tránh random lại trùng
  // thêm 1 điều kiện là thẻ nào có textContext là 1 mới thêm còn 0 thì bỏ qua (phục vụ cho việc reloac lại board khi hết đường đi) (chưa thực thi)
  cells.forEach((cell) => {
    let randomNumber = randomImg(); // (1 / total ảnh)
    let imagePath = imagePathsCopy[randomNumber];
    cell.style.backgroundImage = `url('${imagePath}')`;
    imagePathsCopy.splice(randomNumber, 1);
  });
}

// hàm khởi tạo board với các thẻ thời gian theo từng level (level 5 có 10 thẻ - level 6 có 18 thẻ)
function initializeBoardIMGOfLevel5(numHelp) {
  // mảng tạm tạo dùng để xóa cái img đã đủ sl khi khởi tạo (tránh việc random lẻ hình)
  let imagePathsCopy = [];
  let numTimeTag = numHelp; // mặc định số thẻ được cộng thời gian
  let a = randomNumImgs(); // gán biến để cố định (ko bị random nhìu lần)
  for (let i = 0; i < a.length; i++) {
    // chạy số phần tử trong mảng a (vì mảng a là mảng số lượng ảnh)
    for (let j = 0; j < a[i]; j++) {
      // lấy từng phần tử 1 bỏ vào mảng imagePathsCopy
      imagePathsCopy.push(imagePaths[i]);
    }
  }
  for (let i = 0; i < numTimeTag; i++) {
    imagePathsCopy.push("./imgPikachu/plusTime.png");
  }

  // random so cặp thẻ theo thứ tự (đảm bảo ko trùng khi reset)
  function randomNumImg() {
    let max = 3;
    let min = 2;
    if (numTimeTag > 10) {
      // test cho thấy nếu vượt quá 10 thẻ plusTime sẽ thiếu thẻ phải tăng thêm số lượng random
      min = 1;
    }
    return Math.floor(Math.random() * max) + min;
  }

  // Mảng random số lượng thẻ của từng hình xuất hiện trong board (vd : image1 xuất hiện ngẫu nhiên 4 lần ...)
  // thêm 1 điều kiện là các thẻ được random sẽ có giá trị là 1 nếu là 0 thì sẽ ko tính (chưa thực thi)
  function randomNumImgs() {
    let total = numRows * numCols - numTimeTag;
    let arr = [];
    let count = 0;
    let numTest = 0;
    while (count !== total && numTest < 1000) {
      // Thử nhiều lần để lấy đủ số thẻ trong board
      arr = [];
      count = 0;
      for (let i = 0; i < imagePaths.length; i++) {
        arr.push(randomNumImg() * 2);
        count += arr[i];
      }
      numTest++;
    }
    console.log(numTest);
    return arr;
  }

  // trả về 1 thứ tự thẻ ngẫu nhiên trong mảng tạm vừa tạo
  function randomImg() {
    let i = Math.floor(Math.random() * imagePathsCopy.length);
    return i;
  }

  // chèn từng hình trong mảng tạm vào board và xóa nó để tránh random lại trùng
  // thêm 1 điều kiện là thẻ nào có textContext là 1 mới thêm còn 0 thì bỏ qua (phục vụ cho việc reloac lại board khi hết đường đi) (chưa thực thi)
  cells.forEach((cell) => {
    let randomNumber = randomImg(); // (1 / total ảnh)
    let imagePath = imagePathsCopy[randomNumber];
    cell.style.backgroundImage = `url('${imagePath}')`;
    imagePathsCopy.splice(randomNumber, 1);
  });
}

// hàm này sẽ thay đổi các ảnh của các thẻ hiện đang mở (các thẻ ẩn sẽ không được gán ảnh vào)
function reRenderBoardIMG1() {
  // mảng tạm tạo dùng để xóa cái img đã đủ sl khi khởi tạo (tránh việc random lẻ hình)
  let imagePathsCopy = [];

  let a = randomNumImgs(); // gán biến để cố định (ko bị random nhiều lần)
  for (let i = 0; i < a.length; i++) {
    for (let j = 0; j < a[i]; j++) {
      imagePathsCopy.push(imagePaths[i]);
    }
  }

  // random so cặp thẻ theo thứ tự (đảm bảo ko trùng khi reset)
  function randomNumImg() {
    let max = 3;
    let min = 1;
    return Math.floor(Math.random() * max) + min;
  }

  // Mảng random số lượng thẻ của từng hình xuất hiện trong board (vd : image1 xuất hiện ngẫu nhiên 4 lần ...)
  // thêm 1 điều kiện là các thẻ được random sẽ có giá trị là 1 nếu là 0 thì sẽ ko tính (chưa thực thi)
  function randomNumImgs() {
    let total = 0;
    // chạy lại để lấy số lượng thẻ còn lại (total phải luôn chẵn)
    cells.forEach((cell) => {
      if (cell.style.visibility !== "hidden") total += 1;
    });
    console.log("total : " + total);
    let arr = [];
    let count = 0;
    let numTest = 0;
    while (count !== total && numTest < 100) {
      // Thử nhiều lần để lấy đủ số thẻ trong board
      arr = [];
      count = 0;
      for (let i = 0; i < imagePaths.length; i++) {
        arr.push(randomNumImg() * 2);
        count += arr[i];
      }
      numTest++;
    }
    return arr;
  }

  // trả về 1 thứ tự thẻ ngẫu nhiên trong mảng tạm vừa tạo
  function randomImg() {
    let i = Math.floor(Math.random() * imagePathsCopy.length);
    return i;
  }

  // chèn từng hình trong mảng tạm vào board và xóa nó để tránh random lại trùng
  // thêm 1 điều kiện là thẻ nào có textContext là 1 mới thêm còn 0 thì bỏ qua (phục vụ cho việc reloac lại board khi hết đường đi) (chưa thực thi)
  cells.forEach((cell) => {
    if (cell.style.visibility !== "hidden") {
      let randomNumber = randomImg(); // (1 / total ảnh)
      let imagePath = imagePathsCopy[randomNumber];
      cell.style.backgroundImage = `url('${imagePath}')`;
      imagePathsCopy.splice(randomNumber, 1);
    }
  });
}

function reRenderBoardIMG() {
  //   numReload.textContent = parseFloat(numReload.textContent) - 1;
  // mảng tạm tạo dùng để xóa cái img đã đủ sl khi khởi tạo (tránh việc random lẻ hình)
  let remainCell = [];
  cells.forEach((cell) => {
    if (cell.style.visibility !== "hidden") {
      remainCell.push(
        cell.style.backgroundImage.substring(
          cell.style.backgroundImage.indexOf('"') + 1,
          cell.style.backgroundImage.lastIndexOf('"')
        )
      );
    }
  });
  console.log("remainCell : " + remainCell.length);
  // trả về 1 thứ tự thẻ ngẫu nhiên trong mảng tạm vừa tạo
  function randomImg() {
    let i = Math.floor(Math.random() * remainCell.length);
    return i;
  }

  cells.forEach((cell) => {
    if (cell.style.visibility !== "hidden") {
      let randomNumber = randomImg(); // (1 / total ảnh)
      let imagePath = remainCell[randomNumber];
      cell.style.backgroundImage = `url('${imagePath}')`;
      remainCell.splice(randomNumber, 1);
    }
  });
}

// hàm để css lại khi khởi tạo lại level
function restoreBoard() {
  // console.log("restore.....................")
  cells.forEach((item) => {
    item.style.visibility = "visible";
    item.style.outline = "none";
    item.style.transform = "none";
    item.style.opacity = 1; // opacity = 1 để tránh việc khi click thì opactity bị giảm
    item.classList.remove("clicked"); // xóa click để ko bị ghi đề opacity khi click lại thì sẽ thêm lại vào
  });
  for (let i = 0; i < numRows + 2; i++) {
    matrix[i] = [];
    for (let j = 0; j < numCols + 2; j++) {
      if (i === 0 || i === numRows + 1 || j === 0 || j === numCols + 1) {
        matrix[i][j] = "0";
      } else {
        matrix[i][j] = "1";
      }
    }
  }
}

// hàm khởi tạo lại điểm khi load lại từ level 1
function initializeScore() {
  score.textContent = "0";
}
// thuật toán tìm đường đi và check đúng sai
// Hàm tạo một node với các thuộc tính
function createNode(x, y, parent, turns) {
  return {
    x: x, // vị trí hàng
    y: y, // vị trí cột
    parent: parent, // node trước đó
    turns: turns, // số lần đổi hướng
  };
}

// hàm kiểm tra số lần đổi hướng cho tới node hiện tại (nếu đang là hàng mà trùng cột / ngược lại thì là đổi hướng)
function checkLanDoiHuong(node) {
  let rowO = false;
  let colO = false;
  let result = 0;
  if (node.x == node.parent.x) {
    rowO = true;
    colO = false;
  } else {
    colO = true;
    rowO = false;
  }
  do {
    if (result == 0) {
      result++;
    } else {
      if (rowO && node.y == node.parent.y) {
        colO = true;
        rowO = false;
        result++;
      } else if (colO && node.x == node.parent.x) {
        colO = false;
        rowO = true;
        result++;
      }
    }
    node = node.parent;
  } while (node.parent !== null);
  return result;
}

// sử dụng thuật toán BFS để tìm đường đi áp dụng số lần đổi hướng (nếu số lần đổi hướng = 4 thì sẽ ko duyệt qua node đó)
function findPath(startX, startY, endX, endY) {
  const frontier = []; // list đợi duyệt
  const visited = []; // list đã duyệt qua rồi

  // Thêm node đầu tiên vào frontier
  frontier.push(createNode(startX, startY, null, 0));

  while (frontier.length > 0) {
    let currentNode = frontier[0];
    frontier.splice(currentNode, 1);
    visited.push(currentNode);

    // Kết thúc khi có đường đi
    if (currentNode.x === endX && currentNode.y === endY) {
      const path = [];
      let current = currentNode;
      // console.log("checksolandoihuong : " + checkLanDoiHuong(current));
      while (current !== null) {
        path.push({ x: current.x, y: current.y, turns: current.turns });
        current = current.parent;
      }
      return path.reverse();
    }

    // Di chuyển sang các vị trí bên cạnh để duyệt
    const neighbors = [];
    const directions = [
      [-1, 0],
      [0, -1],
      [1, 0],
      [0, 1],
    ]; // Bên trái, phía trên, bên phải, phía dưới
    for (let direction of directions) {
      let newX = currentNode.x + direction[0];
      let newY = currentNode.y + direction[1];
      // console.log('--' + (matrix[newX][newY] == 0))
      if (
        (newX >= 0 &&
          newX < numRows + 2 &&
          newY >= 0 &&
          newY < numCols + 2 &&
          matrix[newX][newY] == 0) ||
        (newX === endX && newY === endY)
      ) {
        let newNeighbor = createNode(newX, newY, currentNode);
        newTurn = checkLanDoiHuong(newNeighbor);
        let newNeighbora = createNode(newX, newY, currentNode, newTurn);
        // console.log("newNeighbora : " + newNeighbora.turns);
        neighbors.push(newNeighbora);
      } else {
        // console.log("error !!!!!!!!!!!!!!!!!")
      }
    }

    // console.log(
    //     "x,y,parent,turns : " +
    //     currentNode.x +
    //     ", " +
    //     currentNode.y +
    //     ", " +
    //     currentNode.parent +
    //     ", " +
    //     currentNode.turns
    // );
    // console.log("----" + neighbors.length + "----------------------")
    // neighbors.forEach((i) => console.log(i.x + "-" + i.y));

    // Duyệt qua các ô lân cận
    for (let neighbor of neighbors) {
      // Nếu ô đã được duyệt, bỏ qua
      if (
        visited.find((node) => node.x === neighbor.x && node.y === neighbor.y)
      ) {
        continue;
      }

      // Nếu ô chưa được thăm hoặc có chi phí mới tốt hơn chi phí cũ, cập nhật hoặc thêm vào frontier
      let existingNode = frontier.find(
        (node) => node.x === neighbor.x && node.y === neighbor.y
      );
      // if (!existingNode || existingNode.turns > neighbor.turns) {
      // hoặc là có trong frontier nhưng có turn ít hơn
      existingNode = createNode(
        neighbor.x,
        neighbor.y,
        currentNode,
        neighbor.turns
      );
      // console.log("checksolandoihuongA : " + checkLanDoiHuong(existingNode));
      if (checkLanDoiHuong(existingNode) < 4) {
        frontier.push(existingNode);
      }
      // }
    }
    // console.log("frontier :");
    // frontier.forEach((i) => {
    //     if (i == null) {
    //         console.log("null");
    //     } else {
    //         console.log(i.x + "-" + i.y);
    //     }
    // });
  }
  return null;
}

// sự kiện kiểm tra đúng và tăng điểm cho level1
function checkTrue(firstClicked, secondClicked, locateFirst, locateSecond) {
  let path = findPath(
    locateFirst[0],
    locateFirst[1],
    locateSecond[0],
    locateSecond[1]
  );
  // console.log('path: ' + path)
  if (path !== null) {
    firstClicked.style.visibility = "hidden";
    secondClicked.style.visibility = "hidden";
    matrix[locateFirst[0]][locateFirst[1]] = "0";
    matrix[locateSecond[0]][locateSecond[1]] = "0";
    firstClicked.textContent = "0";
    secondClicked.textContent = "0";
    soundTrueChoose.play();
    score.textContent = parseInt(score.textContent) + 10;
    drawLine(path, locateFirst, locateSecond);
  } else {
    firstClicked.classList.toggle("clicked");
    secondClicked.classList.toggle("clicked");
    soundWrongChoose.play();
  }
  if (parseInt(score.textContent) >= 10 * 54) {
    console.log("+ + + + + + + + + + + + + + +level1 finish");
    autoIncreaseLevel();
  }
}

// sự kiện kiểm tra đúng và tăng điểm cho level2
function checkTrueLv2(firstClicked, secondClicked, locateFirst, locateSecond) {
  let path = findPath(
    locateFirst[0],
    locateFirst[1],
    locateSecond[0],
    locateSecond[1]
  );
  // console.log(locateFirst[0], locateFirst[1], locateSecond[0], locateSecond[1])
  console.log("path: " + path);
  if (path !== null) {
    firstClicked.style.visibility = "hidden";
    secondClicked.style.visibility = "hidden";
    matrix[locateFirst[0]][locateFirst[1]] = "0";
    matrix[locateSecond[0]][locateSecond[1]] = "0";
    firstClicked.textContent = "0";
    secondClicked.textContent = "0";
    soundTrueChoose.play();
    // console.log(matrix)
    score.textContent = parseInt(score.textContent) + 20;
    console.log("TRUEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEE");
    drawLine(path, locateFirst, locateSecond);
    treatLevel2(firstClicked, secondClicked, locateFirst, locateSecond);
  } else {
    console.log("FALSEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEE");
    firstClicked.classList.toggle("clicked");
    secondClicked.classList.toggle("clicked");
    soundWrongChoose.play();
  }
  let ramainCell = [];
  cells.forEach((cell) => {
    if (cell.style.visibility == "visible") {
      ramainCell.push(cell);
    }
  });
  if (parseInt(score.textContent) >= 20 * 54 + 540) {
    console.log("+ + + + + + + + + + + + + + +level2 finish");
    autoIncreaseLevel();
  } else if (parseInt(score.textContent) == 20 * 54 && ramainCell.length == 0) {
    loseGame();
  }
}

// sự kiện kiểm tra đúng và tăng điểm cho level3
function checkTrueLv3(firstClicked, secondClicked, locateFirst, locateSecond) {
  let path = findPath(
    locateFirst[0],
    locateFirst[1],
    locateSecond[0],
    locateSecond[1]
  );
  // console.log(locateFirst[0], locateFirst[1], locateSecond[0], locateSecond[1])
  console.log("path: " + path);
  if (path !== null) {
    firstClicked.style.visibility = "hidden";
    secondClicked.style.visibility = "hidden";
    matrix[locateFirst[0]][locateFirst[1]] = "0";
    matrix[locateSecond[0]][locateSecond[1]] = "0";
    firstClicked.textContent = "0";
    secondClicked.textContent = "0";
    soundTrueChoose.play();
    // console.log(matrix)
    score.textContent = parseInt(score.textContent) + 20;
    console.log("TRUEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEE");
    drawLine(path, locateFirst, locateSecond);
    treatLevel3(firstClicked, secondClicked, locateFirst, locateSecond);
  } else {
    console.log("FALSEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEE");
    firstClicked.classList.toggle("clicked");
    secondClicked.classList.toggle("clicked");
    soundWrongChoose.play();
  }
  let ramainCell = [];
  cells.forEach((cell) => {
    if (cell.style.visibility == "visible") {
      ramainCell.push(cell);
    }
  });
  if (parseInt(score.textContent) >= 20 * 54 * 2 + 540) {
    console.log("+ + + + + + + + + + + + + + +level3 finish");
    autoIncreaseLevel();
  } else if (parseInt(score.textContent) == 20 * 54 && remainCell.length == 0) {
    loseGame();
  }
}

// sự kiện kiểm tra đúng và tăng điểm cho level4 (chua hoan thien)
function checkTrueLv4(firstClicked, secondClicked, locateFirst, locateSecond) {
  let path = findPath(
    locateFirst[0],
    locateFirst[1],
    locateSecond[0],
    locateSecond[1]
  );
  // console.log(locateFirst[0], locateFirst[1], locateSecond[0], locateSecond[1])
  console.log("path: " + path);
  if (path !== null) {
    firstClicked.style.visibility = "hidden";
    secondClicked.style.visibility = "hidden";
    matrix[locateFirst[0]][locateFirst[1]] = "0";
    matrix[locateSecond[0]][locateSecond[1]] = "0";
    firstClicked.textContent = "0";
    secondClicked.textContent = "0";
    soundTrueChoose.play();
    // console.log(matrix)
    score.textContent = parseInt(score.textContent) + 30;
    console.log("TRUEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEE");
    drawLine(path, locateFirst, locateSecond);
    treatLevel4(firstClicked, secondClicked, locateFirst, locateSecond);
  } else {
    console.log("FALSEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEE");
    firstClicked.classList.toggle("clicked");
    secondClicked.classList.toggle("clicked");
    soundWrongChoose.play();
    decreaseWidth();
  }
  if (parseInt(score.textContent) >= 20 * 54 * 2 + 540) {
    console.log("+ + + + + + + + + + + + + + +level4 finish");
    autoIncreaseLevel();
  }
}

// sự kiện kiểm tra đúng và tăng điểm cho level5
function checkTrueLv5(firstClicked, secondClicked, locateFirst, locateSecond) {
  let path = findPath(
    locateFirst[0],
    locateFirst[1],
    locateSecond[0],
    locateSecond[1]
  );
  // console.log(locateFirst[0], locateFirst[1], locateSecond[0], locateSecond[1])
  console.log("path: " + path);
  if (path !== null) {
    firstClicked.style.visibility = "hidden";
    secondClicked.style.visibility = "hidden";
    matrix[locateFirst[0]][locateFirst[1]] = "0";
    matrix[locateSecond[0]][locateSecond[1]] = "0";
    firstClicked.textContent = "0";
    secondClicked.textContent = "0";
    soundTrueChoose.play();
    // console.log(matrix)
    score.textContent = parseInt(score.textContent) + 30;
    console.log("TRUEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEE");
    drawLine(path, locateFirst, locateSecond);
    treatLevel5(firstClicked, secondClicked, locateFirst, locateSecond);
    console.log(
      "firstClicked.style.backgroundImage : " +
        firstClicked.style.backgroundImage
    );
    console.log(
      "secondClicked.style.backgroundImage : " +
        secondClicked.style.backgroundImage
    );
    if (
      firstClicked.style.backgroundImage.includes(
        "./imgPikachu/plusTime.png"
      ) &&
      secondClicked.style.backgroundImage.includes("./imgPikachu/plusTime.png")
    ) {
      increaseWidth();
    }
  } else {
    console.log("FALSEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEE");
    firstClicked.classList.toggle("clicked");
    secondClicked.classList.toggle("clicked");
    soundWrongChoose.play();
    decreaseWidth();
  }
  let ramainCell = [];
  cells.forEach((cell) => {
    if (cell.style.visibility == "visible") {
      ramainCell.push(cell);
    }
  });
  if (parseInt(score.textContent) >= 30 * 54 + 20 * 54 * 2 + 540) {
    console.log("+ + + + + + + + + + + + + + +level5 finish");
    autoIncreaseLevel();
  } else if (parseInt(score.textContent) == 30 * 54 && remainCell.length == 0) {
    loseGame();
  }
}

// sự kiện kiểm tra đúng và tăng điểm cho level6
function checkTrueLv6(firstClicked, secondClicked, locateFirst, locateSecond) {
  let path = findPath(
    locateFirst[0],
    locateFirst[1],
    locateSecond[0],
    locateSecond[1]
  );
  // console.log(locateFirst[0], locateFirst[1], locateSecond[0], locateSecond[1])
  console.log("path: " + path);
  if (path !== null) {
    firstClicked.style.visibility = "hidden";
    secondClicked.style.visibility = "hidden";
    matrix[locateFirst[0]][locateFirst[1]] = "0";
    matrix[locateSecond[0]][locateSecond[1]] = "0";
    firstClicked.textContent = "0";
    secondClicked.textContent = "0";
    soundTrueChoose.play();
    // console.log(matrix)
    score.textContent = parseInt(score.textContent) + 35;
    console.log("TRUEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEE");
    drawLine(path, locateFirst, locateSecond);
    treatLevel6(firstClicked, secondClicked, locateFirst, locateSecond);
    if (
      firstClicked.style.backgroundImage.includes(
        "./imgPikachu/plusTime.png"
      ) &&
      secondClicked.style.backgroundImage.includes("./imgPikachu/plusTime.png")
    ) {
      increaseWidth();
    }
  } else {
    console.log("FALSEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEE");
    firstClicked.classList.toggle("clicked");
    secondClicked.classList.toggle("clicked");
    soundWrongChoose.play();
    decreaseWidth();
  }
  let remainCell = [];
  cells.forEach((cell) => {
    if (cell.style.visibility == "visible") {
      remainCell.push(cell);
    }
  });
  if (parseInt(score.textContent) >= 35 * 54 + 30 * 54 + 20 * 54 * 2 + 540) {
    console.log("+ + + + + + + + + + + + + + +level5 finish");
    autoIncreaseLevel();
  } else if (parseInt(score.textContent) == 35 * 54 && remainCell.length == 0) {
    loseGame();
  }
}

// sự kiện kiểm tra đúng và tăng điểm cho level7
let countCheckTrue = 0;
function checkTrueLv7(firstClicked, secondClicked, locateFirst, locateSecond) {
  let path = findPath(
    locateFirst[0],
    locateFirst[1],
    locateSecond[0],
    locateSecond[1]
  );
  // console.log(locateFirst[0], locateFirst[1], locateSecond[0], locateSecond[1])
  console.log("path: " + path);
  if (path !== null) {
    firstClicked.style.visibility = "hidden";
    secondClicked.style.visibility = "hidden";
    matrix[locateFirst[0]][locateFirst[1]] = "0";
    matrix[locateSecond[0]][locateSecond[1]] = "0";
    firstClicked.textContent = "0";
    secondClicked.textContent = "0";
    soundTrueChoose.play();
    // console.log(matrix)
    score.textContent = parseInt(score.textContent) + 40;
    console.log("TRUEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEE");
    drawLine(path, locateFirst, locateSecond);
    treatLevel7(firstClicked, secondClicked, locateFirst, locateSecond);
    countCheckTrue++;
    if (countCheckTrue % 5 == 0) {
      reRenderBoardIMG();
    }
    if (
      firstClicked.style.backgroundImage.includes(
        "./imgPikachu/plusTime.png"
      ) &&
      secondClicked.style.backgroundImage.includes("./imgPikachu/plusTime.png")
    ) {
      increaseWidth();
    }
  } else {
    console.log("FALSEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEE");
    firstClicked.classList.toggle("clicked");
    secondClicked.classList.toggle("clicked");
    soundWrongChoose.play();
    decreaseWidth();
  }
  let remainCell = [];
  cells.forEach((cell) => {
    if (cell.style.visibility == "visible") {
      remainCell.push(cell);
    }
  });
  if (
    parseInt(score.textContent) >=
      40 * 54 + 35 * 54 + 30 * 54 + 20 * 54 * 2 + 540 &&
    remainCell.length == 0
  ) {
    console.log("+ + + + + + + + + + + + + + +level7 finish");
    autoIncreaseLevel();
    checkWinEndGame();
  } else if (parseInt(score.textContent) == 40 * 54 && remainCell.length == 0) {
    loseGame();
  }
}

// cập nhật lại id cho toàn bộ board theo thứ tự 1 -> lenght
function updateCellIds() {
  const cells = document.querySelectorAll(".cell");
  let idCounter = 1;
  // console.log('update textContent cell')
  cells.forEach((cell) => {
    cell.id = idCounter.toString();
    cell.textContent = "1";
    idCounter++;
  });
}

// lấy các mảng hàng / cột của có các thẻ bị ẩn và duyệt qua mảng set lại giá trị top & left cho các ô còn lại
// function treatLevel2(firstClicked, secondClicked, locateFirst, locateSecond) {
//     if (locateFirst[1] == locateSecond[1]) {
//         let arrCache1 = [];
//         let arrTemp = [];
//         // hoặc lấy danh sách các thẻ trong cột đó vì 2 thẻ cùng cột
//         // lấy danh sách các thẻ để dùng nó lặp hiển thị lại vị trí mới
//         for (let i = 0; i < numRows; i++) {
//             // console.log(convertMatrixToCell(i + 1, locateFirst[1]).getAttribute('id'))
//             const cell = convertMatrixToCell(i + 1, locateFirst[1]);
//             // const cell = cells[(i) * numCols + locateFirst[1] - 1];
//             if (matrix[i + 1][locateFirst[1]] === '1') {
//                 // console.log('=== 1 : ' + cell.getAttribute('id'))
//                 arrCache1.push(cell)
//             } else if (matrix[i + 1][locateFirst[1]] === '0') {
//                 // console.log('=== 0 : ' + cell.getAttribute('id'))
//                 cell.textContent = '0';
//                 arrTemp.push(cell)
//             }
//         }
//         // dùng để xét lại giá trị của cột trong ma trận
//         let count = 0;
//         while (count < numRows) { // < 9
//             if (count < arrCache1.length) {
//                 //xét lại giá trị trong ma trận đẩy các ô có giá trị 0 vừa xét lên phía trên
//                 matrix[numRows - count][locateFirst[1]] = '1';
//             } else {
//                 matrix[numRows - count][locateFirst[1]] = '0';
//             }
//             count++;
//         }
//         // arrCache1.forEach((item, i) => {
//         //     console.log('++++ : ' + item.getAttribute('id'))
//         // });
//         arrCache1.sort((a, b) => a.getAttribute('id') - b.getAttribute('id')).reverse().push(...arrTemp.reverse());
//         arrCache1.forEach((item, i) => { // reverse() để dễ hiểu hơn đúng kiểu level là hạ xuống
//             item.style.top = 'auto';
//             item.style.bottom = 3 + (i * 48) + "px";
//             // item.setAttribute('id', (numRows - i - 1) * 12 + locateFirst[1])
//         });
//         // arrCache1.forEach((item, i) => { // reverse() để dễ hiểu hơn đúng kiểu level là hạ xuống
//         //     if (matrix[i + 1][locateFirst[1]] === '1') {
//         //         console.log(item.getAttribute('id'))
//         //     }
//         // });
//     }else {
//         let arrCache1 = [];
//         let arrCache2 = [];
//         let arrTemp1 = [];
//         let arrTemp2 = [];
//         for (let i = 0; i < numRows; i++) {
//             if (convertMatrixToCell(i + 1, locateFirst[1]).textContent !== '0') {
//                 arrCache1.push(convertMatrixToCell(i + 1, locateFirst[1]))
//             } else {
//                 arrTemp1.push(convertMatrixToCell(i + 1, locateFirst[1]))
//             }
//         }
//         for (let i = 0; i < numRows; i++) {
//             if (convertMatrixToCell(i + 1, locateSecond[1]).textContent !== '0') {
//                 arrCache2.push(convertMatrixToCell(i + 1, locateSecond[1]))
//             } else {
//                 arrTemp2.push(convertMatrixToCell(i + 1, locateSecond[1]))
//             }
//         }
//         let count1 = 0
//         let count2 = 0
//         while (count1 < numRows && count2 < numRows) {
//             if (count1 < arrCache1.length) {
//                 matrix[numRows - count1][locateFirst[1]] = '1';
//             } else {
//                 matrix[numRows - count1][locateFirst[1]] = '0';
//             }
//             if (count2 < arrCache2.length) {
//                 matrix[numRows - count2][locateSecond[1]] = '1';
//             } else {
//                 matrix[numRows - count2][locateSecond[1]] = '0';
//             }
//             count1++;
//             count2++;
//         }
//         arrCache1.reverse().push(...arrTemp1.reverse());
//         arrCache1.forEach((item, i) => {
//             item.style.top = 'auto';
//             item.style.bottom = 3 + (i * 48) + "px";
//             item.setAttribute('id', (numRows - i - 1) * 12 + locateFirst[1]);
//         });
//         arrCache2.reverse().push(...arrTemp2.reverse());
//         arrCache2.forEach((item, i) => {
//             item.style.top = 'auto';
//             item.style.bottom = 3 + (i * 48) + "px";
//             item.setAttribute('id', (numRows - i - 1) * 12 + locateSecond[1]);
//         });
//     }
// }

function treatLevel2(firstClicked, secondClicked, locateFirst, locateSecond) {
  if (locateFirst[1] == locateSecond[1]) {
    let arrCache1 = [];
    let arrTemp = [];
    // hoặc lấy danh sách các thẻ trong cột đó vì 2 thẻ cùng cột
    // lấy danh sách các thẻ để dùng nó lặp hiển thị lại vị trí mới
    let temp = 0;
    for (let i = numRows; i > 0; i--) {
      // const cell = cells[(i - 1) * numCols + locateFirst[1] - 1];
      let cell = convertMatrixToCell(i, locateFirst[1]);
      if (cell.textContent === "1") {
        arrCache1.push(cell);
        cell.setAttribute("id", (i - 1 + temp) * numCols + locateFirst[1]);
      } else if (cell.textContent === "0") {
        arrTemp.push(cell);
        cell.setAttribute("id", temp * numCols + locateFirst[1]);
        temp++;
      }
    }
    console.log("=======================");
    arrTemp.forEach((cell) => {
      console.log(cell.getAttribute("id"));
    });
    // dùng để xét lại giá trị của cột trong ma trận
    let count = 0;
    while (count < numRows) {
      // < 9
      if (count < arrCache1.length) {
        //xét lại giá trị trong ma trận đẩy các ô có giá trị 0 vừa xét lên phía trên
        matrix[numRows - count][locateFirst[1]] = "1";
      } else {
        matrix[numRows - count][locateFirst[1]] = "0";
      }
      count++;
    }
    // arrCache1.sort((a, b) => a.getAttribute('id') - b.getAttribute('id')).reverse().push(...arrTemp.reverse());
    arrCache1.push(...arrTemp.reverse());
    arrCache1.forEach((item, i) => {
      // reverse() để dễ hiểu hơn đúng kiểu level là hạ xuống
      item.style.top = "auto";
      item.style.bottom = 3 + i * 48 + "px";
    });
  } else {
    let arrCache1 = [];
    let arrCache2 = [];
    let arrTemp1 = [];
    let arrTemp2 = [];
    let temp1 = 0;
    let temp2 = 0;
    for (let i = numRows; i > 0; i--) {
      // const cell = cells[(i - 1) * numCols + locateFirst[1] - 1];
      let cell = convertMatrixToCell(i, locateFirst[1]);
      if (cell.textContent === "1") {
        arrCache1.push(cell);
        cell.setAttribute("id", (i - 1 + temp1) * numCols + locateFirst[1]);
      } else if (cell.textContent === "0") {
        arrTemp1.push(cell);
        cell.setAttribute("id", temp1 * numCols + locateFirst[1]);
        temp1++;
      }
    }
    for (let i = numRows; i > 0; i--) {
      // const cell = cells[(i - 1) * numCols + locateSecond[1] - 1];
      let cell = convertMatrixToCell(i, locateSecond[1]);
      if (cell.textContent === "1") {
        arrCache2.push(cell);
        cell.setAttribute("id", (i - 1 + temp2) * numCols + locateSecond[1]);
      } else if (cell.textContent === "0") {
        arrTemp2.push(cell);
        cell.setAttribute("id", temp2 * numCols + locateSecond[1]);
        temp2++;
      }
    }
    let count1 = 0;
    let count2 = 0;
    while (count1 < numRows && count2 < numRows) {
      if (count1 < arrCache1.length) {
        matrix[numRows - count1][locateFirst[1]] = "1";
      } else {
        matrix[numRows - count1][locateFirst[1]] = "0";
      }
      if (count2 < arrCache2.length) {
        matrix[numRows - count2][locateSecond[1]] = "1";
      } else {
        matrix[numRows - count2][locateSecond[1]] = "0";
      }
      count1++;
      count2++;
    }
    arrCache1.push(...arrTemp1.reverse());
    arrCache1.forEach((item, i) => {
      item.style.top = "auto";
      item.style.bottom = 3 + i * 48 + "px";
      // item.setAttribute('id', (numRows - i - 1) * 12 + locateFirst[1]);
    });
    arrCache2.push(...arrTemp2.reverse());
    arrCache2.forEach((item, i) => {
      item.style.top = "auto";
      item.style.bottom = 3 + i * 48 + "px";
      // item.setAttribute('id', (numRows - i - 1) * 12 + locateSecond[1]);
    });
  }
}

function treatLevel3(firstClicked, secondClicked, locateFirst, locateSecond) {
  if (locateFirst[0] == locateSecond[0]) {
    let arrCache1 = [];
    let arrTemp = [];
    // hoặc lấy danh sách các thẻ trong cột đó vì 2 thẻ cùng cột
    // lấy danh sách các thẻ để dùng nó lặp hiển thị lại vị trí mới
    let temp = 0;
    for (let i = 1; i <= numCols; i++) {
      let cell = convertMatrixToCell(locateFirst[0], i);
      if (cell.textContent === "1") {
        arrCache1.push(cell);
        cell.setAttribute("id", (locateFirst[0] - 1) * numCols + (i - temp));
      } else if (cell.textContent === "0") {
        arrTemp.push(cell);
        temp++;
        cell.setAttribute("id", locateFirst[0] * numCols - temp);
      }
    }
    // dùng để xét lại giá trị của cột trong ma trận
    let count = 0;
    while (count < numCols) {
      // < 12
      if (count < arrTemp.length) {
        //xét lại giá trị trong ma trận đẩy các ô có giá trị 0 vừa xét lên phía trên
        matrix[locateFirst[0]][numCols - count] = "0";
      } else {
        matrix[locateFirst[0]][numCols - count] = "1";
      }
      count++;
    }
    arrCache1.push(...arrTemp.reverse());
    arrCache1.forEach((item, i) => {
      // reverse() để dễ hiểu hơn đúng kiểu level là hạ xuống
      item.style.right = "auto";
      item.style.left = i * 48 + "px";
    });
  } else {
    let arrCache1 = [];
    let arrCache2 = [];
    let arrTemp1 = [];
    let arrTemp2 = [];
    let temp1 = 0;
    let temp2 = 0;
    for (let i = 1; i <= numCols; i++) {
      // const cell = cells[(i - 1) * numCols + locateFirst[1] - 1];
      let cell = convertMatrixToCell(locateFirst[0], i);
      if (cell.textContent === "1") {
        cell.setAttribute("id", (locateFirst[0] - 1) * numCols + (i - temp1));
        arrCache1.push(cell);
      } else if (cell.textContent === "0") {
        cell.setAttribute("id", locateFirst[0] * numCols - temp1);
        arrTemp1.push(cell);
        temp1++;
      }
    }
    for (let i = 1; i <= numCols; i++) {
      // const cell = cells[(i - 1) * numCols + locateFirst[1] - 1];
      let cell = convertMatrixToCell(locateSecond[0], i);
      if (cell.textContent === "1") {
        cell.setAttribute("id", (locateSecond[0] - 1) * numCols + (i - temp2));
        arrCache2.push(cell);
      } else if (cell.textContent === "0") {
        cell.setAttribute("id", locateSecond[0] * numCols - temp2);
        arrTemp2.push(cell);
        temp2++;
      }
    }
    let count1 = 0;
    let count2 = 0;
    while (count1 < numCols && count2 < numCols) {
      if (count1 < arrTemp1.length) {
        matrix[locateFirst[0]][numCols - count1] = "0";
      } else {
        matrix[locateFirst[0]][numCols - count1] = "1";
      }
      if (count2 < arrTemp2.length) {
        matrix[locateSecond[0]][numCols - count2] = "0";
      } else {
        matrix[locateSecond[0]][numCols - count2] = "1";
      }
      count1++;
      count2++;
    }
    arrCache1.push(...arrTemp1.reverse());
    arrCache1.forEach((item, i) => {
      item.style.right = "auto";
      item.style.left = i * 48 + "px";
    });
    arrCache2.push(...arrTemp2.reverse());
    arrCache2.forEach((item, i) => {
      item.style.right = "auto";
      item.style.left = i * 48 + "px";
    });
  }
}

// chua hoan thien
function treatLevel4(firstClicked, secondClicked, locateFirst, locateSecond) {
  let center = Math.floor(numRows / 2);
  if (locateFirst[1] == locateSecond[1]) {
    let arrCache1 = [];
    let arrTemp = [];
    let temp = 0;
    for (let i = 1; i <= numRows; i++) {
      let cell = convertMatrixToCell(i, locateFirst[1]);
      if (cell.textContent === "0") {
        temp++;
      }
    }
    let temp1 = 0;
    for (let i = 1; i <= numRows; i++) {
      let cell = convertMatrixToCell(i, locateFirst[1]);
      if (cell.textContent === "1") {
        arrCache1.push(cell);
        cell.setAttribute(
          "id",
          (i + temp / 2 - temp1 - 1) * numCols + locateFirst[1]
        );
      } else if (cell.textContent === "0") {
        arrTemp.push(cell);
        cell.setAttribute(
          "id",
          (numRows - temp1 + 1) * numCols + locateFirst[1]
        ); // id khong can chinh xac
        temp1++;
      }
    }
    console.log("arrTemp : " + arrTemp.length);
    // dùng để xét lại giá trị của cột trong ma trận
    let count = 0;
    while (count < numRows) {
      if (count < arrTemp.length) {
        matrix[count / 2 + 1][locateFirst[1]] = "0";
        matrix[numRows - count / 2][locateFirst[1]] = "0";
        count++;
      } else {
        console.log(numRows - count + arrTemp.length / 2);
        matrix[numRows - count + arrTemp.length / 2][locateFirst[1]] = "1";
      }
      count++;
    }
    let sumArr = [];
    for (let i = 0; i < arrTemp.length; i++) {
      if (i === arrTemp.length / 2) {
        sumArr.push(...arrCache1);
      }
      sumArr.push(arrTemp[i]);
    }
    sumArr.forEach((item, i) => {
      item.style.bottom = "auto";
      item.style.top = i * 48 + "px";
    });
  } else {
    let arrCache1 = [];
    let arrCache2 = [];
    let arrTemp1 = [];
    let arrTemp2 = [];
    let temp1 = 0;
    let temp2 = 0;
    if (locateFirst[0] <= center) {
      //1
      for (let i = 1; i <= numRows; i++) {
        let cell = convertMatrixToCell(i, locateFirst[1]);
        if (cell.textContent === "0") {
          temp1++;
        }
      }
      let temp = 0;
      for (let i = numRows; i > 0; i--) {
        let cell = convertMatrixToCell(i, locateFirst[1]);
        if (cell.textContent === "1") {
          arrCache1.push(cell);
          cell.setAttribute(
            "id",
            (i + ~~(temp1 / 2) - temp - 1) * numCols + locateFirst[1]
          );
        } else if (cell.textContent === "0") {
          arrTemp1.push(cell);
          cell.setAttribute(
            "id",
            (numRows - temp + 1) * numCols + locateFirst[1]
          );
          temp++;
        }
      }
      //2
      for (let i = 1; i <= numRows; i++) {
        let cell = convertMatrixToCell(i, locateSecond[1]);
        if (cell.textContent === "0") {
          temp2++;
        }
      }
      let tempp = 0;
      for (let i = numRows; i > 0; i--) {
        let cell = convertMatrixToCell(i, locateSecond[1]);
        if (cell.textContent === "1") {
          arrCache2.push(cell);
          cell.setAttribute(
            "id",
            (i + ~~(temp2 / 2) - tempp - 1) * numCols + locateSecond[1]
          );
        } else if (cell.textContent === "0") {
          arrTemp2.push(cell);
          cell.setAttribute(
            "id",
            (numRows - tempp + 1) * numCols + locateSecond[1]
          );
          tempp++;
        }
      }
    } else {
      //1
      for (let i = 1; i <= numRows; i++) {
        let cell = convertMatrixToCell(i, locateFirst[1]);
        if (cell.textContent === "0") {
          temp1++;
        }
      }
      let temp = 0;
      for (let i = 1; i <= numRows; i++) {
        let cell = convertMatrixToCell(i, locateFirst[1]);
        if (cell.textContent === "1") {
          arrCache1.push(cell);
          cell.setAttribute(
            "id",
            (i + ~~(temp1 / 2) - temp - 1) * numCols + locateFirst[1]
          );
        } else if (cell.textContent === "0") {
          arrTemp1.push(cell);
          cell.setAttribute(
            "id",
            (numRows - temp + 1) * numCols + locateFirst[1]
          );
          temp++;
        }
      }
      //2
      for (let i = 1; i <= numRows; i++) {
        let cell = convertMatrixToCell(i, locateSecond[1]);
        if (cell.textContent === "0") {
          temp2++;
        }
      }
      let tempp = 0;
      for (let i = 1; i <= numRows; i++) {
        let cell = convertMatrixToCell(i, locateSecond[1]);
        if (cell.textContent === "1") {
          arrCache2.push(cell);
          cell.setAttribute(
            "id",
            (i + ~~(temp2 / 2) - tempp - 1) * numCols + locateSecond[1]
          );
        } else if (cell.textContent === "0") {
          arrTemp2.push(cell);
          cell.setAttribute(
            "id",
            (numRows - tempp + 1) * numCols + locateSecond[1]
          );
          tempp++;
        }
      }
    }
    console.log("arrTemp1.length : " + arrTemp1.length);
    console.log("arrTemp2.length : " + arrTemp2.length);
    let count1 = 0;
    let count2 = 0;
    if (locateFirst[0] <= center) {
      while (count1 < numRows && count2 < numRows) {
        if (count1 < arrTemp1.length) {
          if (arrTemp1.length > 1) {
            matrix[~~(count1 / 2) + 1][locateFirst[1]] = "0";
            matrix[numRows - ~~(count1 / 2)][locateFirst[1]] = "0";
            count1++;
          } else {
            matrix[~~(count1 / 2) + 1][locateFirst[1]] = "0";
          }
        } else {
          if (arrTemp1.length > 1) {
            matrix[count1 + ~~(arrTemp1.length / 2)][locateFirst[1]] = "1";
          } else {
            matrix[count1 + 1][locateFirst[1]] = "1";
          }
        }
        if (count2 < arrTemp2.length) {
          if (arrTemp2.length > 1) {
            matrix[~~(count2 / 2) + 1][locateSecond[1]] = "0";
            matrix[numRows - ~~(count2 / 2)][locateSecond[1]] = "0";
            count2++;
          } else {
            matrix[~~(count2 / 2) + 1][locateSecond[1]] = "0";
          }
        } else {
          if (arrTemp2.length > 1) {
            matrix[count2 + ~~(arrTemp2.length / 2)][locateSecond[1]] = "1";
          } else {
            matrix[count2 + 1][locateSecond[1]] = "1";
          }
        }
        count1++;
        count2++;
      }
    } else {
      while (count1 < numRows && count2 < numRows) {
        if (count1 < arrTemp1.length) {
          if (arrTemp1.length > 1) {
            matrix[count1 / 2 + 1][locateFirst[1]] = "0";
            matrix[numRows - count1 / 2][locateFirst[1]] = "0";
            count1++;
          } else {
            matrix[numRows - count1 / 2][locateFirst[1]] = "0";
          }
        } else {
          if (arrTemp1.length > 1) {
            matrix[numRows - count1 + ~~(arrTemp1.length / 2)][locateFirst[1]] =
              "1";
          } else {
            matrix[numRows - count1 + 1][locateFirst[1]] = "1";
          }
        }
        if (count2 < arrTemp2.length) {
          if (arrTemp2.length > 1) {
            matrix[~~(count2 / 2) + 1][locateSecond[1]] = "0";
            matrix[numRows - ~~(count2 / 2)][locateSecond[1]] = "0";
            count2++;
          } else {
            matrix[numRows - ~~(count2 / 2)][locateSecond[1]] = "0";
          }
        } else {
          if (arrTemp2.length > 1) {
            matrix[numRows - count2 + ~~(arrTemp2.length / 2)][
              locateSecond[1]
            ] = "1";
          } else {
            matrix[numRows - count2 + 1][locateSecond[1]] = "1";
          }
        }
        count1++;
        count2++;
      }
    }

    let sumArr1 = [];
    let sumArr2 = [];
    for (let i = 0; i < arrTemp1.length; i++) {
      if (i === arrTemp1.length / 2) {
        sumArr1.push(...arrCache1);
      }
      sumArr1.push(arrTemp1[i]);
    }
    for (let i = 0; i < arrTemp2.length; i++) {
      if (i === arrTemp2.length / 2) {
        sumArr2.push(...arrCache2);
      }
      sumArr2.push(arrTemp2[i]);
    }
    sumArr1.forEach((cell) => {
      console.log(cell);
    });
    sumArr1.forEach((item, i) => {
      item.style.bottom = "auto";
      item.style.top = i * 48 + "px";
    });
    sumArr2.forEach((item, i) => {
      item.style.bottom = "auto";
      item.style.top = i * 48 + "px";
    });

    // arrCache1.push(...arrTemp1.reverse());
    // arrCache1.forEach((item, i) => {
    //   item.style.top = "auto";
    //   item.style.bottom = 3 + i * 48 + "px";
    // });
    // arrCache2.push(...arrTemp2.reverse());
    // arrCache2.forEach((item, i) => {
    //   item.style.top = "auto";
    //   item.style.bottom = 3 + i * 48 + "px";
    // });
  }
}

function treatLevel5(firstClicked, secondClicked, locateFirst, locateSecond) {
  if (locateFirst[0] == locateSecond[0]) {
    let arrCache1 = [];
    let arrTemp = [];
    // hoặc lấy danh sách các thẻ trong cột đó vì 2 thẻ cùng cột
    // lấy danh sách các thẻ để dùng nó lặp hiển thị lại vị trí mới
    let temp = 0;
    for (let i = numCols; i > 0; i--) {
      let cell = convertMatrixToCell(locateFirst[0], i);
      if (cell.textContent === "1") {
        arrCache1.push(cell);
        cell.setAttribute("id", (locateFirst[0] - 1) * numCols + (i + temp));
      } else if (cell.textContent === "0") {
        arrTemp.push(cell);
        temp++;
        cell.setAttribute("id", (locateFirst[0] - 1) * numCols + temp);
      }
    }
    // dùng để xét lại giá trị của cột trong ma trận
    let count = 0;
    while (count < numCols) {
      // < 12
      if (count < arrTemp.length) {
        //xét lại giá trị trong ma trận đẩy các ô có giá trị 0 vừa xét lên phía trên
        matrix[locateFirst[0]][count + 1] = "0";
      } else {
        matrix[locateFirst[0]][count + 1] = "1";
      }
      count++;
    }
    arrCache1.push(...arrTemp.reverse());
    arrCache1.forEach((item, i) => {
      // reverse() để dễ hiểu hơn đúng kiểu level là hạ xuống
      item.style.right = 3 + i * 48 + "px";
      item.style.left = "auto";
    });
  } else {
    let arrCache1 = [];
    let arrCache2 = [];
    let arrTemp1 = [];
    let arrTemp2 = [];
    let temp1 = 0;
    let temp2 = 0;
    for (let i = numCols; i > 0; i--) {
      // const cell = cells[(i - 1) * numCols + locateFirst[1] - 1];
      let cell = convertMatrixToCell(locateFirst[0], i);
      if (cell.textContent === "1") {
        cell.setAttribute("id", (locateFirst[0] - 1) * numCols + (i + temp1));
        arrCache1.push(cell);
      } else if (cell.textContent === "0") {
        cell.setAttribute("id", (locateFirst[0] - 1) * numCols + temp1);
        arrTemp1.push(cell);
        temp1++;
      }
    }
    for (let i = numCols; i > 0; i--) {
      // const cell = cells[(i - 1) * numCols + locateFirst[1] - 1];
      let cell = convertMatrixToCell(locateSecond[0], i);
      if (cell.textContent === "1") {
        cell.setAttribute("id", (locateSecond[0] - 1) * numCols + (i + temp2));
        arrCache2.push(cell);
      } else if (cell.textContent === "0") {
        cell.setAttribute("id", (locateSecond[0] - 1) * numCols + temp2);
        arrTemp2.push(cell);
        temp2++;
      }
    }
    let count1 = 0;
    let count2 = 0;
    while (count1 < numCols && count2 < numCols) {
      if (count1 < arrTemp1.length) {
        matrix[locateFirst[0]][count1 + 1] = "0";
      } else {
        matrix[locateFirst[0]][count1 + 1] = "1";
      }
      if (count2 < arrTemp2.length) {
        matrix[locateSecond[0]][count2 + 1] = "0";
      } else {
        matrix[locateSecond[0]][count2 + 1] = "1";
      }
      count1++;
      count2++;
    }
    arrCache1.push(...arrTemp1.reverse());
    arrCache1.forEach((item, i) => {
      item.style.right = 3 + i * 48 + "px";
      item.style.left = "auto";
    });
    arrCache2.push(...arrTemp2.reverse());
    arrCache2.forEach((item, i) => {
      item.style.right = 3 + i * 48 + "px";
      item.style.left = "auto";
    });
  }
}

function treatLevel6(firstClicked, secondClicked, locateFirst, locateSecond) {
  let remainCell = [];
  cells.forEach((cell) => {
    if (cell.style.visibility !== "hidden") {
      remainCell.push(cell);
    }
  });
  let numRamdomRotate = Math.random() * 20 + 10;
  if (locateFirst[1] == locateSecond[1]) {
    let arrCache1 = [];
    let arrTemp = [];
    let temp = 0;
    for (let i = 1; i <= numRows; i++) {
      let cell = convertMatrixToCell(i, locateFirst[1]);
      if (cell.textContent === "1") {
        arrCache1.push(cell);
        cell.setAttribute("id", (i - 1 - temp) * numCols + locateFirst[1]);
      } else if (cell.textContent === "0") {
        arrTemp.push(cell);
        cell.setAttribute("id", (numRows - temp) * numCols + locateFirst[1]);
        temp++;
      }
    }
    let count = 0;
    while (count < numRows) {
      if (count < arrTemp.length) {
        matrix[numRows - count][locateFirst[1]] = "0";
      } else {
        matrix[numRows - count][locateFirst[1]] = "1";
      }
      count++;
    }
    arrCache1.push(...arrTemp.reverse());
    arrCache1.forEach((item, i) => {
      item.style.top = i * 48 + "px";
      item.style.bottom = "auto";
    });
  } else {
    let arrCache1 = [];
    let arrCache2 = [];
    let arrTemp1 = [];
    let arrTemp2 = [];
    let temp1 = 0;
    let temp2 = 0;
    for (let i = 1; i <= numRows; i++) {
      let cell = convertMatrixToCell(i, locateFirst[1]);
      if (cell.textContent === "1") {
        arrCache1.push(cell);
        cell.setAttribute("id", (i - 1 - temp1) * numCols + locateFirst[1]);
      } else if (cell.textContent === "0") {
        arrTemp1.push(cell);
        cell.setAttribute("id", (numRows - temp1) * numCols + locateFirst[1]);
        temp1++;
      }
    }
    for (let i = 1; i <= numRows; i++) {
      let cell = convertMatrixToCell(i, locateSecond[1]);
      if (cell.textContent === "1") {
        arrCache2.push(cell);
        cell.setAttribute("id", (i - 1 - temp2) * numCols + locateSecond[1]);
      } else if (cell.textContent === "0") {
        arrTemp2.push(cell);
        cell.setAttribute("id", (numRows - temp2) * numCols + locateSecond[1]);
        temp2++;
      }
    }
    let count1 = 0;
    let count2 = 0;
    while (count1 < numRows && count2 < numRows) {
      if (count1 < arrTemp1.length) {
        matrix[numRows - count1][locateFirst[1]] = "0";
      } else {
        matrix[numRows - count1][locateFirst[1]] = "1";
      }
      if (count2 < arrTemp2.length) {
        matrix[numRows - count2][locateSecond[1]] = "0";
      } else {
        matrix[numRows - count2][locateSecond[1]] = "1";
      }
      count1++;
      count2++;
    }
    arrCache1.push(...arrTemp1.reverse());
    arrCache1.forEach((item, i) => {
      item.style.top = i * 48 + "px";
      item.style.bottom = "auto";
    });
    arrCache2.push(...arrTemp2.reverse());
    arrCache2.forEach((item, i) => {
      item.style.top = i * 48 + "px";
      item.style.bottom = "auto";
    });
  }
  if (remainCell.length !== 0) {
    while (numRamdomRotate > 0) {
      if (Math.floor(Math.random() * 2 + 1) === 1) {
        remainCell[
          Math.floor(Math.random() * remainCell.length)
        ].style.transform = "rotate(90deg)";
      } else {
        remainCell[
          Math.floor(Math.random() * remainCell.length)
        ].style.transform = "rotate(180deg)";
      }
      numRamdomRotate--;
    }
  }
}

function treatLevel7(firstClicked, secondClicked, locateFirst, locateSecond) {
  let remainCell = [];
  cells.forEach((cell) => {
    if (cell.style.visibility !== "hidden") {
      remainCell.push(cell);
    }
  });
  let numRamdomRotate = Math.random() * 20 + 10;
  if (locateFirst[0] == locateSecond[0]) {
    let arrCache1 = [];
    let arrTemp = [];
    let temp = 0;
    for (let i = 1; i <= numCols; i++) {
      let cell = convertMatrixToCell(locateFirst[0], i);
      if (cell.textContent === "1") {
        cell.setAttribute("id", (locateFirst[0] - 1) * numCols + (i - temp));
        arrCache1.push(cell);
      } else if (cell.textContent === "0") {
        cell.setAttribute("id", locateFirst[0] * numCols - temp);
        arrTemp.push(cell);
        temp++;
      }
    }
    // dùng để xét lại giá trị của cột trong ma trận
    let count = 0;
    while (count < numCols) {
      // < 12
      if (count < arrTemp.length) {
        //xét lại giá trị trong ma trận đẩy các ô có giá trị 0 vừa xét lên phía trên
        matrix[locateFirst[0]][numCols - count] = "0";
      } else {
        matrix[locateFirst[0]][numCols - count] = "1";
      }
      count++;
    }
    arrCache1.push(...arrTemp.reverse());
    arrCache1.forEach((item, i) => {
      // reverse() để dễ hiểu hơn đúng kiểu level là hạ xuống
      item.style.right = "auto";
      item.style.left = i * 48 + "px";
    });
  } else {
    let arrCache1 = [];
    let arrCache2 = [];
    let arrTemp1 = [];
    let arrTemp2 = [];
    let temp1 = 0;
    let temp2 = 0;
    for (let i = 1; i <= numCols; i++) {
      // const cell = cells[(i - 1) * numCols + locateFirst[1] - 1];
      let cell = convertMatrixToCell(locateFirst[0], i);
      if (cell.textContent === "1") {
        cell.setAttribute("id", (locateFirst[0] - 1) * numCols + (i - temp1));
        arrCache1.push(cell);
      } else if (cell.textContent === "0") {
        cell.setAttribute("id", locateFirst[0] * numCols - temp1);
        arrTemp1.push(cell);
        temp1++;
      }
    }
    for (let i = 1; i <= numCols; i++) {
      // const cell = cells[(i - 1) * numCols + locateFirst[1] - 1];
      let cell = convertMatrixToCell(locateSecond[0], i);
      if (cell.textContent === "1") {
        cell.setAttribute("id", (locateSecond[0] - 1) * numCols + (i - temp2));
        arrCache2.push(cell);
      } else if (cell.textContent === "0") {
        cell.setAttribute("id", locateSecond[0] * numCols - temp2);
        arrTemp2.push(cell);
        temp2++;
      }
    }
    let count1 = 0;
    let count2 = 0;
    while (count1 < numCols && count2 < numCols) {
      if (count1 < arrTemp1.length) {
        matrix[locateFirst[0]][numCols - count1] = "0";
      } else {
        matrix[locateFirst[0]][numCols - count1] = "1";
      }
      if (count2 < arrTemp2.length) {
        matrix[locateSecond[0]][numCols - count2] = "0";
      } else {
        matrix[locateSecond[0]][numCols - count2] = "1";
      }
      count1++;
      count2++;
    }
    arrCache1.push(...arrTemp1.reverse());
    arrCache1.forEach((item, i) => {
      item.style.right = "auto";
      item.style.left = i * 48 + "px";
    });
    arrCache2.push(...arrTemp2.reverse());
    arrCache2.forEach((item, i) => {
      item.style.right = "auto";
      item.style.left = i * 48 + "px";
    });
  }
  if (remainCell.length !== 0) {
    while (numRamdomRotate > 0) {
      if (Math.floor(Math.random() * 2 + 1) === 1) {
        remainCell[
          Math.floor(Math.random() * remainCell.length)
        ].style.transform = "rotate(90deg)";
      } else {
        remainCell[
          Math.floor(Math.random() * remainCell.length)
        ].style.transform = "rotate(180deg)";
      }
      numRamdomRotate--;
    }
  }
}

// hàm set up lại ID cho cell khi đã thay đổi hàng và cột
function resetCellID() {
  cells.forEach((cell) => {
    cell.textContent = "1";
  });
}

// ve duong an khi chon dung the
let lines = document.querySelectorAll(".line");
function drawLine(path, locateFirst, locateSecond) {
  let ori = [];
  for (let i = 0; i < path.length - 1; i++) {
    if (path[i].x == path[i + 1].x) {
      if (path[i].y == path[i + 1].y - 1) {
        ori.push("r");
      } else {
        ori.push("l");
      }
    } else {
      if (path[i].x == path[i + 1].x - 1) {
        ori.push("d");
      } else {
        ori.push("u");
      }
    }
  }
  // console.log('ori: ' + ori)
  // let numOri = [];
  // let numR = 0;
  // let numL = 0;
  // let numU = 0;
  // let numD = 0;
  // ori.forEach(item => {
  //     switch (item) {
  //         case 'r': numR++; break;
  //         case 'l': numL++; break;
  //         case 'u': numU++; break;
  //         case 'd': numD++; break;
  //         default: break;
  //     }
  // })
  // numOri.push(numR);
  // numOri.push(numL);
  // numOri.push(numU);
  // numOri.push(numD);

  // tạo map để lưu hướng với số lần hướng đó xuất hiện
  // let numOri = new Map();
  // let currentElement = null;
  // let count = 0;
  // ori.forEach(item => {
  //     if (item === currentElement) {
  //         count++;
  //     } else {
  //         if (currentElement !== null) {
  //             numOri.set(currentElement, count);
  //         }
  //         currentElement = item;
  //         count = 1;
  //     }
  // });
  // // thêm phần tử cúi vào map vì nó ko được duyệt lại khi chạy hết foreach
  // if (currentElement !== null) {
  //     numOri.set(currentElement, count);
  // }

  // tạo mảng json để lưu hướng với số lần hướng đó xh thay cho map vì map ko lưu được các key nhìu lần
  let numOri = [];
  let currentKey = null;
  let count = 0;

  ori.forEach((item) => {
    if (item === currentKey) {
      count++;
    } else {
      if (currentKey !== null) {
        numOri.push({ [currentKey]: count });
      }
      currentKey = item;
      count = 1;
    }
  });

  // thêm phần tử cúi vào map vì nó ko được duyệt lại khi chạy hết foreach
  if (currentKey !== null) {
    numOri.push({ [currentKey]: count });
  }
  // console.log(numOri)

  let turn = [locateFirst[0], locateFirst[1]]; // xác định tọa độ lúc đổi hướng giúp nối các line tiện hơn
  lines.forEach((line, index) => {
    // console.log('turnsssssssssssssssss : ' + turn)
    let breaked0 = false;
    numOri.forEach((item, i) => {
      if (!breaked0 && i == index) {
        // danh sách các key trong numOri
        let breaked = false;
        let keys = Object.keys(item);
        // Duyệt qua từng key và giá trị tương ứng
        keys.forEach((key) => {
          // console.log("Key:", key, "Value:", item[key]);
          // console.log('turnsssssssssssssssss : ' + turn + "--" + breaked)
          if (item[key] != 0 && !breaked) {
            showLine(key, item[key], turn);
            if (key == "r") {
              turn[1] += item[key];
            } else if (key == "l") {
              turn[1] -= item[key];
            } else if (key == "u") {
              turn[0] -= item[key];
            } else if (key == "d") {
              turn[0] += item[key];
            }
            item[key] = 0; // set lại giá trị để line sau không bị ghi lại
            // console.log("==========ORI========" + key);
            breaked = true;
          }
        });
        breaked0 = true;
      }
    });
    // for (let i of numOri.keys()) { // r - l - u- d
    //     if (numOri.get(i) != 0) {
    //         showLine(i, numOri.get(i), turn);
    //         if (i == 'r') {
    //             turn[1] += numOri.get(i)
    //         } else if (i == 'l') {
    //             turn[1] -= numOri.get(i)
    //         } else if (i == 'u') {
    //             turn[0] -= numOri.get(i)
    //         } else if (i == 'd') {
    //             turn[0] += numOri.get(i)
    //         }
    //         console.log('turnsssssssssssssssss : ' + turn)
    //         numOri.set(i, 0); // set lại giá trị để line sau không bị ghi lại
    //         console.log("==========ORI========" + i);
    //         break;
    //     }
    // }
    function showLine(lineType, len, turn) {
      //len : tinh chieu dai cua line, index : xac dinh huong di la r/l/u/d
      line.style.visibility = "visible";
      // line.classList.add('.Hline');
      switch (lineType) {
        case "r":
          line.classList.add("Hline");
          break;
        case "l":
          line.classList.add("Hline");
          break;
        case "u":
          line.classList.add("Vline");
          break;
        case "d":
          line.classList.add("Vline");
          break;
        default:
          break;
      }
      let widthLine = parseFloat(
        window.getComputedStyle(line).getPropertyValue("width").valueOf()
      );
      let heightLine = parseFloat(
        window.getComputedStyle(line).getPropertyValue("height").valueOf()
      );
      let topLine = parseFloat(
        window.getComputedStyle(line).getPropertyValue("top").valueOf()
      );
      let leftLine = parseFloat(
        window.getComputedStyle(line).getPropertyValue("left").valueOf()
      );
      // console.log('======== newWidthLine:' + (widthLine))
      // console.log('======== newHeightLine:' + (heightLine))
      // console.log('======== newTopLine:' + (topLine - (locateFirst[0] * 45)))
      // console.log('======== newLeftLine:' + (leftLine + (locateFirst[1] * 45)))
      switch (lineType) {
        case "r":
          line.style.width = widthLine + widthLine * (len - 1) + "px";
          // line.style.height = heightLine;
          line.style.top = topLine + (turn[0] - 1) * 48 + "px"; // fix
          line.style.left = leftLine + (turn[1] - 1) * 48 + "px";
          break;
        case "l":
          line.style.width = widthLine + widthLine * (len - 1) + "px";
          // line.style.height = heightLine;
          line.style.top = topLine + (turn[0] - 1) * 48 + "px";
          line.style.left = leftLine + (turn[1] - (len + 1)) * 48 + "px";
          break;
        case "u":
          // line.style.width = widthLine;
          line.style.height = heightLine + heightLine * (len - 1) + "px";
          line.style.top = topLine + (turn[0] - (len + 1)) * 48 + "px"; // top : true , left : fasle
          line.style.left = leftLine + (turn[1] - 1) * 48 + "px"; // top : true, left : true
          break;
        case "d":
          // line.style.width = widthLine;
          line.style.height = heightLine + heightLine * (len - 1) + "px";
          line.style.top = topLine + (turn[0] - 1) * 48 + "px"; // -/+
          line.style.left = leftLine + (turn[1] - 1) * 48 + "px";
          break;
        default:
          break;
      }
      // if (lineType === 'Hline') {
      // line.style.width = widthLine + widthLine * (len - 1) + "px";
      // } else {
      // line.style.height = heightLine + heightLine * (len - 1) + "px";
      // }
      // line.style.top = topLine + ((locateFirst[0]-1) * 48) + "px";
      // line.style.left = leftLine + ((locateFirst[1]-1) * 48) + "px";
    }
    setTimeout(function () {
      line.removeAttribute("style");
      while (line.classList.length != 1) {
        line.classList.remove(line.classList.item(1));
      }
    }, 300);
  });
}

let running = false;
// thay đổi trạng thái game thành pause
function stopTimeLine() {
  running = false;
}

// reset lại timeline khi chuyển level/ chơi lại game
function resetTimeline() {
  targetWidth = 0;
  timeline.style.transition = "none"; // hủy transition
  timeline.style.width = currentWidth + "px"; // thiết lập lại chiều rộng ban đầu
}

// Biến lưu trữ ID của interval (vì nếu ko đặt biến để set lại giá trị thì khi để vào vòng lặp các buttonLevel sẽ bị setInterval() nhiều lần dẫn đến timeline sẽ đi nhanh hơn)
let intervalID;

// hàm để giảm timeline khi chọn sai trong level5-6 + fix thêm hiệu ứng giảm time
function decreaseWidth() {
  console.log("minus timeline successful");
  targetWidth -= 10;
  // kiểm tra xem độ dài timeline đủ không, nếu không thì dừng timeline
  if (targetWidth >= 0) {
    timeline.classList.add("shake");
    setTimeout(() => {
      timeline.classList.remove("shake");
    }, 400);
    timeline.style.transition = "width 0.5s ease-in-out";
    timeline.style.width = targetWidth + "px";
  } else {
    clearInterval(intervalID);
    return;
  }
  if (targetWidth < 10) {
    loseGame();
  }
}

let plusTime = document.querySelector(".plusTime");
let imgPlusTime = document.querySelectorAll(".plusTime img");
// hàm để tăng timeline khi chọn sai trong level5-6 + fix thêm hiệu ứng giảm time
function increaseWidth() {
  // kiểm tra xem độ dài timeline đủ không, nếu không thì dừng timeline
  console.log("targetWidth + 10  : " + (targetWidth + 10));
  console.log(targetWidth + 10 <= 450);
  plusTime.style.display = "flex";
  imgPlusTime.forEach((img) => {
    img.style.animation = "plus 2s linear";
  });
  setTimeout(() => {
    imgPlusTime.forEach((img) => {
      plusTime.style.display = "none";
      img.style.animation = null;
    });
  }, 2000);
  if (targetWidth + 20 <= 450) {
    console.log("plus timeline successful");
    targetWidth += 20;
    timeline.style.transition = "width 0.5s ease-in-out";
    timeline.style.width = targetWidth + "px";
  } else {
    console.log("plus timeline fail");
    targetWidth += 450 - targetWidth;
    return;
  }
}

// thiết lập thời gian cho 1 level
function initializeTimeLine() {
  // Tính toán chiều dài hiện tại của .timeline
  // console.log('targetWidth:' + targetWidth)
  if (targetWidth == 0) {
    targetWidth = 450;
  }

  // Dừng interval cũ trước khi tạo một interval mới
  clearInterval(intervalID);

  // mỗi 1s set lại width cho timeline bằng targetWidth
  intervalID = setInterval(() => {
    if (currentLevel === "4" || currentLevel === "5" || currentLevel === "6") {
      targetWidth -= 3; // giảm 3px mỗi 1s
    } else if (currentLevel === "2" || currentLevel === "3") {
      targetWidth -= 2; // giảm 2px mỗi 1s
    } else {
      targetWidth -= 1; // giảm 1px mỗi 1s
    }
    if (!running) {
      clearInterval(intervalID); // Dừng interval
      return; // Kết thúc hàm
    }

    // nếu width = 0 thì kết thúc
    if (targetWidth >= 0) {
      timeline.style.transition = "width 0.5s ease-in-out";
      timeline.style.width = targetWidth + "px";
    } else {
      clearInterval(intervalID);
    }
    if (targetWidth < 2) {
      targetWidth = 0;
      loseGame();
    }
  }, 1000); // mỗi giây lặp lại việc giảm kích thước của timeline
}

// kết thúc game và hiện bảng điểm
function loseGame() {
  loseScore.textContent = score.textContent;
  opacity_bgk1.style.display = "block";
  board_lose.style.display = "block";
}

//play
// initializeGame();
function initializeGame() {
  updateCellIds();
  initializeBoardUI();
  initializeBoardIMG();
  initializeScore();
  restoreBoard();
  resetTimeline();
  // statusGame.textContent = `${currentPlayer}'s turn`;
  running = true;
  currentWidth = parseFloat(window.getComputedStyle(timeline).width);
  resetButtonLevel();
  checkLevel();
  initializeTimeLine();
}
