//2012-01-09 player bearをclass化する

enchant();
SCREEN_WIDTH = 320;
SCREEN_HEIGHT = 320;

var Player = enchant.Class.create(enchant.Sprite, {
    initialize: function(x){
		this.KUMA_WIDTH = 20;
		this.KUMA_HEIGHT = 30;
		this.KUMA_Y = 50;
		this.dir = 0;		//進行方向 0:右(right)、1:左(left)
        this.walk = 0;		//歩行ポーズ 0:停止 1:右足 2:左足
		this.step = 5;
		
	    enchant.Sprite.call(this, this.KUMA_WIDTH, this.KUMA_HEIGHT);
        this.image = game.assets['bear.gif'];
		this.x = x;
		this.y = this.KUMA_Y;
		this.frame = 0;	

        game.rootScene.addChild(this);
    },
    move_right: function(){
		this.dir = 0;
		if((this.walk == 0) || (this.walk == 2)){
			this.walk = 1;
		} else if(this.walk == 1) {
			this.walk = 2;
		}
		if (this.x < (SCREEN_WIDTH - this.KUMA_WIDTH)) {
			this.x += this.step;
		} else {
			this.x = SCREEN_WIDTH - this.KUMA_WIDTH;
		}
    },
    move_left: function(){
		this.dir = 1;
		if((this.walk == 0) || (this.walk == 2)){
			this.walk = 1;
		} else if(this.walk == 1) {
			this.walk = 2;
		}
		if (this.x > 0) {
			this.x -= this.step;
		} else {
			this.x = 0;
		}
    },
	move_stop: function(){
		if(this.walk !== 0) {
			game.assets['jump.wav'].play();
		}
		this.walk = 0;		
	},
	change_frame: function() {
		this.frame = this.dir * 3 + this.walk;
	}
});

window.onload = function() {
	//init 初期化
    var game = new Game(SCREEN_WIDTH, SCREEN_HEIGHT);
    game.preload('jump.wav', 'bear.gif');
	game.fps = 15;
	
	//title タイトル
	var label = new Label("Running Bear:");
	label.x = 0;
	label.y = 0;
	game.rootScene.addChild(label);	
	
    game.onload = function() {
	    game.assets['jump.wav'].play();

		var bear = new Player(0);
		
		game.rootScene.addEventListener('enterframe', function() {
			bear.change_frame();
			if(game.input.right) bear.move_right();
			if(game.input.left) bear.move_left();
			if(!(game.input.right || game.input.left)) bear.move_stop();
		});
		//game.rootScene.addChild(bear);

		//クマの位置をラベルに表示
		var label_potision = new Label();
		label_potision.x = 100;
		label_potision.y = 0;
				
      	label_potision.addEventListener('enterframe', function() {
			label_potision.text = bear.x;
		});
		game.rootScene.addChild(label_potision);
    };
    game.start();
};
