Для того чтобы скопировать код к себе в нужную директорию, но без создания доп папок надо 
git clone --no-checkout https://github.com/gustoase/gustoNode.git

потом залить нужную версию по хеш коду в коренвую директорию
git reset --hard {ХЕШ КОД НУЖНОЙ ВЕРСИИ ПРОЕКТА} 

Модули которые нужны для проекта
1) sync
2) socket.io
3) router
4) just
5) formidable

Все настройки находятся в Core/Config.js