const fileInput = document.getElementById('file');
const textArea = document.getElementById('text-area');
const textInput = document.getElementById('text');

// Função para acionar o input de arquivo
function triggerFileInput() {
  fileInput.click();
}

// Função para lidar com o upload de arquivos
function handleFileUpload() {
  const now = new Date();
  const timestamp = now.toLocaleString();

  if (fileInput.files.length > 0) {
    Array.from(fileInput.files).forEach(file => {
      const fileReader = new FileReader();
      fileReader.onload = function (e) {
        const link = document.createElement('a');
        link.href = e.target.result;
        link.download = file.name;
        link.textContent = `${username} (${timestamp}): ${file.name}`;
        link.style.display = 'block';
        textArea.appendChild(link);

        // Enviar link de arquivo para o servidor
        websocket.send(JSON.stringify({
          type: 'file',
          username,
          timestamp,
          filename: file.name,
          fileurl: e.target.result
        }));

        // Salvar a mensagem de arquivo no localStorage
        saveMessage({ username, timestamp, text: file.name, type: 'file', fileurl: e.target.result });
      }
      fileReader.readAsDataURL(file);
    });
    fileInput.value = '';
  }
}

// Função para enviar uma mensagem
function enviar() {
  const now = new Date();
  const timestamp = now.toLocaleString();

    if (!textInput) {
        console.error("Elemento de entrada de texto não encontrado");
        return;
    }

  if (textInput.value) {
    const message = {
      username: username,
      timestamp: timestamp,
      text: textInput.value,
      type: 'message'
    };

    addMessageToChat(message);
    saveMessage(message);

    textInput.value = '';
  }
}

// Função para adicionar uma mensagem ao chat
function addMessageToChat(message) {
  const p = document.createElement('p');
  const span = document.createElement('span');
  span.textContent = ` (${message.timestamp})`;
  span.className = 'timestamp';

  // Adiciona o conteúdo da mensagem
  p.textContent = `${message.username}: ${message.text}`;
  p.appendChild(span);

  // Alinhamento das mensagens
  if (message.username === 'Principal') {
    p.className = 'left-align'; // Mensagem do usuário principal à esquerda
  } else {
    p.className = 'right-align'; // Mensagem de outros usuários à direita
  }

  textArea.appendChild(p);
  textArea.scrollTop = textArea.scrollHeight;
}

// Função para salvar uma mensagem no localStorage
function saveMessage(message) {
  const messages = JSON.parse(localStorage.getItem('chatMessages')) || [];
  messages.push(message);
  localStorage.setItem('chatMessages', JSON.stringify(messages));
}

// Função para carregar mensagens do localStorage
function loadMessages() {
  const messages = JSON.parse(localStorage.getItem('chatMessages')) || [];
  messages.forEach(addMessageToChat);
}

// Função para redefinir o chat
function redefinir() {
  textArea.innerHTML = '';
  document.getElementById('text').value = '';
  document.getElementById('file').value = '';
  localStorage.removeItem('chatMessages');
}

window.onload = function() {
    loadMessages();
    document.getElementById('enviar').onclick = enviar;
};

function updateTime() {
  const now = new Date();
  const hours = now.getHours().toString().padStart(2, '0');
  const minutes = now.getMinutes().toString().padStart(2, '0');
  const seconds = now.getSeconds().toString().padStart(2, '0');
  const day = now.getDate().toString().padStart(2, '0');
  const month = (now.getMonth() + 1).toString().padStart(2, '0');
  const year = now.getFullYear();

  const timeInfoDiv = document.getElementById('time-info');
  timeInfoDiv.innerHTML = `Data: ${day}/${month}/${year} <br> Horário: ${hours}:${minutes}:${seconds}`;
}

// Atualizar horário quando o documento estiver pronto
document.addEventListener('DOMContentLoaded', () => {
  updateTime();
  setInterval(updateTime, 1000);
});
