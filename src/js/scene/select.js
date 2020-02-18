class SelectGameScene extends Phaser.Scene {

    constructor () {
        super({ key: 'SelectGameScene' });
    }

    preload () {
    }

    addButton(text, y, clickCallBack) {
        const BUTTON_WIDTH = 400;
        const BUTTON_HEIGHT = 100;

        let i1 = this.add.image(BUTTON_WIDTH / 2, BUTTON_HEIGHT / 2, "blue_button_400");
        i1.setOrigin(0.5, 0.5);

        let t1 = this.add.text(BUTTON_WIDTH / 2, BUTTON_HEIGHT / 2, text,
            { fontFamily: 'Arial', fontSize: 24, color: '#eee' }
        );
        t1.setOrigin(0.5, 0.5);

        let container = this.add.container((config.width - 400) / 2, y, [ i1, t1 ]);
        container.setInteractive(new Phaser.Geom.Rectangle(0, 0, 400, 100), Phaser.Geom.Rectangle.Contains);

        container.on('pointerover', function() {
            this.setTint(0xccccff);
        }, i1);

        container.on('pointerout', function() {
            this.clearTint();
        }, i1);

        container.on('pointerup', clickCallBack, this);

        return container;
    }

    create () {
        console.log("create");

        var grid = this.add.grid(0, 0, config.width, config.height, 64, 64, 0x000000).setAltFillStyle(0x111111).setOutlineStyle();
        grid.setOrigin(0, 0);
        grid.setAlpha(1);

        this.addButton("Multiplication", 200, this.nextScene);
        this.addButton("Division", 400, this.nextScene);

        //let r1 = this.add.rectangle(config.width / 2, config.height / 2, 400, 100, 0x6666ff);
        //r1.setOrigin(0.5, 0.5);
    }

    nextScene() {
        this.scene.start('CountDownScene');
    }

    update() {
        
    }

}
