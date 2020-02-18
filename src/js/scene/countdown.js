class CountDownScene extends Phaser.Scene {

    constructor () {
        super({ key: 'CountDownScene' });
    }

    preload () {
    }

    create () {
        console.log("countdown");

        var grid = this.add.grid(0, 0, config.width, config.height, 64, 64, 0x000000).setAltFillStyle(0x111111).setOutlineStyle();
        grid.setOrigin(0, 0);
        grid.setAlpha(1);

        var delay = 300;
        let duration = 1100;
        for (let n = 5; n > 0; n--) {
            let bt = this.add.bitmapText(config.width / 2, config.height / 2, 'title', n, 2000);
            bt.setOrigin(0.5, 0.5);
            bt.setAlpha(0);

            this.tweens.add({
                targets: bt,
                delay: delay,
                scale: 0,
                alpha: 1,
                duration: duration
            });

            delay = delay + duration;

        }

        this.time.delayedCall(delay, function() {
            this.scene.start('GameScene');
        }, [], this);


        this.countdownSound = this.sound.add("countdown");
        this.countdownSound.play();
    }

    update() {
        
    }

}
