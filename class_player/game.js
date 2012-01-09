//2012-01-09 player bear��class������

enchant();
var Player = enchant.Class.create(enchant.Sprite, {
    initialize: function(x, y){
	}
});

window.onload = function() {
	//init �����
    var game = new Game(320, 320);
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

		bear.addEventListener('enterframe', function() {
			bear.frame = bear.dir * 3 + bear.walk;
			
			//go to right ���ؿʤ�
			if(game.input.right) {
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
