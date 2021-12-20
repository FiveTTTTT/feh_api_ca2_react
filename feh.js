class FehHeroes {
    constructor(name, title, ultAtk, stats, isLegend, isMythic) {
        this._name = name;
        this._title = title;
        this._ultAtk = ultAtk;
        this._stats = stats;
        this._isLegend = isLegend;
        this._isMythic = isMythic;
    };

    // getters
    get name() {
        return this._name;
    }
    get title() {
        return this._title;
    }
    get ultAtk() {
        return this._ultAtk;
    }
    get stats() {
        return this._stats;
    }
    get isLegend() {
        return this._isLegend;
    }
    get isMythic() {
        return this._isMythic;
    }


    // setters
    setName(a) {
        this._name = a;
    }
    setTitle(a) {
        this._title = a;
    }
    setUltAtk(a) {
        this._ultAtk = a;
    }
    setStats(theStat, newValue) {
        switch (theStat) {
            case "hp":
                this._stats.hp = newValue;
                break;

            case "atk":
                this._stats.atk = newValue;
                break;

            case "spd":
                this._stats.spd = newValue;
                break;

            case "def":
                this._stats.def = newValue;
                break;

            case "res":
                this._stats.res = newValue;
                break;

            default:
                break;
        }

    }
    setIsLegend(b) {
        this._isLegend = b;
    }
    setIsMythicd(b) {
        this._isMythic = b;
    }
}


// If there's more than 1 class
// class Cat {
//     constructor() {
//         this.name = "cat";
//     }
// }
module.exports= {
    FehHeroes,
    // Cat
    
}