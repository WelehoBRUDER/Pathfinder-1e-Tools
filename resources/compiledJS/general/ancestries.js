"use strict";
class Ancestry {
    ability;
    ability_flaw;
    id;
    language;
    name;
    resistance;
    size;
    source;
    speed;
    summary_markdown;
    text;
    trait;
    vision;
    constructor(ancestry) {
        this.ability = ancestry.ability;
        this.ability_flaw = ancestry.ability_flaw ?? ["none"];
        this.id = ancestry.id;
        this.language = ancestry.language;
        this.name = ancestry.name;
        this.resistance = ancestry.resistance;
        this.size = ancestry.size;
        this.source = ancestry.source;
        this.speed = ancestry.speed;
        this.summary_markdown = ancestry.summary_markdown;
        this.text = ancestry.text;
        this.trait = ancestry.trait;
        this.vision = ancestry.vision;
    }
}
class Ancestries {
    list = [];
    constructor() {
        this.init();
    }
    async init() {
        this.list = await this.getData().then((data) => {
            return data.map((ancestry) => {
                return new Ancestry(ancestry);
            });
        });
        console.log(this.getAncestryByName("human"));
    }
    async getData() {
        const data = await fetch("/resources/data/ancestry.json").then((response) => response.json());
        return data;
    }
    getAncestry(id) {
        return this.list.find((ancestry) => ancestry.id === id.toLowerCase());
    }
    getAncestryByName(name) {
        return this.list.find((ancestry) => ancestry.name.toLowerCase() === name.toLowerCase());
    }
}
const ancestries = new Ancestries();
//# sourceMappingURL=ancestries.js.map