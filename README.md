# 🧠 Alumi - Assistente de Cuidado Psicológico

Aplicativo mobile desenvolvido com React Native, voltado ao suporte emocional de pessoas que estejam enfrentando crises psicológicas. Através de um chatbot empático e acessível, o app oferece acolhimento inicial, escuta ativa e orientações básicas para momentos de sofrimento psíquico.

## Observações

-   O aplicativo foi desenvolvido e testado somente para dispositivos Android!
-   As respostas e as hipóteses diagnósticas da Alumi foram projetadas para serem eficazes e coerentes, mas nunca substituirão um profissional capacitado, se precisar, procure ajuda profissional!
-   O aplicativo irá funcionar apenas na SDK 53 do Expo Go!

## 📱 Funcionalidades

-   💬 **Chat para Ajuda** – Converse com a nossa assistente, Alumi, para receber ajuda em momentos de crise!
-   🛜 **Conexão com Gemini** – A Alumi utiliza a inteligência artificial do google, Gemini, para te ajudar!
-   📲 **Indicação de Profissionais Especializados** - Nosso chat indica um grupo de psicólogos com renome caso o usuário queira ajuda profissional!

## 🚀 Tecnologias Utilizadas

-   [React Native](https://reactnative.dev/)
-   [Expo](https://expo.dev/)
-   [TypeScript](https://www.typescriptlang.org/)
-   [FontAwesome](https://fontawesome.com/) – Ícones personalizados.
-   [Gemini API](https://ai.google.dev/gemini-api/docs?hl=pt-br#javascript)

## 📦 Instalação

### 1. Pré-requisitos

Instale o Node.js:

-   [Node.js](https://nodejs.org/en/download/)

Instale o Java SDK (versão 17):

-   [JDK 17](https://www.oracle.com/java/technologies/javase/jdk17-archive-downloads.html)

Escolha uma das opções para rodar o app:

-   Emulador Android: [Android Studio](https://developer.android.com/studio?hl=pt-br)
-   Dispositivo físico: [Expo Go SDK 53 (Android)](https://expo.dev/go)

⚙️ Siga este guia de configuração para utilizar o ambiente:  
👉 [Configuração do Ambiente React Native](https://reactnative.dev/docs/set-up-your-environment)

### 2. Clonar o repositório

```bash
git clone https://github.com/AbadeMTH/chat-imersaoia.git
cd chat-imersaoia
```

### 3. Instalar as dependências

```bash
npm install
# ou
yarn install
```

### 4. Gerar uma API Key no Google AI Studio

-   [Acesse o link do Google AI Studio](https://aistudio.google.com/app/apikey)
-   Clique no botão no canto superior direito escrito, "Criar chave de API", e aguarde.
-   Copie sua API Key que irá aparecer para você, NÃO COMPARTILHE ESSA CHAVE COM NINGUÉM!
-   Caso por algum motivo você ja tenha um projeto no Google Cloud, clique no campo de pesquisa e selecione o projeto (provavelmente esteja nomeado como Gemini API, se existir), após isso clique no botão azul embaixo para gerar sua API Key.

### 5. Insira sua API Key no projeto para a Alumi ganhar vida

-   Acesse a pasta clonada do projeto.
-   Acesse a pasta gemini.
-   Acesse o arquivo apiKey.ts.
-   Onde esta escrito 'SUA API KEY AQUI' substitua pela sua própria API Key, LEMBRE-SE DE MANTÊ-LÁ ENTRE AS ASPAS.

### 6. Rodar o projeto

```bash
npm run start #Irá iniciar apenas o Metro
# ou
npm run android #Irá iniciar o Metro e abrirá o emulador caso configurado corretamente
```

Caso queira utilizar seu dispositivo móvel para verificar o projeto:

-   Abra o aplicativo Expo Go no celular, e escaneie o QR Code gerado pelo Metro.
    > Certifique-se de ter o [Expo Go SDK 53](https://expo.dev/client) instalado no seu celular para testar o app via QR Code.

## 📸 Imagens

### Print do Chat Vazio

<table>
  <tr>
    <td align="center"><img src="./assets/prints/emptyChat.png" width="300" alt="Chat Vazio"/></td>
  </tr>
</table>

### Prints do Chat com Mensagens

<table>
  <tr>
    <td align="center"><img src="./assets/prints/chat1.png" width="300" alt="Chat com mensagens"/></td>
    <td align="center"><img src="./assets/prints/chat2.png" width="300" alt="Chat com mensagens"/></td>
  </tr>
</table>

## 👨‍💻 Autor

Desenvolvido com 💜 por [AbadeMTH](https://github.com/AbadeMTH)
