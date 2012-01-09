//2012-01-09 player bear��class������

enchant();
SCREEN_WIDTH = 320;
SCREEN_HEIGHT = 320;

var Player = enchant.Class.create(enchant.Sprite, {
    initialize: function(x){
		this.KUMA_WIDTH = 20;
		this.KUMA_HEIGHT = 30;
		this.KUMA_Y = 50;
		this.dir = 0;		//�ʹ����� 0:��(right)��1:��(left)
        this.walk = 0;		//��ԥݡ��� 0:��� 1:��­ 2:��­
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
	//init �����
    var game = new Game(SCREEN_WIDTH, SCREEN_HEIGHT);
    game.preload('jump.wav', 'bear.gif');
	game.fps = 15;
	
	//title �����ȥ�
	var label = new Label("Running Bear:");
	label.x = 0;
	label.y = 0;
	game.rootScene.addChild(label);	
	
    game.onload = function() {
	    game.assets['jump.wav'].play();

		var bear = new Sprite(20, 30);
      	bear.image = game.assets['bear.gif'];
		bear.dir = 0;		//�ʹ����� 0:��(right)��1:��(left)
        bear.walk = 0;		//��ԥݡ��� 0:��� 1:��­ 2:��­
		//var bear = new Player(0);
		
		bear.addEventListener('enterframe', function() {
			bear.frame = bear.dir * 3 + bear.walk;
			//bear.change_frame;
			
			//go to right ���ؿʤ�
			if(game.input.right) {
				//bear.move_right;
				bear.dir = 0;
				if((bear.walk == 0) || (bear.walk == 2)){
					bear.walk = 1;
				} else if(bear.walk == 1) {
					bear.walk = 2;
				}
				
				if (bear.x < 300) {
					bear.x += 5;
				} else {
					bear.x = 300;
				}
			}
			
			//go to left ���ؿʤ�
			if(game.input.left) {
				//bear.move_left;
				bear.dir = 1;
				if((bear.walk == 0) || (bear.walk == 2)){
					bear.walk = 1;
				} else if(bear.walk == 1) {
					bear.walk = 2;
				}

				if (bear.x > 0) {
					bear.x -= 5;
				} else {
					bear.x = 0;
				}
			}
			
			//stop ���
			if(!(game.input.right || game.input.left)) {
				//bear.move_stop;
				if(bear.walk !== 0) {
					game.assets['jump.wav'].play();
				}
				bear.walk = 0;				
			}
			bear.y = 50;
		});
		game.rootScene.addChild(bear);

		//���ޤΰ��֤��٥��ɽ��
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
