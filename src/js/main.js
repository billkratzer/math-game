var config = {
    type: Phaser.WEBGL,
    width: 1024,
    height: 768,
    pixelArt: true,
    parent: "game",
    scene: [ SplashScene, BootScene, TitleScene, SelectGameScene, CountDownScene, GameScene, GameOverScene  ],
    audio: {
        disableWebAudio: true
    }
};

var game = new Phaser.Game(config);

var globals = {
    problem: null
}

