export class BDDTodos extends HTMLElement{
	constructor(){
		super();
		this.todos = [];
		this.template = `<button id='gettodos'>Get Todos</button>`;
		this.shadow = this.attachShadow({mode: 'open'});
		var t=document.createElement("template");
		t.id = "bdd-todos-template";
		t.innerHTML = this.template;
		this.shadowRoot.appendChild(t);
		var ti = this.shadowRoot.getElementById('bdd-todos-template');
		this.shadowRoot.appendChild(ti.content.firstChild.cloneNode(true));
		this.shadowRoot.getElementById('gettodos').addEventListener('click',this.button_click());
	}

	button_click(e){
		fetch('https://jsonplaceholder.typicode.com/todos?_start=0&_limit=5')
			.then(response => response.json())
			.then(data => {
				this.todos = data;
			});
	}
}

customElements.define('bdd-todos', BDDTodos);
