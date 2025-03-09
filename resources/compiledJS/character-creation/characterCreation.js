"use strict";
class CharacterCreator {
    stages = ["details", "ancestry", "class", "background", "abilities", "skills"];
    stage = "ancestry";
    /* Elements */
    stagesNav = document.querySelector(".stages-nav");
    /* Classes */
    ancestrySelection = new AncestrySelection();
    pointBuy = new PointBuy();
    constructor() { }
    createStages() {
        this.stagesNav.innerHTML = "";
        this.createCurrentStage();
        console.log("??");
        this.stages.forEach((stage, id) => {
            const button = document.createElement("button");
            button.textContent = `${id + 1}. ${stage}`;
            button.classList.add("stage-link");
            if (stage === this.stage) {
                button.classList.add("active");
            }
            button.addEventListener("click", () => {
                this.hideStage(this.stage);
                this.stage = stage;
                this.createStages();
                this.showStage(this.stage);
            });
            this.stagesNav.append(button);
        });
    }
    hideStage(stage) {
        document.querySelector(`.${stage}`).classList.add("hidden");
    }
    showStage(stage) {
        document.querySelector(`.${stage}`).classList.remove("hidden");
    }
    createCurrentStage() {
        this.showStage(this.stage);
        switch (this.stage) {
            case "ancestry":
                this.createAncestryStage();
                break;
            case "class":
                this.createClassStage();
                break;
            case "background":
                this.createBackgroundStage();
                break;
            case "abilities":
                this.createAbilitiesStage();
                break;
            case "skills":
                this.createSkillsStage();
                break;
            default:
                this.createDetailsStage();
        }
    }
    createAncestryStage() {
        console.log(ancestries.list);
        if (ancestries.list.length === 0) {
            document.querySelector(".ancestry").textContent = "Loading...";
            return;
        }
        document.querySelector(".ancestry").innerHTML = "";
        this.ancestrySelection.createAncestrySelection();
    }
    createClassStage() { }
    createBackgroundStage() { }
    createAbilitiesStage() {
        this.pointBuy.createPointBuy();
    }
    createSkillsStage() { }
    createDetailsStage() { }
}
const characterCreator = new CharacterCreator();
characterCreator.createStages();
//# sourceMappingURL=characterCreation.js.map