var config = {
    type: Phaser.WEBGL,
    pixelArt: true,
    parent: "game",
    scene: [ BootScene, TitleScene, GameScene  ],
    audio: {
        disableWebAudio: true
    }
};

var main = new Phaser.Game(config);

