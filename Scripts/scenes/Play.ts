module scenes
{
    export class Play extends objects.Scene
    {
        // PRIVATE INSTANCE MEMBERS
        private _ocean?: objects.Ocean;
        private _plane?: objects.Plane;
        private _island?: objects.Island;

        private _clouds: Array<objects.Cloud>;

        // PUBLIC PROPERTIES

        // CONSTRUCTOR
        constructor()
        {
            super();

            this.Start();
        }

        // PRIVATE METHODS

        // PUBLIC METHODS

        //initialize and instatiate
        public Start(): void 
        {
            
            this._ocean = new objects.Ocean();
            this._plane = new objects.Plane();
            this._island = new objects.Island();
            
            // create the cloud array
            this._clouds = new Array<objects.Cloud>(); // empty container

            // instantiating CLOUD_NUM clouds
            for (let index = 0; index < config.Game.CLOUD_NUM; index++) {
                this._clouds.push(new objects.Cloud());
            }
            

             this.Main();
        }        
        
        public Update(): void 
        {
           this._ocean.Update();

           this._plane.Update();

           this._island.Update();

           this._clouds.forEach(cloud => {
               cloud.Update();
           });
        }
        
        public Main(): void 
        {
            this.addChild(this._ocean);

            this.addChild(this._island);

            this.addChild(this._plane);

            for (const cloud of this._clouds) {
                this.addChild(cloud);
            }
        }

        
    }
}