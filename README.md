# hackaton_2023
Очередной повод бахнуть пивка

## Клиент
### Запуск
1. Установить [Docker](https://docs.docker.com/get-docker/), [Docker Compose](https://docs.docker.com/compose/install/) или [Docker Desktop](https://docs.docker.com/desktop/)
2. В корне проекта выполнить:
```
docker-compose up -d
```
3. Перейти по адресу [_localhost:5173_](localhost:5173)
4. Для остановки контейнера выполнить:
```
docker-compose down
```

## Серверная часть
### Установка
1. Установить менеджер пакетов [conan](https://conan.io/) (необходим _python_ >= 3.6). Необходима версия _conan_ ниже **2.0**
```
pip3 install --force-reinstall -v conan==1.59.0

```
Если выводится ошибка при запуске открыть новый эмулятор терминала или выполнить:
```
source ~/.bash_profile
```
или
```
source ~/.profile
``` 

2. В директории _server_ выполнить:  

Выпуск
```
conan install --build=missing -s .  
```
Отладка
```
conan install --build=missing -s build_type=Debug .
```
