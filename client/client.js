const form = document.querySelector('form');
const loading = document.querySelector('.loading');
const API_URL = 'http://localhost:5000/barks'
const barksElement = document.querySelector('.barks');

loading.style.display = '';

listAllBarks();

form.addEventListener('submit',(event) => {
	event.preventDefault();
	const formData = new FormData(form);

	const name = formData.get('name');
	const content = formData.get('content');

	const bark = {
		name,
		content
	};
	loading.style.display = '';
	form.style.display = 'none';

	fetch(API_URL, {
		method: 'POST',
		body: JSON.stringify(bark),
		headers:{
			'content-type': 'application/json'
		}
	}).then(response => response.json())
		.then(createdBark => {
			console.log(createdBark);
			form.reset();
			form.style.display = '';
			listAllBarks();
		})
});

function listAllBarks() {
	barksElement.innerHTML = '';
	fetch(API_URL)
		.then(response => response.json())
		.then(barks => {
			barks = JSON.parse(barks);
			barks.reverse();
			barks.forEach(bark => {
				const div = document.createElement('div');

				const header = document.createElement('h3');
				header.textContent = bark.name;

				const contents = document.createElement('p');
				contents.textContent = bark.content;

				const date = document.createElement('small');
				date.textContent = new Date(bark.date.$date);

				div.appendChild(header);
				div.appendChild(contents);
				div.appendChild(date);

				barksElement.append(div);
			});
			loading.style.display = 'none';
		});
}
