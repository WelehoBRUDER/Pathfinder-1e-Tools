class Ancestry {
	public ability: string[];
	public ability_flaw: string[];
	public id: string;
	public language: string[];
	public name: string;
	public resistance: any;
	public size: string[];
	public source: string[];
	public speed: any;
	public summary_markdown: string;
	public text: string;
	public trait: string[];
	public vision: string;

	constructor(ancestry: any) {
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
	public list: any[] = [];

	constructor() {
		this.init();
	}

	async init() {
		this.list = await this.getData().then((data) => {
			return data.map((ancestry: any) => {
				return new Ancestry(ancestry);
			});
		});
		console.log(this.getAncestryByName("human"));
		characterCreator.createStages();
	}

	async getData(): Promise<any> {
		const data = await fetch("/resources/data/ancestry.json").then((response) => response.json());
		return data;
	}

	getAncestry(id: string): Ancestry {
		return this.list.find((ancestry) => ancestry.id === id.toLowerCase());
	}

	getAncestryByName(name: string): Ancestry {
		return this.list.find((ancestry) => ancestry.name.toLowerCase() === name.toLowerCase());
	}
}

const ancestries = new Ancestries();
