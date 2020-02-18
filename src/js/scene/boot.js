class BootScene extends Phaser.Scene {

    constructor () {
        super({ key: 'BootScene' });
    }

    loadAudio(name) {
        return this.load.audio(name, [
            "/assets/audio/" + name + ".ogg",
            "/assets/audio/" + name + ".mp3"
        ]);
    }
    
    loadFont(name) {
        return this.load.bitmapFont(name, 
            "/assets/font/" + name + ".png", 
            "/assets/font/" + name + ".xml"
        );
    }

    preload () {
        this.loadFont("azo-fire");
        this.loadFont("score");
        this.loadFont("title");

        this.loadAudio("alert");
        this.loadAudio("creepy_10");
        this.loadAudio("intro");
        this.loadAudio("countdown");
        this.loadAudio("bubble_gum");

        this.load.audio('fake_news', [
            '/assets/audio/fake_news.ogg',
            '/assets/audio/fake_news.m4a'
        ]);

        this.load.image("blue_button_80", "/assets/image/blue_button_80px.png");
        this.load.image("blue_button_400", "/assets/image/blue_button_400px.png");
        this.load.image("square_button_150", "/assets/image/square_button_150px.png");
        this.load.image("rect_button_200", "/assets/image/rect_button_200px.png");
    }

    create () {
        //this.scene.start('GameScene');
        // this.scene.start('SelectGameScene');
        this.scene.start('TitleScene');
    }

    update() {
        
    }

}
