# PECI
Projeto da disciplina de PECI.

## Index
* [Sobre o projeto](#sobre-o-projeto)
* [Autores](#Autores)
* [Uso](#Uso Sem Docker)

### Sobre o projeto
Projeto de Engenharia de Computadores e Informática.

### Autores
- Daniel Emídio **Nº 108986**
- Henrique Coelho **Nº 108342**
- Carlos Ferreira **Nº 108822**
- Gabriel Costa **Nº 109050**
- Diogo Borges **Nº 102954**
- Diogo Martins **Nº 108548**

### Uso (Sem Docker)
1. Instalar as dependencias  
Para utilizar este projeto é necessário instalar [Node.js](https://nodejs.org).

2. Fazer clone do repositório
```sh
git clone https://github.com/DanielEmdio/PECI.git
cd PECI
```

3. Instalar as dependencias do projeto e correr a aplicação (sem Docker)  
- Backend, apenas na primeira vez:
```sh
cd fastapi-react/backend
python -m venv venv
source venv/bin/activate
pip install -r requirements.txt
```
- Para iniciar o backend:
```sh
./run.sh
```
- Frontend, apenas na primeira vez:
```sh
cd fastapi-react/frontend
npm i
```
- Para iniciar o frontend:
```sh
npm start
```

### Uso (Com Docker)

```sh
cd fastapi-react/
sudo docker compose up
```
