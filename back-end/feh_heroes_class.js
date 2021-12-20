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


// test
let ike = new FehHeroes("Ike", "the Dawn legend", 1 / 2, {
    hp: 40,
    atk: 51,
    spd: 42,
    def: 32,
    res: 23
}, true, false);
let ephraim = new FehHeroes("Ephraim", "the lance master", 1 / 3, {
    hp: 45,
    atk: 51,
    spd: 25,
    def: 42,
    res: 20
}, false, true);
let ophelia = new FehHeroes("Ophelia", "the twilight witch", 1 / 3, {
    hp: 30,
    atk: 60,
    spd: 43,
    def: 20,
    res: 15
}, true, true);
let lucina = new FehHeroes("Lucina", "the swordy girl", 1 / 4, {
    hp: 39,
    atk: 43,
    spd: 40,
    def: 52,
    res: 10
}, false, false);

let ultWasActive = false;

// if the hero is a legendary or mythical he gains boost in few stat
function boostStats(heroOne, heroTwo) {
    if (heroOne.isLegend) {
        heroOne.setStats("atk", Math.round(heroOne.stats.atk * 1.2));
    }
    if (heroTwo.isLegend) {
        heroTwo.setStats("atk", Math.round(heroTwo.stats.atk * 1.2));
    }
    if (heroOne.isMythic) {
        heroOne.setStats("spd", Math.round(heroOne.stats.spd * 1.2));
    }
    if (heroTwo.isMythic) {
        heroTwo.setStats("spd", Math.round(heroTwo.stats.spd * 1.2));
    }
}

function isUltAtkActivate(hero, base) {
    if (hero.ultAtk >= 1.0) {
        hero.setStats("atk", Math.round(hero.stats.atk * 1.6));
        console.log(hero.name + " will activate his ultimate attack!");
        hero.setUltAtk(base);
    } else {
        hero.setUltAtk((hero.ultAtk + base));

    }


}

// 2 heroes fight until one of them do not have HP anymore
function combat(heroOne, heroTwo) {
    boostStats(heroOne, heroTwo);
    let numTurn = 1;
    let baseAtkOne = heroOne.stats.atk;
    let baseAtkTwo = heroTwo.stats.atk;
    let baseUltOne = heroOne.ultAtk;
    let baseUltTwo = heroTwo.ultAtk;

    while (heroOne.stats.hp > 0 && heroTwo.stats.hp > 0) {
        console.log("turn n°" + numTurn);
        heroOne.setStats("atk", baseAtkOne);
        heroTwo.setStats("atk", baseAtkTwo);


        isUltAtkActivate(heroOne, baseUltOne);
        isUltAtkActivate(heroTwo, baseUltTwo);


        // the hero who will initiate the combat depend on which turn it is
        if (numTurn % 2 == 0) {
            console.log(heroTwo.name + " initiate");

            if ((heroTwo.stats.atk - heroOne.stats.def) <= 0) {
                console.log("no effect");

            } else {
                console.log(heroTwo.name + " inflict " + (heroTwo.stats.atk - heroOne.stats.def) + " damages");
                heroOne.setStats("hp", (heroOne.stats.hp - (heroTwo.stats.atk - heroOne.stats.def)));

            }

            if (heroOne.stats.hp > 0) {
                if ((heroOne.stats.atk - heroTwo.stats.def) <= 0) {

                    console.log("no effect");
                } else {
                    console.log(heroOne.name + " inflict " + (heroOne.stats.atk - heroTwo.stats.def) + " damages");
                    heroTwo.setStats("hp", (heroTwo.stats.hp - (heroOne.stats.atk - heroTwo.stats.def)));

                }
            }

        } else {
            console.log(heroOne.name + " initiate");
            if ((heroOne.stats.atk - heroTwo.stats.def) <= 0) {
                console.log("no effect");

            } else {
                console.log(heroOne.name + " inflict " + (heroOne.stats.atk - heroTwo.stats.def) + " damages");
                heroTwo.setStats("hp", (heroTwo.stats.hp - (heroOne.stats.atk - heroTwo.stats.def)));

            }

            if (heroTwo.stats.hp > 0) {
                if ((heroTwo.stats.atk - heroOne.stats.def) <= 0) {
                    console.log("no effect");

                } else {
                    console.log(heroTwo.name + " inflict " + (heroTwo.stats.atk - heroOne.stats.def) + " damages");
                    heroOne.setStats("hp", (heroOne.stats.hp - (heroTwo.stats.atk - heroOne.stats.def)));
                }
            }
        }

        if (heroOne.stats.hp > 0 && heroTwo.stats.hp > 0) {
            // if one of the hero is faster than his opponent he will hit twice
            if ((heroOne.stats.spd - 5) >= heroTwo.stats.spd) {
                if ((heroOne.stats.atk - heroTwo.stats.def) <= 0) {
                    console.log("no effect");

                } else {
                    heroTwo.setStats("hp", (heroTwo.stats.hp - (heroOne.stats.atk - heroTwo.stats.def)));
                    console.log(heroTwo.name + " takes a double hit");
                }

            }
            if (heroTwo.stats.hp > 0) {
                if ((heroTwo.stats.spd - 5) >= heroOne.stats.spd) {
                    if ((heroTwo.stats.atk - heroOne.stats.def) <= 0) {
                        console.log("no effect");

                    } else {
                        heroOne.setStats("hp", (heroOne.stats.hp - (heroTwo.stats.atk - heroOne.stats.def)));
                        console.log(heroOne.name + " takes a double hit");
                    }

                }
            }

        }

        console.log(heroOne.name + " has " + heroOne.stats.hp + " hp after combat");
        console.log(heroTwo.name + " has " + heroTwo.stats.hp + " hp after combat");

        if (heroTwo.stats.hp <= 0) {
            console.log(heroOne.name + " " + heroOne.title + " wins");

        } else {
            if (heroOne.stats.hp <= 0) {
                console.log(heroTwo.name + " " + heroTwo.title + " wins");
            }
        }
        numTurn++;
    }
}

combat(ike, ephraim);

// I may have over did it a bit with this function o_o'
// but it shows some ways use my class