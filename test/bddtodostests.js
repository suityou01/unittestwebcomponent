import { BDDTodos } from "../src/bddtodos.js"

describe("BDD Todos Component", () => {
	var promisedData;
	beforeAll(function() {
		promisedData =
		[
			{
			  "userId": 1,
			  "id": 1,
			  "title": "delectus aut autem",
			  "completed": false
			},
			{
			  "userId": 1,
			  "id": 2,
			  "title": "quis ut nam facilis et officia qui",
			  "completed": false
			},
			{
			  "userId": 1,
			  "id": 3,
			  "title": "fugiat veniam minus",
			  "completed": false
			},
			{
			  "userId": 1,
			  "id": 4,
			  "title": "et porro tempora",
			  "completed": true
			},
			{
			  "userId": 1,
			  "id": 5,
			  "title": "laboriosam mollitia et enim quasi adipisci quia provident illum",
			  "completed": false
			}
		  ]
	})

	it("It creates", async () => {
		const f = document.createElement('bdd-todos');
		expect(f).toBeTruthy();
	})
	it("It creates a template in the shadow root", async () => {
		const f = document.createElement('bdd-todos');
		expect(f.shadowRoot.innerHTML).toEqual('<template id="bdd-todos-template"><button id="gettodos">Get Todos</button></template><button id="gettodos">Get Todos</button>');
	})
	it("It fires a button_click function when the button is clicked", async () => {
		const f = document.createElement('bdd-todos');
		/*Create our synthetic button click here*/
		var e = new Event('MouseEvent',{ type: 'click', button: 0 });
		/*Get a reference to the button to send the click to*/
		var b = f.shadowRoot.getElementById('gettodos');
		/*Create a spy on the button_click function*/
		spyOn(f,'button_click');
		f.addEventListener('click', f.button_click());
		/*Dispatch the event to the button*/
		b.dispatchEvent(e);
		/*Expect that the button_click event was called*/
		expect(f.button_click).toHaveBeenCalled();
	})
});

describe("BDD Todos Component REST API Tests", () => {
	var promisedData;
	var f;
	beforeAll(function() {
		promisedData =
		[
			{
			  "userId": 1,
			  "id": 1,
			  "title": "delectus aut autem",
			  "completed": false
			},
			{
			  "userId": 1,
			  "id": 2,
			  "title": "quis ut nam facilis et officia qui",
			  "completed": false
			},
			{
			  "userId": 1,
			  "id": 3,
			  "title": "fugiat veniam minus",
			  "completed": false
			},
			{
			  "userId": 1,
			  "id": 4,
			  "title": "et porro tempora",
			  "completed": true
			},
			{
			  "userId": 1,
			  "id": 5,
			  "title": "laboriosam mollitia et enim quasi adipisci quia provident illum",
			  "completed": false
			}
		  ];
		f = document.createElement('bdd-todos');
		var e = new Event('MouseEvent',{ type: 'click', button: 0 });
		/*This spy not only observes the fetch api call, but it also supplies the response*/
		spyOn(window, 'fetch')  
			.and.returnValue(Promise.resolve({ json: () => Promise.resolve(promisedData)}));

		f.addEventListener('click', f.button_click());
		
		var b = f.shadowRoot.getElementById('gettodos');
		b.dispatchEvent(e);
	})
	it("It calls a Rest API when the button is clicked", async() => {
		expect(window.fetch).toHaveBeenCalledTimes(1);
		expect(f.todos).toEqual(promisedData);
	})
});
