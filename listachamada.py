from flask import Flask, request, jsonify
import json

app = Flask(__name__)

# Caminho do arquivo JSON
json_file_path = 'listachamada.json'

# Função para carregar dados do arquivo JSON
def carregar_alunos():
    try:
        with open(json_file_path, 'r') as file:
            alunos = json.load(file)
    except FileNotFoundError:
        alunos = []
    return alunos

# Função para salvar dados no arquivo JSON
def salvar_alunos(alunos):
    with open(json_file_path, 'w') as file:
        json.dump(alunos, file, indent=2)

# Rota para cadastrar novos alunos
@app.route('/cadastrar', methods=['POST'])
def cadastrar_aluno():
    aluno = request.json
    alunos = carregar_alunos()
    alunos.append(aluno)
    salvar_alunos(alunos)
    return jsonify({'status': 'Aluno cadastrado com sucesso!'})

# Rota para exibir a lista de chamada
@app.route('/alunos', methods=['GET'])
def listar_alunos():
    alunos = carregar_alunos()
    return jsonify(alunos)

if __name__ == '__main__':
    app.run(debug=True)
