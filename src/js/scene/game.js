class GameScene extends Phaser.Scene {

    constructor () {
        super({ key: 'GameScene' });
        this.fakeNews = null;
    }

    preload () {
    }

    create () {
        let b1 = this.add.bitmapText(700, -400, 'azo-fire', '12', 200);
        let b2 = this.add.bitmapText(700, -400, 'azo-fire', '12', 200);

        var tween1 = this.tweens.add({
            targets: b1,
            y: 200,
            duration: 1000,
            ease: 'Power2'
        });
        var tween2 = this.tweens.add({
            targets: b2,
            delay: 400,
            y: 0,
            duration: 1000,
            ease: 'Power2'
        });

        this.fakeNews = this.sound.add('fake_news');

        this.input.on('pointerup', function(pointer, localX, localY, event){
            this.scene.fakeNews.play();
            this.scene.scene.start('TitleScene');
        });
    }

    update() {

    }

}
