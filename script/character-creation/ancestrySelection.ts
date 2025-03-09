class AncestrySelection {
	private container: HTMLElement = document.querySelector(".ancestry");

	public createAncestrySelection(): void {
		ancestries.list.forEach((ancestry: Ancestry) => {
			const ancestrySelect = this.createAncestrySelect(ancestry);

			ancestrySelect.addEventListener("click", () => {
				console.log(ancestry);
			});
			this.container.append(ancestrySelect);
		});
	}

	public createAncestrySelect(ancestry: Ancestry): HTMLDivElement {
		const div = document.createElement("div");
		div.classList.add("ancestry-select");

		const name = document.createElement("h2");
		name.textContent = ancestry.name;
		div.append(name);

		const summary = document.createElement("p");
		summary.textContent = ancestry.summary_markdown;
		div.append(summary);

		const details = document.createElement("p");
		details.textContent = ancestry.text;
		div.append(details);

		return div;
	}
}
