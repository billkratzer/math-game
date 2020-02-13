class BootScene extends Phaser.Scene {

    constructor () {
        super({ key: 'BootScene' });
    }

    preload () {
        this.load.bitmapFont('title', '/assets/font/title.png', '/assets/font/title.xml');
        this.load.bitmapFont('azo-fire', '/assets/font/azo-fire.png', '/assets/font/azo-fire.xml');

        this.load.audio('intro', [
            '/assets/audio/intro.ogg',
            '/assets/audio/intro.mp3'
        ]);


        this.load.audio('fake_news', [
            '/assets/audio/fake_news.ogg',
            '/assets/audio/fake_news.m4a'
        ]);

    }

    create () {
        this.scene.start('TitleScene');
    }

    update() {
        
    }

}
