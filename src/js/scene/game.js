class GameScene extends Phaser.Scene {


    constructor () {
        super({ key: 'GameScene' });

        this.stuff = {};
        this.stuff.sounds = {};
        this.stuff.bitmaps = {};

        this.stuff.GAME_LENGTH_SECONDS = 5;

        this.stuff.score = 0;
        this.stuff.right = 0;
        this.stuff.wrong = 0;
        this.stuff.streak = 0;
    }

    preload () {
    }

    newRandomProblem() {
        let random = Phaser.Math.RND;
        let m1 = random.integerInRange(0, 9);
        let m2 = random.integerInRange(0, 9);
        this.answer = m1 * m2;
        let symbol = "x";

        let xPos = 0;
        let yPos = -200;
        let b1 = this.add.bitmapText(xPos, yPos, 'title', m1, 200);
        xPos = xPos + b1.width + 5;
        let b2 = this.add.bitmapText(xPos, yPos, 'title', symbol, 200);
        xPos = xPos + b2.width + 5;
        let b3 = this.add.bitmapText(xPos, yPos, 'title', m2, 200);
        xPos = xPos + b3.width + 5;
        let b4 = this.add.bitmapText(xPos, yPos, 'title', "=", 200);
        xPos = xPos + b4.width + 5;

        let bitmaps = [b1, b2, b3, b4];

        // let g = this.add.graphics();
        // var thickness = 4;
        // var color = 0x00ff00;
        // var alpha = 1;
        // g.lineStyle(thickness, color, alpha);
        // for (let i = 0; i < bitmaps.length; i++) {
        //     let bitmap = bitmaps[i];
        //     let size = bitmap.getTextBounds().global;
        //     g.strokeRect(size.x, size.y, size.width, size.height);
        // }
        //
        // return;

        let delay = 0;
        for (let i = 0; i < bitmaps.length; i++) {
            let size = bitmaps[i].getTextBounds().global;

            this.tweens.add({
                targets: bitmaps[i],
                y: 200,
                delay: delay,
                duration: 600,
                ease: 'Power2'
            });
            delay = delay + 200;

            bitmaps[i].on("destroy", function() {
               console.log("Destroy!");
            });
        }

        this.answerText = this.add.bitmapText(xPos, 200, 'title', "", 200);
        this.guess = "";

        this.answerComponents = [b1, b2, b3, b4, this.answerText];
    }

    playNumber(number) {
        if (this.guess.length >= 3) {
            this.stuff.sounds.alert.play();
            this.cameras.main.shake(300);
            return;
        }
        this.guess = this.guess + number;
        this.answerText.setText(this.guess);
    }

    playGuess() {
        if (this.guess != this.answer) {
            this.stuff.wrong++;
            this.stuff.streak = 0;

            this.stuff.sounds.wrong.play();
            this.cameras.main.shake(600);

            this.updateScore();
            return;
        }

        this.stuff.right++;
        this.stuff.streak++;
        this.stuff.score = this.stuff.score + this.stuff.streak * 10;
        this.updateScore();

        for (let i = 0; i < this.answerComponents.length; i++) {
            this.tweens.add({
                targets: this.answerComponents[i],
                alpha: 0,
                delay: 0,
                duration: 500,
                onComplete: function() {
                    this.destroy();
                },
                onCompleteScope: this.answerComponents[i]
            });
        }
        this.time.delayedCall(500, this.newRandomProblem, [], this);
    }

    playDelete() {
        if (this.guess && this.guess.length > 0) {
            this.guess = this.guess.substr(0, this.guess.length - 1);
            this.answerText.setText(this.guess);
        }
    }

    addButton(text, x, y, tint, hoverTint) {
        const BUTTON_WIDTH = 150;
        const BUTTON_HEIGHT = 150;

        let i1 = this.add.image(BUTTON_WIDTH / 2, BUTTON_HEIGHT / 2, "square_button_150");
        i1.setOrigin(0.5, 0.5);
        i1.setTint(tint);

        let t1 = this.add.text(BUTTON_WIDTH / 2, BUTTON_HEIGHT / 2, text,
            { fontFamily: 'Arial', fontSize: 48, color: '#eee' }
        );
        t1.setOrigin(0.5, 0.5);

        let container = this.add.container(x, y, [ i1, t1 ]);
        container.setInteractive(new Phaser.Geom.Rectangle(0, 0, BUTTON_WIDTH, BUTTON_HEIGHT), Phaser.Geom.Rectangle.Contains);

        container.on('pointerover', function() {
            this.setTint(hoverTint);
        }, i1);

        container.on('pointerout', function() {
            this.setTint(tint);
        }, i1);

        container.on('pointerup', function() {
            this.scene.playNumber(this.data.get('value'));
        }, container);

        return container;
    }

    addBigButton(text, x, y, tint, hoverTint, keyCode) {
        const BUTTON_WIDTH = 200;
        const BUTTON_HEIGHT = 150;

        let i1 = this.add.image(BUTTON_WIDTH / 2, BUTTON_HEIGHT / 2, "rect_button_200");
        i1.setOrigin(0.5, 0.5);
        i1.setTint(tint);

        let t1 = this.add.text(BUTTON_WIDTH / 2, BUTTON_HEIGHT / 2, text,
            { fontFamily: 'Arial', fontSize: 48, color: '#eee' }
        );
        t1.setOrigin(0.5, 0.5);

        let container = this.add.container(x, y, [ i1, t1 ]);
        container.setInteractive(new Phaser.Geom.Rectangle(0, 0, BUTTON_WIDTH, BUTTON_HEIGHT), Phaser.Geom.Rectangle.Contains);

        container.on('pointerover', function() {
            this.setTint(hoverTint);
        }, i1);

        container.on('pointerout', function() {
            this.setTint(tint);
        }, i1);

        container.on('pointerup', function() {
            this.scene.keyPress(keyCode);
        }, container);

        return container;
    }

    keyPress(code) {
        if ((code >= 48) && (57)) {
            this.playNumber(code - 48);
        }
        else if (code == 8) {
            this.playDelete();
        }
        else if (code == 13) {
            this.playGuess();
        }
        else if (code == 27) {
            // TODO: Add "Game Over" Code
        }
    }

    create () {
        const TINT = 0x0AC7E3;
        const HOVER_TINT = 0x76ECFE;

        let buttonTexts = [ "1", "2", "3", "4", "5", "6", "7", "8", "9", "0" ];

        for (let y = 0; y < 2; y++) {
            for (let x = 0; x < 5; x++) {
                let button = this.addButton(
                    buttonTexts[ y * 5 + x],
                    x * 160,
                    config.height - (2 - y) * 160,
                    TINT,
                    HOVER_TINT
                );
                button.data = new Phaser.Data. DataManager(button, new Phaser.Events.EventEmitter());
                button.data.set("value", buttonTexts[y * 5 + x]);
                button.data.set("keyCode", 48);
            }
        }



        this.addBigButton("GO!", 6 * 160 - 150, config.height - (2 * 160), 0x5ECF5C, 0xA6F5A5, 13);
        this.addBigButton("delete", 6 * 160 - 150, config.height - (1 * 160), TINT, HOVER_TINT, 8);

        this.input.keyboard.on('keyup', function (event) {
            console.log("keycode: " + event.keyCode);
            this.keyPress(event.keyCode);
        }, this);

        this.stuff.sounds.alert = this.sound.add("alert");
        this.stuff.sounds.wrong = this.sound.add("creepy_10");
        this.stuff.sounds.music = this.sound.add("bubble_gum");

        this.stuff.sounds.music.play({ loop: true });

        this.newRandomProblem();

        // Score
        let b1 = this.add.bitmapText(10, 0, 'score', 'Score: ');
        b1.setOrigin(0, 0);
        this.stuff.bitmaps.score = b1;

        let b2 = this.add.bitmapText(400, 0, 'score', 'Streak: ');
        b2.setOrigin(0, 0);
        this.stuff.bitmaps.streak = b2;

        let b3 = this.add.bitmapText(1024 - 10, 0, 'score', 'Time: ');
        b3.setOrigin(1, 0);
        this.stuff.bitmaps.remaining = b3;

        this.updateScore();

        this.stuff.timer = this.time.addEvent({
            delay: this.stuff.GAME_LENGTH_SECONDS * 1000,
            callback: this.gameOver,
            callbackScope: this
        });
    }

    gameOver() {
        this.sound.stopAll();
        this.scene.start('GameOverScene');
    }

    updateScore() {
        this.stuff.bitmaps.score.setText("Score : " + this.stuff.score);
        this.stuff.bitmaps.streak.setText("Streak : " + this.stuff.streak);
    }

    update() {
        let r = Math.floor(this.stuff.GAME_LENGTH_SECONDS - this.stuff.timer.getElapsedSeconds()) + 1;
        this.stuff.bitmaps.remaining.setText('Time: ' + r + ' secs');
    }

}
