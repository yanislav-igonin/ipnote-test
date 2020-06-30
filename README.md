# ipnote-test

## Task
Нужно реализовать REST API для ToDo листа:
1. Добавить запись ( с запланированной задачей)
2. Удалить/Пометить задачу как выполненную.

При выполнении задания нужно завести репозиторий на gitlab/github и вести разработку в нем.
Для проверки мы будем смотреть этот репозиторий;
И нужно будет сказать общее затраченное на реализацию время в часах

Плюсом будет:
4. Jest тесты для одного метода
5. Swagger - документация для методов

3. Поиск задачи

Использовать https://nestjs.com/ + https://mongoosejs.com/

## Startup
```bash
docker-compose -f development.docker-compose.yml up --build
```

## Questions
1) Как обозначить в сваггере респонс более сложный, чем простой объект или массив? Например:
```json
{ "tasks": [...] }
```