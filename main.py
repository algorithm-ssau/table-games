from bs4 import BeautifulSoup
from fake_useragent import UserAgent
import requests
import json

ua = UserAgent()

def collect_data(fName, url):
    response = requests.get(url, headers={'user-agent': f'{ua.data_randomize}'})

    data = response.json()
    for item in data:
        del (item["OldPrice"])
        del (item["Weight"])
        del (item["ItemId"])
        del (item["CategoryIds"])
        del (item["CategoryPathsToRoot"])
        del (item["Regions"])
        del (item["CategoryNames"])
        del (item["GroupId"])
        del (item["StockId"])
        del (item["Size"])
        del (item["Color"])
        del (item["Algorithm"])
        del (item["BuyUrl"])
        del (item["Vendor"])
        del (item["TypePrefix"])
        del (item["Name"])

        del (item["Params"]["hit"])
        del (item["Params"]["eng"])
        del (item["Params"]["addon"])
        del (item["Params"]["coming-soon"])
        del (item["Params"]["new"])
        del (item["Params"]["archive"])

    with open(fName, 'w') as file:
        json.dump(data, file, indent=4, ensure_ascii=False)


def main():
    collect_data('bigcompany.json', 'https://api.retailrocket.net/api/2.0/recommendation/popular/5de90bff97a525261c72996f/?&categoryIds=1356&categoryPaths=&session=624edcf89ad0b80001e39e43&pvid=340213493236527&isDebug=false&format=json')
    collect_data('family.json', 'https://api.retailrocket.net/api/2.0/recommendation/popular/5de90bff97a525261c72996f/?&categoryIds=1446&categoryPaths=&session=624edcf89ad0b80001e39e43&pvid=340213493236527&isDebug=false&format=json')
    collect_data('children.json', 'https://api.retailrocket.net/api/2.0/recommendation/popular/5de90bff97a525261c72996f/?&categoryIds=1444&categoryPaths=&session=624edcf89ad0b80001e39e43&pvid=340213493236527&isDebug=false&format=json')
    collect_data('detect.json', 'https://api.retailrocket.net/api/2.0/recommendation/popular/5de90bff97a525261c72996f/?&categoryIds=1625&categoryPaths=&session=624edcf89ad0b80001e39e43&pvid=340213493236527&isDebug=false&format=json')
    collect_data('roleplay.json', 'https://api.retailrocket.net/api/2.0/recommendation/popular/5de90bff97a525261c72996f/?&categoryIds=1626&categoryPaths=&session=624edcf89ad0b80001e39e43&pvid=340213493236527&isDebug=false&format=json')
    collect_data('hardcore.json', 'https://api.retailrocket.net/api/2.0/recommendation/popular/5de90bff97a525261c72996f/?&categoryIds=5416&categoryPaths=&session=624edcf89ad0b80001e39e43&pvid=340213493236527&isDebug=false&format=json')
    collect_data('duel.json', 'https://api.retailrocket.net/api/2.0/recommendation/popular/5de90bff97a525261c72996f/?&categoryIds=1368&categoryPaths=&session=624edcf89ad0b80001e39e43&pvid=340213493236527&isDebug=false&format=json')
    collect_data('straregy.json', 'https://api.retailrocket.net/api/2.0/recommendation/popular/5de90bff97a525261c72996f/?&categoryIds=1632&categoryPaths=&session=624edcf89ad0b80001e39e43&pvid=340213493236527&isDebug=false&format=json')
    collect_data('economy.json', 'https://api.retailrocket.net/api/2.0/recommendation/popular/5de90bff97a525261c72996f/?&categoryIds=1510&categoryPaths=&session=624edcf89ad0b80001e39e43&pvid=340213493236527&isDebug=false&format=json')
    collect_data('cooperate.json', 'https://api.retailrocket.net/api/2.0/recommendation/popular/5de90bff97a525261c72996f/?&categoryIds=1715&categoryPaths=&session=624edcf89ad0b80001e39e43&pvid=340213493236527&isDebug=false&format=json')


# Press the green button in the gutter to run the script.
if __name__ == '__main__':
    main()

# See PyCharm help at https://www.jetbrains.com/help/pycharm/
