from bs4 import BeautifulSoup
import random
import requests
import json




def collect_Data_AllGames(Price_or_ID, Mode):
    user_agents = [
        "Mozilla/5.0 (Windows NT 10.0; rv:91.0) Gecko/20100101 Firefox/91.0",
        "Mozilla/5.0 (Windows NT 10.0; rv:78.0) Gecko/20100101 Firefox/78.0",
        "Mozilla/5.0 (X11; Linux x86_64; rv:95.0) Gecko/20100101 Firefox/95.0"
    ]
    random_user_agent = random.choice(user_agents)
    headers = {
        'User-Agent': random_user_agent
    }

    response = requests.get('http://localhost:5000/api/game/All', verify=False, headers=headers)    #получение ответа сервера на запрос
    data = response.json()  #преобразование запроса в формат json
    rows = data.get('rows')

    result = []
    try:
        if Mode == 1:   #первый режим работы функции (вывод всех игр, по стоимости меньших, чем пользовательская цена)
            for i in rows:
                if i.get('price') < Price_or_ID:    #обработка данных ответа сервера с заданным условием
                    row_game_name = i.get('game_name')
                    row_game_time = i.get('game_time')
                    row_description = i.get('little_description')
                    row_players_number = i.get('players_number')
                    row_price = i.get('price')
                    row_img = i.get('little_picture')

                    result.append(
                        {
                            'game_name': row_game_name,
                            'game_time': row_game_time,
                            'description': row_description,
                            'players_number': row_players_number,
                            'price': row_price,
                            'img': row_img
                        }
                    )
        if Mode == 2:   #второй режим работы функции (вывод всех игр из заданной категории)
            for i in rows:
                if i.get('categoryIdCategories') == Price_or_ID:    #обработка данных ответа сервера с заданным условием
                    row_game_name = i.get('game_name')
                    row_game_time = i.get('game_time')
                    row_description = i.get('little_description')
                    row_players_number = i.get('players_number')
                    row_price = i.get('price')
                    row_img = i.get('little_picture')

                    result.append(
                        {
                            'game_name': row_game_name,
                            'game_time': row_game_time,
                            'description': row_description,
                            'players_number': row_players_number,
                            'price': row_price,
                            'img': row_img
                        }
                    )
    except Exception:
        return []
    else:
        return result   #возвращение сформированного списка
    #return data
    #fName = 'dateCat.json'
    #with open(fName, 'w') as file:
        #json.dump(data, file, indent=4, ensure_ascii=False)

def collect_Data_AllCategs( ):
    user_agents = [
        "Mozilla/5.0 (Windows NT 10.0; rv:91.0) Gecko/20100101 Firefox/91.0",
        "Mozilla/5.0 (Windows NT 10.0; rv:78.0) Gecko/20100101 Firefox/78.0",
        "Mozilla/5.0 (X11; Linux x86_64; rv:95.0) Gecko/20100101 Firefox/95.0"
    ]
    random_user_agent = random.choice(user_agents)
    headers = {
        'User-Agent': random_user_agent
    }

    response = requests.get('http://localhost:5000/api/category/', verify=False, headers=headers)
    data = response.json()
    rows = data

    result = []
    try:
        for i in rows:
            row_categ_name = i.get('name_category')
            row_categ_id = i.get('id_categories')

            result.append(
                {
                    'categ_name': row_categ_name,
                    'categ_id': row_categ_id,
                }
            )

    except Exception:
        return []
    else:
        return result
    #fName = 'dateCat.json'
    #with open(fName, 'w') as file:
        #json.dump(data, file, indent=4, ensure_ascii=False)

def collect_Data_OneCategGames( id ):
    user_agents = [
        "Mozilla/5.0 (Windows NT 10.0; rv:91.0) Gecko/20100101 Firefox/91.0",
        "Mozilla/5.0 (Windows NT 10.0; rv:78.0) Gecko/20100101 Firefox/78.0",
        "Mozilla/5.0 (X11; Linux x86_64; rv:95.0) Gecko/20100101 Firefox/95.0"
    ]
    random_user_agent = random.choice(user_agents)
    headers = {
        'User-Agent': random_user_agent
    }

    response = requests.get('http://localhost:5000/api/game/All', verify=False, headers=headers)
    data = response.json()
    rows = data.get('rows')

    result = []
    try:
        for i in rows:
            if i.get('categoryIdCategories') == id:
                row_game_name = i.get('game_name')
                row_game_time = i.get('game_time')
                row_description = i.get('little_description')
                row_players_number = i.get('players_number')
                row_price = i.get('price')
                row_img = i.get('little_picture')

                result.append(
                    {
                        'game_name': row_game_name,
                        'game_time': row_game_time,
                        'description': row_description,
                        'players_number': row_players_number,
                        'price': row_price,
                        'img': row_img
                    }
                )
    except Exception:
        return []
    else:
        return result
    #return data
    #fName = 'dateCat.json'
    #with open(fName, 'w') as file:
        #json.dump(data, file, indent=4, ensure_ascii=False)