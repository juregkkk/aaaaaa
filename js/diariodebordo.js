function addEntry() {
    const entryText = document.getElementById('diary-entry').value;
    const entryTitle = document.getElementById('titulo-diario').value;
    if (entryText.trim() === '' || entryTitle.trim() === '') return;

    const entryList = document.getElementById('entry-list');
    const newEntry = document.createElement('li');
    newEntry.classList.add('entry');

    const dateTime = new Date();
    const timeElement = document.createElement('time');
    timeElement.textContent = dateTime.toLocaleString();

    const titleElement = document.createElement('h3');
    titleElement.textContent = entryTitle;

    const textElement = document.createElement('p');
    textElement.textContent = entryText;

    const actions = document.createElement('div');
    actions.classList.add('entry-actions');
    actions.innerHTML = `<button onclick="editEntry(this)">Editar</button><button onclick="deleteEntry(this)">Excluir</button>`;

    newEntry.appendChild(timeElement);
    newEntry.appendChild(titleElement);
    newEntry.appendChild(textElement);
    newEntry.appendChild(actions);

    entryList.insertBefore(newEntry, entryList.firstChild);

    document.getElementById('diary-entry').value = '';
    document.getElementById('titulo-diario').value = '';
}

function editEntry(button) {
    const entry = button.closest('.entry');
    const text = entry.querySelector('p').textContent;
    const title = entry.querySelector('h3').textContent;
    document.getElementById('diary-entry').value = text;
    document.getElementById('titulo-diario').value = title;
    entry.remove();
}

function deleteEntry(button) {
    const entry = button.closest('.entry');
    entry.remove();
}