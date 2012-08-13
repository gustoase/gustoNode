Для того чтобы скопировать код к себе в нужную директорию, но без создания доп папок надо 
git clone --no-checkout https://github.com/gustoase/gustoNode.git

потом залить нужную версию по хеш коду в коренвую директорию
git reset --hard {ХЕШ КОД НУЖНОЙ ВЕРСИИ ПРОЕКТА} 

Модули которые нужны для проекта
2) socket.io https://github.com/LearnBoost/socket.io.git
3) router https://github.com/masylum/router.git
4) just https://github.com/azart/just.git
5) formidable https://github.com/felixge/node-formidable.git (опционально)
6) require-all https://github.com/fent/require-all.git
7) moment https://github.com/pajusmar/moment.git
8) node-orm https://github.com/dresende/node-orm.git
9) node-mysql https://github.com/felixge/node-mysql.git

Все настройки находятся в Core/Config.js