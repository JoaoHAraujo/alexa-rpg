# alexa-rpg
Alexa skill for rpg experience through multi-path chapters


# Como executar localmente:
- Gere o container docker usando o comando "npm run compose:up";
- Rode a aplicação backoffice indo até o diretório alexa-rpg-backoffice e rodando o comando "npm run dev";
- Execute o ngrok utilizando a porta da aplicação backoffice;
- Edite a variável de ambiente no lambda da skill na AWS para a URL temporária do ngrok;

A partir daí é possível utilizar no próprio dispositivo Alexa conectado ou pelo console AWS utilizando o intent de chamado configurado