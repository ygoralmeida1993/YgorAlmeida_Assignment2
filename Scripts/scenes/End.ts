module scenes
{
    export class End extends objects.Scene
    {
        // PRIVATE INSTANCE MEMBERS
        private _gameOverLabel: objects.Label;
        private _restartButton: objects.Button;
        private _mainMenuButton: objects.Button;
        private _ocean: objects.Ocean;

        private _scoreBoard: managers.ScoreBoard;

        // PUBLIC PROPERTIES

        // CONSTRUCTOR
        constructor()
        {
            super();

            this.Start();
        }

        // PRIVATE METHODS

        // PUBLIC METHODS

        // Initializing and Instantiating
        public Start(): void 
        {
             //instantiate a new Text object
            this._gameOverLabel = new objects.Label("Game Over", "80px", "Consolas", "#FF4500", 320, 100, true);
            // buttons
             this._restartButton = new objects.Button("restartButton", 320, 360, true);
             this._mainMenuButton = new objects.Button("mainMenuButton", 320, 420, true);
            
             this._ocean = new objects.Ocean();

             this._scoreBoard  = new managers.ScoreBoard();
             this._scoreBoard.HighScore = config.Game.HIGH_SCORE;
             this.Main();
        }        
        
        public Update(): void 
        {
            this._ocean.Update();
        }
        
        public Main(): void 
        {
            this.addChild(this._ocean);

            this.addChild(this._gameOverLabel);

        
            this.addChild(this._restartButton);

            this._restartButton.on("click", ()=>{
                config.Game.LIVES = 5;
                config.Game.SCORE = 0;

                config.Game.SCENE = scenes.State.PLAY;
            });

            this.addChild(this._mainMenuButton);
            this._mainMenuButton.on("click", () =>{
                config.Game.SCENE = scenes.State.START;
            });

            this.addChild(this._scoreBoard.highScoreLabel);

        }

        public Clean(): void{
            this.removeAllChildren();
        }

        
    }
}