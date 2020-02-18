class TitleScene extends Phaser.Scene {

    constructor () {
        super({ key: 'TitleScene' });
    }

    preload () {
    }

    randomMultiplyText() {
        let random = Phaser.Math.RND;
        let m1 = random.integerInRange(0, 9);
        let m2 = random.integerInRange(0, 9);
        let answer = m1 * m2;
        return "" + m1 + " x " + m2 + " = " + answer;
    }

    randomDivisionText() {
        let random = Phaser.Math.RND;
        let m1 = random.integerInRange(0, 9);
        let m2 = random.integerInRange(0, 9);
        let answer = m1 * m2;
        return "" + answer + " / " + m1 + " = " + m2;
    }

    randomAdditionText() {
        let random = Phaser.Math.RND;
        let a1 = random.integerInRange(0, 9);
        let a2 = random.integerInRange(0, 9);
        let answer = a1 + a2;
        return "" + a1 + " + " + a2 + " = " + answer;
    }

    randomSubtractionText() {
        let random = Phaser.Math.RND;
        let n1 = random.integerInRange(0, 9);
        let n2 = random.integerInRange(0, 9);
        if (n1 > n2) {
            let answer = n1 - n2;
            return "" + n1 + " - " + n2 + " = " + answer;
        }
        else {
            let answer = n2 - n1;
            return "" + n2 + " - " + n1 + " = " + answer;
        }

    }

    randomMathText() {
        let choice = Phaser.Math.RND.pick([1, 2, 3, 4]);

        switch (choice) {
            case 1:
                return this.randomAdditionText();
            case 2:
                return this.randomSubtractionText();
            case 3:
                return this.randomMultiplyText();
            case 4:
                return this.randomDivisionText();
        }
        return this.randomDivisionText();
    }

    addRandomMathEquation(x, y, xRange, yRange) {
        let random = Phaser.Math.RND;

        let text = this.add.text(
            x + random.integerInRange(0 - xRange, 0 + xRange),
            y + random.integerInRange(0 - yRange, 0 + yRange),
            this.randomMathText(),
            { fontFamily: 'Arial', fontSize: 12 + random.integerInRange(0, 12), color: '#333' }
        );

        text.rotation = 2 * Math.PI / 360 * random.integerInRange(-30, 30);
    }

    create () {

        // Create random background equations
        for (var x = 0; x < 1024; x = x + 100) {
            for (var y = 0; y < 800; y = y + 100) {
                this.addRandomMathEquation(x, y, 40, 40);
            }
        }

        // The main title
        let b1 = this.add.bitmapText(-500, 220, 'title', 'MATH', 200);
        b1.setOrigin(0.5, 0.5);

        let b2 = this.add.bitmapText(1204 + 500, 380, 'title', 'GAME', 200);
        b2.setOrigin(0.5, 0.5);

        this.tweens.add({
            targets: b1,
            x: 512,
            duration: 1000,
            ease: 'Power2'
        });
        this.tweens.add({
            targets: b2,
            delay: 400,
            x: 512,
            duration: 1000,
            ease: 'Power2'
        });

        let textStart = this.add.text(
            512,
            1500,
            "Click or Press Any Key to Start",
            { fontFamily: 'Arial', fontSize: 24, color: '#eee' }
        );
        textStart.setOrigin(0.5, 0.5);

        this.tweens.add({
            targets: textStart,
            delay: 1000,
            y: 500,
            duration: 1000,
            ease: 'Power2'
        });

        this.introMusic = this.sound.add('intro');
        this.introMusic.play();

        this.input.on('pointerup', function(pointer, localX, localY, event) {
            this.nextScene();
        }, this);

        this.input.keyboard.on('keydown', function(pointer, localX, localY, event) {
            this.nextScene();
        }, this);

    }

    nextScene() {
        this.introMusic.stop();
        this.scene.start('SelectGameScene');
    }

    update() {
        
    }

}
