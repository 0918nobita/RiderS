const body : ?HTMLElement = document.body;
const p : ?HTMLElement = document.createElement("p");
if (p instanceof HTMLElement) {
	p.textContent = "Hello World!";
	if (body instanceof HTMLElement) body.appendChild(p);
}
