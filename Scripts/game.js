"use strict";
//IIFE - Immediately Invoked Function Expression
//means -> self-executing anonymous function
var Game = (function () {
    // variable declarations
    var canvas = document.getElementsByTagName('canvas')[0];
    var stage;
    var currentSceneState;
    var currentScene;
    var assets;
    var textureAtlas;
    var oceanAtlas;
    var assetManifest = [
        { id: "ocean", src: "./Assets/images/ocean.gif" },
        { id: "atlas", src: "./Assets/sprites/atlas.png" },
        { id: "engine", src: "./Assets/audio/engine.ogg" },
        { id: "yay", src: "./Assets/audio/yay.ogg" },
        { id: "thunder", src: "./Assets/audio/thunder.ogg" },
    ];
    var spriteData = {
        "images": [
            "atlas.png"
        ],
        "framerate": 20,
        "frames": [
            [1, 1, 16, 16, 0, 0, 0],
            [19, 1, 62, 62, 0, 0, 0],
            [83, 1, 65, 65, 0, 0, 0],
            [150, 1, 65, 65, 0, 0, 0],
            [1, 68, 145, 138, 0, -36, -27],
            [148, 68, 150, 50, 0, 0, 0],
            [1, 208, 150, 50, 0, 0, 0],
            [153, 208, 150, 50, 0, 0, 0]
        ],
        "animations": {
            "bullet": { "frames": [0] },
            "island": { "frames": [1] },
            "placeholder": { "frames": [2] },
            "plane": { "frames": [3] },
            "cloud": { "frames": [4] },
            "button": { "frames": [5] },
            "restartButton": { "frames": [6] },
            "startButton": { "frames": [7] }
        }
    };
    var oceanData = {
        "images": {},
        "frames": [
            [0, 0, 640, 1440, 0, 0, 0],
        ],
        "animations": {
            "ocean": { "frames": [0] },
        }
    };
    function Preload() {
        assets = new createjs.LoadQueue(); // asset container
        config.Game.ASSETS = assets; // make a reference to the assets in the global config
        assets.installPlugin(createjs.Sound); // supports sound preloading
        assets.loadManifest(assetManifest);
        assets.on("complete", Start);
    }
    /**
     * This method initializes the CreateJS (EaselJS) Library
     * It sets the framerate to 60 FPS and sets up the main Game Loop (Update)
     */
    function Start() {
        console.log("%c Game Started!", "color: blue; font-size: 20px; font-weight: bold;");
        stage = new createjs.Stage(canvas);
        createjs.Ticker.framerate = config.Game.FPS;
        createjs.Ticker.on('tick', Update);
        stage.enableMouseOver(20);
        spriteData.images = [assets.getResult("atlas")];
        textureAtlas = new createjs.SpriteSheet(spriteData);
        config.Game.TEXTURE_ATLAS = textureAtlas;
        oceanData.images = [assets.getResult("ocean")];
        oceanAtlas = new createjs.SpriteSheet(oceanData);
        config.Game.OCEAN_ATLAS = oceanAtlas;
        currentSceneState = scenes.State.NO_SCENE;
        config.Game.SCENE = scenes.State.START;
    }
    /**
     * This function is triggered every frame (16ms)
     * The stage is then erased and redrawn
     */
    function Update() {
        if (currentSceneState != config.Game.SCENE) {
            Main();
        }
        currentScene.Update();
        stage.update();
    }
    /**
     * This is the main function of the Game (where all the fun happens)
     *
     */
    function Main() {
        console.log("%c Scene Switched...", "color: green; font-size: 16px;");
        // clean up
        if (currentSceneState != scenes.State.NO_SCENE) {
            currentScene.Clean();
            stage.removeAllChildren();
        }
        // switch to the new scene
        switch (config.Game.SCENE) {
            case scenes.State.START:
                console.log("switch to Start Scene");
                currentScene = new scenes.Start();
                break;
            case scenes.State.PLAY:
                console.log("switch to Play Scene");
                currentScene = new scenes.Play();
                break;
            case scenes.State.END:
                console.log("switch to End Scene");
                currentScene = new scenes.End();
                break;
        }
        currentSceneState = config.Game.SCENE;
        stage.addChild(currentScene);
    }
    window.addEventListener('load', Preload);
})();
//# sourceMappingURL=game.js.map