/* jshint */


class Model {

    /**
     * Create a new Model.
     */
    constructor() {

        /** @member {number} show only each n-th point, set to 1 to display every point */
        this.displayedPointRatio = 20;

        /** @member {number} current step number, initialized to 0 */
        this.stepCount = 0;

        /** @type {number} the time step duration */
        let dt = 0.05;


        // Simulation declaration area - explicitly declare and initialize all variables here

        const Q = 13.7e+3; //kg per s
        const v_out = 2.5e+3; //m per s
        let M = 2.5e+6; //kg
        const F = Q * v_out;

        let a = 0;
        let s = 0;
        let v = 0;

        let speeds = [
            {t: null, v: 7.9e+3, s:null, M:null},
            {t: null, v: 11.2e+3, s:null, M:null},
            {t: null, v: 42.1e+3, s:null, M:null}
        ];

        // Declaration end


        /**
         * Advance model one step forward
         * @returns {boolean} False is returned, when simulation should not continue.
         */
        this.step = function(){
                  
            M -= Q * dt;
            a = F / M;
            v += a * dt;
            s += v * dt;

            for (let speed of speeds) {
                if (v >= speed.v && !speed.t) {
                    speed.t = this.getTime();
                    speed.s = s;
                    speed.M = M;
                }
            }

            if (v > 42.1e+3 || M<=0) {
                console.log(speeds);
                return false; // stop condition
            }
            
            this.stepCount++; // Never delete this, used to calculate total time
            return true; // If next iteration allowed return true, if ended, return false
        };
    
    
        /**
         * Provides data for display - what should be displayed, when render is requested
         * @returns {(Array<Array<number>>|Array<number>)} Array of point coordinates for all datasets. If a single point given instead of Array, it will be considered as a next point for the first (the only) dataset
         */
        this.getCoordinates = function() {
    
            return [this.getTime(), a]; // For a single dataset
            
            // return [ // for multiple dataset
            //   [earth.r.x, earth.r.y],
            //   [sun.r.x, sun.r.y]
            // ];
        };
    
        /**
         * @returns {object} Descriptions of watched variables
         */
        this.getVarDescriptions = function() {
            return {
                time : {name: "Time", unit: "s", precision: 2},
                s : {name: "s", unit: "km", precision: 2},
                v : {name: "v", unit: "km/s", precision: 2},
                a : {name: "a", unit: "m/s2", precision: 2},
                M : {name: "M", unit: "t", precision: 2},
            };
        };
    
        /**
         * Called at each redraw
         * @returns {object} Watched variables values
         */
        this.getVars = function() {
            return {
                time : this.getTime(),
                s: s/1000,
                v: v/1000,
                a,
                M: M/1000
            };
        };
        
        /**
         * Any actions performed at layout initialize (after constructor is called)
         */
        this.initialize = function() {
            // code to perform at layout initialize
        };       
    
        /**
         * Returns current time of simulation
         * @returns {number} Time from simulation start
         */
        this.getTime = function() {
            return this.stepCount * dt;
        };
    
        /**
         * @returns {number} Time step value
         */
        this.getTimeStep = function(){
            return dt;
        };            

    }



}
