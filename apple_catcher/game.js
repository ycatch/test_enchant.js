//Bear catch apples.
//Copyright 2012 Yutaka Kachi
//This software licensed under MIT Licence.

//2012-01-24 マップ表示、両端をなくす

enchant();
SCREEN_WIDTH = 320;
SCREEN_HEIGHT = 320;

//操縦できる自キャラ
var Kuma = enchant.Class.create(enchant.Sprite, {
    initialize: function(x, y){
		this.KUMA_WIDTH = 20;
		this.KUMA_HEIGHT = 30;
		this.KUMA_Y = 226;
		this.dir = 0;		//進行方向 0:右(right)、1:左(left)
		this.walk = 0;		//歩行ポーズ 0:停止 1:右足 2:左足
		this.step = 5;
		
		enchant.Sprite.call(this, this.KUMA_WIDTH, this.KUMA_HEIGHT);
		this.image = game.assets['bear.gif'];
		this.x = x;
		this.y = this.KUMA_Y;
		this.frame = 0;

		this.addEventListener('enterframe', function() {
			if(game.input.right) {
				this.move_right();
			} else if(game.input.left) {
				this.move_left();
			} else {
				this.move_stop();
			}
			this.change_frame();
		});
		game.rootScene.addChild(this);
	},
	move_right: function() {
		this.dir = 0;
		if((this.walk == 0) || (this.walk == 2)){
			this.walk = 1;
		} else if(this.walk == 1) {
			this.walk = 2;
		}
		if (this.x < SCREEN_WIDTH) {
			this.x += this.step;
		} else {
			this.x = 0;
		}
	},
	move_left: function() {
		this.dir = 1;
		if((this.walk == 0) || (this.walk == 2)){
			this.walk = 1;
		} else if(this.walk == 1) {
			this.walk = 2;
		}
		if (this.x > 0) {
			this.x -= this.step;
		} else {
			this.x = SCREEN_WIDTH - this.KUMA_WIDTH;
		}
	},
	move_stop: function(){
		this.walk = 0;
	},
	change_frame: function() {
		this.frame = this.dir * 3 + this.walk;
	}
});

//複数表示される相手キャラ
var Apple = enchant.Class.create(enchant.Sprite, {
	initialize: function(x, y){
		this.WIDTH = 16;
		this.HEIGHT = 16;
		this.STEP = 5;
		
		enchant.Sprite.call(this, this.WIDTH, this.HEIGHT);
		this.image = game.assets['icon0.gif'];
		this.x = x;
		this.y = y;
		this.frame = 15;
		this.addEventListener('enterframe', function(){
			this.move_step();
		});
		game.rootScene.addChild(this);
	},
	move_step: function() {
		this.y += this.STEP;

		//当り判定
		if(this.intersect(player)){
			this.remove();
			game.assets['jump.wav'].play();
			game.score += 1;
		}
		//下端に到達
		if (this.y >= (SCREEN_HEIGHT - this.HEIGHT)) {
			this.remove();
		}
		scoreLabel.score = game.score;
	},
	remove: function(){
		game.rootScene.removeChild(this);
	}
});

window.onload = function() {
	game = new Game(SCREEN_WIDTH, SCREEN_HEIGHT); 
	game.fps = 15;
	game.score = 0;
	game.preload('bear.gif', 'icon0.gif',  'map2.gif', 'jump.wav');
	game.onload = function() {
		var blocks = [
			[-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1],
			[-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1],
			[-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1],
			[-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1],
			[-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1],
			[-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1],
			[-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1],
			[-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1],
			[-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1],
			[-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1],
			[-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1],
			[-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1],
			[-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1],
			[-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1],
			[-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1],
			[-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1],
			[4,4,4,4,4,4,4,4,4,4,4,4,4,4,4,4,4,4,4,4],
			[3,3,3,3,3,3,3,3,3,3,3,3,3,3,3,3,3,3,3,3],
		];　
        var map = new Map(16, 16);
        map.image = game.assets['map2.gif'];
        map.loadData(blocks);
		game.rootScene.addChild(map);
		game.rootScene.backgroundColor = 'rgb(153, 153, 255)';

		player = new Kuma(0, 0);
		targets = [];
		game.rootScene.addEventListener('enterframe', function(){
 			if((game.frame % 10) == 0){
				targets[game.frame] = new Apple(rand(300), 0);
			}
			if(timeLabel.time <= 0){
				game.end(game.score, "you get apples:" + game.score);
			}
		});

		timeLabel = new TimeLabel(0, 8, 'countdown');
		timeLabel.time = 30
		game.rootScene.addChild(timeLabel);

		scoreLabel = new ScoreLabel(190, 8);
		scoreLabel.label = "APPLE:";
		game.rootScene.addChild(scoreLabel);
		
		pad = new Pad();
		pad.x = 0;
		pad.y = 220;
		game.rootScene.addChild(pad);
	}
	game.start();
}