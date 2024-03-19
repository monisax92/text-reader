const main = document.querySelector('main');
const voicesSelect = document.getElementById('voices');
const textarea = document.getElementById('text');
const readBtn = document.getElementById('btn-read');
const toggleBtn = document.getElementById('btn-toggle');
const closeBtn = document.getElementById('btn-close');

const data = [
	{
		imgURL: './images/thirsty.jpg',
		text: "I'm thirsty"
	},
	{
		imgURL: './images/hungry.jpg',
		text: "I'm hungry"
	},
	{
		imgURL: './images/tired.jpg',
		text: "I'm tired"
	},
	{
		imgURL: './images/injured.jpg',
		text: "I'm injured"
	},
	{
		imgURL: './images/happy.jpg',
		text: "I'm happy"
	},
	{
		imgURL: './images/sad.jpg',
		text: "I'm sad"
	},
	{
		imgURL: './images/angry.jpg',
		text: "I'm angry"
	},
	{
		imgURL: './images/scared.jpg',
		text: "I'm scared"
	},
	{
		imgURL: './images/outside.jpg',
		text: 'I want to go outside'
	},
	{
		imgURL: './images/home.jpg',
		text: 'I want to go home'
	},
	{
		imgURL: './images/like.jpg',
		text: 'I like it'
	},
	{
		imgURL: './images/unlike.jpg',
		text: "I don't like it"
	}
];

const createBox = item => {
	const box = document.createElement('div');
	const { imgURL, text } = item;
	box.classList.add('box');
	box.innerHTML = `
    <img src="${imgURL}" alt="${text}" />
    <p class="info">${text}</p>
  `;

	// Read text when clicking on boxes
	box.addEventListener("click", () => {
		setTextMsg(text);
		speakText();

		// visualise clicking
		box.classList.add("active");
		setTimeout(() => box.classList.remove("active"), 500)
	});

	main.appendChild(box);
};

data.forEach(createBox);

toggleBtn.addEventListener("click", () => {
	document.getElementById('text-box').classList.toggle("show");
})

closeBtn.addEventListener("click", () => {
	document.getElementById('text-box').classList.remove("show");
})


// Voices storage from API:
let voices = [];

const getVoices = () => {
	voices = speechSynthesis.getVoices();

	voices.forEach(voice => {
		const option = document.createElement("option");
		option.value = voice.name;
		option.innerText = `${voice.name} ${voice.lang}`;

		voicesSelect.appendChild(option);
	})
}

speechSynthesis.addEventListener("voiceschanged", getVoices);
getVoices();



// Read
const toRead = new SpeechSynthesisUtterance();

const setTextMsg = txt => {
	toRead.text = txt;
}

const speakText = () => {
	speechSynthesis.speak(toRead);
}

// read btn - custom text
readBtn.addEventListener("click", () => {
	setTextMsg(textarea.value);
	speakText();
})

// change voice
voicesSelect.addEventListener("change", e => {
	toRead.voice = voices.find(voice => voice.name === e.target.value);
});