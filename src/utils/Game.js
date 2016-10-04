/**
 * Created by LzxHahaha on 2016/10/4.
 */

const STATUS = {
  STOP: 'STOP',
  START: 'START',
  PAUSE: 'PAUSE',
  OVER: 'OVER'
};

const JUMP_DELTA = 5;
const JUMP_MAX_HEIGHT = 53;

function Game(canvas, options) {
  let imageLoadCount = 0;
  let onImageLoaded = function () {
    ++imageLoadCount;
    if (imageLoadCount === 4) {
      __draw();
    }
  };

  // ==========
  // 资源文件
  // ==========
  let skyImage = new Image();
  let groundImage = new Image();
  let playerImage = new Image();
  let playerLeftImage = new Image();
  let playerRightImage = new Image();
  let playerDieImage = new Image();
  let obstacleImage = new Image();

  skyImage.onload = onImageLoaded;
  groundImage.onload = onImageLoaded;
  playerImage.onload = onImageLoaded;
  obstacleImage.onload = onImageLoaded;

  skyImage.src = "http://o8ehwy0fk.bkt.clouddn.com/game/img/cloud.png";
  groundImage.src = "http://o8ehwy0fk.bkt.clouddn.com/game/img/ground.png";
  playerImage.src = "http://o8ehwy0fk.bkt.clouddn.com/game/img/dinosaur.png";
  playerLeftImage.src = "http://o8ehwy0fk.bkt.clouddn.com/game/img/dinosaur_left.png";
  playerRightImage.src = "http://o8ehwy0fk.bkt.clouddn.com/game/img/dinosaur_right.png";
  playerDieImage.src = "http://o8ehwy0fk.bkt.clouddn.com/game/img/dinosaur_die.png";
  obstacleImage.src = 'http://o8ehwy0fk.bkt.clouddn.com/game/img/obstacle.png';

  // 配置
  this.options = Object.assign({}, {
    context: canvas.getContext('2d'),
    fps: 60,
    width: canvas.width,
    height: canvas.height,
    skySpeed: 40,
    groundSpeed: 100,
    skyImage: skyImage,
    groundImage: groundImage,
    playerImage: [playerImage, playerLeftImage, playerRightImage, playerDieImage],
    obstacleImage: obstacleImage,
    skyOffset: 0,
    groundOffset: 0
  }, options);

  // ==========
  // 状态数据
  // ==========
  this.status = STATUS.STOP;
  let timer = null;
  let score = 0;
  let highScore = window.localStorage['highScore'] || 0;
  let jumpHeight = 0;
  let jumpDelta = 0;
  let obstacles = [];
  let obstaclesBase = 1;
  let currentDistance = 0;
  let playerStatus = 0;

  // ==========
  // 私有函数
  // ==========

  // 每一帧的绘制函数
  let __draw = (function () {
    let level = Math.min(200, Math.floor(score / 100));
    let groundSpeed = (this.options.groundSpeed + level) / this.options.fps;
    let skySpeed = this.options.skySpeed / this.options.fps;
    let ctx = this.options.context;
    let width = this.options.width;
    let obstacleWidth = this.options.obstacleImage.width;
    let obstacleHeight = this.options.obstacleImage.height;
    let playerWidth = this.options.playerImage[0].width;
    let playerHeight = this.options.playerImage[0].height;

    ctx.clearRect(0, 0, this.options.width, this.options.height);
    ctx.save();

    // 云
    this.options.skyOffset = this.options.skyOffset < width
      ? (this.options.skyOffset + skySpeed)
      : (this.options.skyOffset - width);
    ctx.translate(-this.options.skyOffset, 0);
    ctx.drawImage(this.options.skyImage, 0, 0);
    ctx.drawImage(this.options.skyImage, this.options.skyImage.width, 0);

    // 地面
    this.options.groundOffset = this.options.groundOffset < width
      ? (this.options.groundOffset + groundSpeed)
      : (this.options.groundOffset - width);
    ctx.translate(this.options.skyOffset-this.options.groundOffset, 0);
    ctx.drawImage(this.options.groundImage, 0, 76);
    ctx.drawImage(this.options.groundImage, this.options.groundImage.width, 76);

    // 恐龙
    // 这里已经将坐标还原回左上角
    ctx.translate(this.options.groundOffset, 0);
    ctx.drawImage(this.options.playerImage[playerStatus], 80, 64 - jumpHeight);
    // 更新跳跃高度/速度
    jumpHeight = jumpHeight + jumpDelta;
    if (jumpHeight <= 1) {
      jumpHeight = 0;
      jumpDelta = 0;
    }
    else if (jumpHeight < JUMP_MAX_HEIGHT && jumpDelta > 0) {
      jumpDelta = (jumpHeight * jumpHeight) * 0.001033 - jumpHeight * 0.137 + 5;
    }
    else if (jumpHeight < JUMP_MAX_HEIGHT && jumpDelta < 0) {
      // jumpDelta = (jumpHeight * jumpHeight) * 0.00023 - jumpHeight *0.03 - 4;
    }
    else if (jumpHeight >= JUMP_MAX_HEIGHT) {
      jumpDelta = -JUMP_DELTA / 2.7;
    }

    // 分数
    let scoreText = (this.status === STATUS.OVER ? 'GAME OVER  ' : '') + Math.floor(score);
    ctx.font = "Bold 18px Arial";
    ctx.textAlign = "right";
    ctx.fillStyle = "#595959";
    ctx.fillText(scoreText, width - 30, 23);
    if (this.status === STATUS.START) {
      score += 0.5;
      currentDistance += groundSpeed;
      if (score % 4 === 0) {
        playerStatus = (playerStatus + 1) % 3;
      }
    }
    if (highScore) {
      ctx.textAlign = "left";
      ctx.fillText('HIGH  ' + Math.floor(highScore), 30, 23);
    }

    // 障碍
    let pop = 0;
    for (let i = 0; i < obstacles.length; ++i) {
      if (currentDistance >= obstacles[i].distance) {
        let offset = width - (currentDistance - obstacles[i].distance + groundSpeed);
        if (offset > 0) {
          ctx.drawImage(obstacleImage, offset, 84);
        }
        else {
          ++pop;
        }
      }
      else {
        break;
      }
    }
    for (let i = 0; i < pop; ++i) {
      obstacles.shift();
    }
    if (obstacles.length < 5) {
      obstacles = obstacles.concat(__obstaclesGenerate());
    }

    // 碰撞检测
    let firstOffset = width - (currentDistance - obstacles[0].distance + groundSpeed);
    if (90 - obstacleWidth < firstOffset
      && firstOffset < 60 + playerWidth
      && 64 - jumpHeight + playerHeight > 84) {
      this.stop();
    }

    ctx.restore();
  }).bind(this);

  let __setTimer = (function () {
    timer = setInterval(__draw, 1000 / this.options.fps);
  }).bind(this);

  let __clearTimer = function () {
    if (timer) {
      clearInterval(timer);
      timer = null;
    }
  };

  let __clear = function () {
    score = 0;
    jumpHeight = 0;
    currentDistance = 0;
    obstacles = [];
    obstaclesBase = 1;
    playerStatus = 0;
  };

  let __obstaclesGenerate = function () {
    let res = [];
    for (let i = 0; i < 10; ++i) {
      let random = Math.floor(Math.random() * 100) % 60;
      random = (Math.random() * 10 % 2 === 0 ? 1 : -1) * random;
      res.push({
        distance: random + obstaclesBase * 200
      });
      ++obstaclesBase;
    }
    return res;
  };
  obstacles = __obstaclesGenerate();

  // ==========
  // 函数
  // ==========

  // 开始
  this.start = (function () {
    if (this.status === STATUS.START) {
      return;
    }

    this.status = STATUS.START;
    __setTimer();
    this.jump();
  }).bind(this);

  // 暂停
  this.pause = (function () {
    if (this.status === STATUS.START) {
      this.status = STATUS.PAUSE;
      __clearTimer();
    }
  }).bind(this);

  // 继续
  this.goOn = (function () {
    if (this.status === STATUS.PAUSE) {
      this.status = STATUS.START;
      __setTimer();
    }
  }).bind(this);

  // 结束
  this.stop = function () {
    if (this.status === STATUS.OVER) {
      return;
    }
    this.status = STATUS.OVER;
    if (score > highScore) {
      highScore = score;
      window.localStorage['highScore'] = score;
    }
    playerStatus = 3;
    __clearTimer();
    __draw();
    __clear();
  };

  this.restart = (function () {
    obstacles = __obstaclesGenerate();
    this.start();
  }).bind(this);

  // ==========
  // 函数控制
  // ==========

  this.jump = (function () {
    if (jumpHeight > 2) {
      return;
    }
    jumpDelta = JUMP_DELTA;
    jumpHeight = JUMP_DELTA;
    this.jumpUp = true;
  }).bind(this);
}

Game.init = function (canvas, options) {
  window.onload = function () {
    if (window.innerWidth >= 680) {
      canvas.width = 680;
    }
    let game = new Game(canvas, options);

    function onSpacePress() {
      if (game.status === STATUS.STOP) {
        game.start();
      }
      else if (game.status === STATUS.START) {
        game.jump();
      }
      else if (game.status === STATUS.OVER) {
        game.restart();
      }
    }

    canvas.parentNode.onkeypress = function (e) {
      if (e.key === ' ') {
        onSpacePress();
      }
    };
    canvas.parentNode.onclick = onSpacePress;

    window.onBlur = game.pause;
    window.onFocus = game.goOn;
  }
};

export default Game;
