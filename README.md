# BoardGameBar

## Цель проекта

В настоящее время большую часть свободного времени занимают социальные сети и интернет. Такие важные вещи, как социализация и отдых становятся частью нашей виртуальной жизни. Живое общение становится редкостью.

Разрабатываемый сайт направлен на популяризацию настольных игр. Настольные игры — это отличный вариант полезного времяпровождения и отдыха с друзьями и семьей. Это общение, взаимодействие, развитие работы мозга и креативного мышления. 

Сайт представляет из себя интернет-магазин. Целью при разработке сайта является привлечение большего количества новых покупателей.

Одной из задач проекта является предоставление качественной, исчерпывающей информации об игровой продукции. На сайте представлен каталог игр, описание, возраст и количество игроков, правила, примерное время, цена, фото для каждой игры. Таким образом, человек имеет возможность заранее ознакомиться с игрой и подобрать ту, что наиболее подходит ему.

В целевую аудиторию сайта входят не только новые покупатели, но и те, кто уже пользуется продукцией – для них есть раздел с новостями и новинками.

## Стек технологий

- React.JS
- Node.JS
- Express
- Postgresql
- Axios
- Mobx
- MUI.core
- SCSS
- Python

## Разработчики

- Виктория Евдокимова — Frontend Developer, DevOps
- Ольга Еграшкина — Frontend Developer, Quality Assurance
- Екатерина Акимова — Backend Developer, Quality Assurance
- Сергей Радаев — Backend Developer
- Игорь Титов — Python Developer

## Инструкция

Данный сайт расположен по данному адресу и не нуждается в локальной установке: http://boardgamebar.fun/

### Для установки на локальную машину:

- Вам необходимо скачать main ветку, а так же Server ветку в отдельные папки.

- В терминале для каждой папки установить все необходимые зависимости универсальной консольной командой `npm i`.  
(В случае возникновенья ошибки на клиентской части дополнить комаду параметром `--legacy-peer-deps`)

- Создайте .env файлы для серверов, содержащие в себе данные подключения к базе данных. (Для безопасности нашей базы данных мы их оставлять здесь не будем)

- Запустите сервер командой `npm run dev` из папки сервера

- Запустите или соберите клиентский сервер командами `npm run start` или `npm run build` соотвественно из папки клиента.

- **Готово**


