"use strict";
class Player {
    name;
    abilityScores;
    constructor(name) {
        this.name = name;
        this.abilityScores = new AbilityScores();
    }
}
class AbilityScores {
    str;
    dex;
    con;
    int;
    wis;
    cha;
    constructor() {
        this.str = 0;
        this.dex = 0;
        this.con = 0;
        this.int = 0;
        this.wis = 0;
        this.cha = 0;
    }
    modifyWithPointBuy(ability, value) {
        this[ability] = value;
    }
    getModifier(score) {
        return Math.floor((score - 10) / 2);
    }
    getAllModifiers() {
        return {
            str: this.getModifier(this.getScore("str")),
            dex: this.getModifier(this.getScore("dex")),
            con: this.getModifier(this.getScore("con")),
            int: this.getModifier(this.getScore("int")),
            wis: this.getModifier(this.getScore("wis")),
            cha: this.getModifier(this.getScore("cha")),
        };
    }
    getAllScores() {
        return {
            str: this.str + 10,
            dex: this.dex + 10,
            con: this.con + 10,
            int: this.int + 10,
            wis: this.wis + 10,
            cha: this.cha + 10,
        };
    }
    getScore(ability) {
        return this[ability] + 10;
    }
}
let player = new Player("Player Character");
//# sourceMappingURL=player.js.map