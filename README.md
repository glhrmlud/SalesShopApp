# Sales Shop App

Sistema de caixa e gerenciamento de estoque desenvolvido com Django.

## 🛠️ Tecnologias Utilizadas

* **Python**
* **Django**
* **Chart.js**

## ⚙️ Pré-requisitos

Antes de começar, certifique-se de ter o [Python](https://www.python.org/downloads/) instalado na sua máquina. 

> **Dica:** É recomendável criar e ativar um ambiente virtual (como o `venv`) antes de instalar as dependências, para manter seu ambiente organizado.

## 🚀 Como instalar e rodar o projeto

Siga os passos abaixo para configurar o ambiente e executar a aplicação localmente.

### 1. Instalar as dependências

Com o terminal aberto na pasta raiz do projeto, instale todas as bibliotecas necessárias utilizando o arquivo de requisitos:

```bash
pip install -r requirements.txt

```

### 2. Criar e configurar o Banco de Dados

O Django utiliza um sistema de migrações para gerenciar o banco de dados. Para criar as tabelas necessárias para o sistema de caixa e estoque, execute os comandos abaixo em ordem.

Primeiro, prepare as migrações:

```bash
py manage.py makemigrations
```

Em seguida, aplique as migrações para efetivamente criar o banco de dados:

```bash
py manage.py migrate
```

### 3. Criar um Superusuário (Administrador)

Para acessar o sistema e gerenciar os dados do sistema (como produtos, estoque e usuários), é necessário criar uma conta de administrador. Execute o comando abaixo e siga as instruções no terminal para definir o nome de usuário, e-mail e senha:

```bash
py manage.py createsuperuser
```

### 4. Rodar o Servidor Local

Com as dependências instaladas e o banco de dados pronto, inicie o servidor de desenvolvimento:

```bash
py manage.py runserver
```

O servidor estará rodando! Basta acessar `http://127.0.0.1:8000/` no seu navegador para utilizar o Sales Shop App.
