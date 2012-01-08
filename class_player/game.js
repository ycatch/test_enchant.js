//2012-01-05 ���(������)�ˤ��碌�ơ�����ʤ餹

enchant();

window.onload = function() {
    var game = new Game(320, 320);
    game.preload('jump.wav', 'bear.gif');
    game.onload = function() {
	    game.assets['jump.wav'].play();
		
		var bear = new Sprite(20, 30);
      	bear.image = game.assets['bear.gif'];
		
		bear.addEventListener('enterframe', function() {
			if(game.input.right) {
				game.assets['jump.wav'].play();
			}
		});
		game.rootScene.addChild(bear);
    };
    game.start();
};
