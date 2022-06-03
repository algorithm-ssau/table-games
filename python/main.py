
from aiogram import Dispatcher, executor, types, Bot    #импорты библиотек
from aiogram.dispatcher import FSMContext
from aiogram.dispatcher.filters.state import State, StatesGroup
from aiogram.contrib.fsm_storage.memory import MemoryStorage
from aiogram.utils.markdown import hbold, hlink
from aiogram.dispatcher.filters import Text
from aiogram.types import ReplyKeyboardRemove, \
    ReplyKeyboardMarkup, KeyboardButton, \
    InlineKeyboardMarkup, InlineKeyboardButton
from config import token1
from Serv_Bd import collect_Data_AllGames, collect_Data_AllCategs, collect_Data_OneCategGames

Games = []  #объявление глобальных переменных

count = 1
category = ''
ind = 0

class FSMGameSearch(StatesGroup):   #объявление класса состояний для вывода игр по цене
    price = State()

class FSMCategSrc(StatesGroup):     #объявление класса состояний для вывода всех категорий игр
    InPut = State()

bot = Bot(token1, parse_mode=types.ParseMode.HTML)  #инициализация объекта bot
dp = Dispatcher(bot, storage=MemoryStorage())       #инициализация диспетчера (обработчика событий)

otvet = ['А?', 'Чё?', 'Опять работа?', 'Работа - не волк, в лес не убежит!', '...нужно больше золота...',   #объявление списка ответов на команду /болтать
        'ЖИЗНЬ ЗА НЕР-ЗУЛА!', 'А кто такой этот Енот-Некромант?', 'Мы созданы, чтобы служить ЕМУ!',
        'Титаны создали меня не для того, чтобы я здесь с тобой болтал', 'Лирооооооой Джеееенкинс!', '...зато у меня есть курица...',
        'Артас, сын мой...  Харош болтать, пора приниматься за работу!']

Categories = [{'name_category': 'Для компании', 'id_categories': 1},
              {'name_category': 'Для всей семьи', 'id_categories': 2},
              {'name_category': 'Для детей', 'id_categories': 3},
              {'name_category': 'Детективные игры', 'id_categories': 4},
              {'name_category': 'Ролевые игры', 'id_categories': 5},
              {'name_category': 'Хардкорные игры', 'id_categories': 6},
              {'name_category': 'Дуэльные игры', 'id_categories': 7},
              {'name_category': 'Стратегические игры', 'id_categories': 8},
              {'name_category': 'Экономические игры', 'id_categories': 9},
              {'name_category': 'Кооперативные игры', 'id_categories': 10}]

StartBtns = [InlineKeyboardButton('Найти игры ниже цены', callback_data='button_games'),
             InlineKeyboardButton('Вывести все категории', callback_data='button_categs')]

# CatsForBtns = ["Для компании","Для всей семьи","Для детей","Детективные игры","Ролевые игры",
#                "Хардкорные игры","Дуэльные игры","Стратегические игры","Экономические игры","Кооперативные игры"]


@dp.message_handler(commands='start')  #обработка стартовой команды /start
async def start(message: types.Message):
    inline_btn_1 = InlineKeyboardButton('Найти игры ниже цены', callback_data='button_games')   #объявление объектов - инлайн кнопок
    inline_btn_2 = InlineKeyboardButton('Вывести все категории', callback_data='button_categs')
    inline_kb1 = InlineKeyboardMarkup(row_width=1).add(inline_btn_1,inline_btn_2)
    await message.answer('Чем могу помочь?\nИли мы можем просто /болтать', reply_markup=inline_kb1) #размещение инлайн кнопок вместе с сообщением

@dp.message_handler(commands = 'болтать')  #обработка команды /болтать
async def talk(message: types.Message):
    global ind
    await message.answer(str(otvet[ind]))
    if (ind < len(otvet) - 1): ind += 1
    else:
        await message.answer('У автора закончилась фантазия.')
        ind = 0
        inline_kb1 = InlineKeyboardMarkup(row_width=1).add(*StartBtns)
        await message.answer('Чем могу помочь?\nИли мы можем снова просто /болтать', reply_markup=inline_kb1)

@dp.callback_query_handler(text = 'button_categs')  #обработка сабытия нажатия кнопки "Вывести все категории"
async def CatsExtract(callback_query: types.CallbackQuery):
    await bot.answer_callback_query(callback_query.id)
    global Categories

    # if len(Categories) == 0:
    #     Categories = collect_Data_AllCategs()   #вызов функции сбора информации с сервера о всех категориях игр
    # await bot.send_message(callback_query.from_user.id, 'Готово')
    i = 0
    while i < len(Categories):
        await bot.send_message(callback_query.from_user.id,
                               f'{Categories[i].get("name_category")} id: {Categories[i].get("id_categories")}\n')
        i = i + 1
    inline_btn_1 = InlineKeyboardButton('Вывод', callback_data='button_extract')
    inline_btn_2 = InlineKeyboardButton('Отмена', callback_data='button_cansel2')
    inline_kb2 = InlineKeyboardMarkup().add(inline_btn_1, inline_btn_2)
    await bot.send_message(callback_query.from_user.id,
                           'Если так хочешь, я могу вывести все игры для одной из категорий\n'
                           'Тебе достаточно нажать на кнопку Вывод, а затем ввести id категории.',
                           reply_markup=inline_kb2)

@dp.callback_query_handler(text='button_extract', state=None)   #обработка сабытия нажатия кнопки "Вывод"
async def CatGmNeed(callback_query: types.CallbackQuery):
    await bot.answer_callback_query(callback_query.id)
    await FSMCategSrc.InPut.set()
    await bot.send_message(callback_query.from_user.id, 'Отправь мне id категории, по которой тебе нужны игры')

@dp.message_handler(state = FSMCategSrc.InPut)  #обработка перехода в состояние InPut класса состояний FSMCategSrc
async def FindCategGames(message: types.Message, state: FSMCategSrc):
    global Games
    global Categories
    global category
    global count
    global StartBtns
    try:
        category = ''
        for i in Categories:
            if i.get('id_categories') == int(message.text):
                category = i.get('name_category')
                break
        await message.answer('Id принят, жди ответа')
        if category != '':
            Games = collect_Data_AllGames(int(message.text), 2)  # вызов функции сбора информации с сервера о всех играх, состоящих в данной категории

        if len(Games) == 0:  # обработка ошибки пользователя
            raise Exception('This is the exception you expect to handle')
        else:
            await message.answer(f'Ты выбрал категорию: {category}')

            i1 = 0
            while i1 < 5:  # вывод возвращённого функцией списка игр данной категории
                try:
                    await bot.send_photo(message.chat.id, f'{Games[count + i1].get("img")}')
                except Exception:  # обработка ошибки получения фотографии игры
                    await message.answer('Фотку достать не получилось')
                    Name = Games[count + i1].get('game_name')
                    await message.answer(f'^^^^^^^^^^^^^^^^^^^\n'
                                         f'|||||||||||||||||||\n'
                                         f'{hbold(Name)}\n'
                                         f'Категория: {category}\n'
                                         f'Время игры: {Games[count + i1].get("game_time")}\n'
                                         f'Описание: {Games[count + i1].get("description")}\n'
                                         f'Кол-во игроков: {Games[count + i1].get("players_number")}\n'
                                         f'Цена: {Games[count + i1].get("price")}')
                    if i1 == 4:
                        count = count + i1 + 1
                    i1 = i1 + 1
                else:
                    Name = Games[count + i1].get('game_name')
                    await message.answer(f'^^^^^^^^^^^^^^^^^^^\n'
                                         f'|||||||||||||||||||\n'
                                         f'{hbold(Name)}\n'
                                         f'Категория: {category}\n'
                                         f'Время игры: {Games[count + i1].get("game_time")}\n'
                                         f'Описание: {Games[count + i1].get("description")}\n'
                                         f'Кол-во игроков: {Games[count + i1].get("players_number")}\n'
                                         f'Цена: {Games[count + i1].get("price")}')
                    if i1 == 4:
                        count = count + i1 + 1
                    i1 = i1 + 1
            if count < len(Games):  # предложение пользователю продолжить вывод или отменить его
                inline_btn_1 = InlineKeyboardButton('Вывести ещё 5 игр', callback_data='button_extract10')
                inline_btn_2 = InlineKeyboardButton('Отмена', callback_data='button_cansel2')
                inline_kb2 = InlineKeyboardMarkup().add(inline_btn_1, inline_btn_2)
                await message.answer(f'Могу вывести ещё 5. Всего игр {len(Games)}', reply_markup=inline_kb2)

    except Exception:
        await message.answer('Ты ввёл неправильный id. Попробуй снова.')
        inline_kb1 = InlineKeyboardMarkup(row_width=1).add(*StartBtns)
        await message.answer('Чем могу помочь?\nИли мы можем просто /болтать', reply_markup=inline_kb1)


    await state.finish()

@dp.callback_query_handler(text='button_games', state=None) #обработка сабытия нажатия кнопки "Найти все игры меньше цены"
async def Search(callback_query: types.CallbackQuery):
    await bot.answer_callback_query(callback_query.id)
    await FSMGameSearch.price.set()
    await bot.send_message(callback_query.from_user.id, 'Отправь мне цену, ниже которой будут найдены игры')

@dp.message_handler(state = FSMGameSearch.price)    #обработка перехода в состояние price класса состояний FSMGameSearch
async def FindGames(message: types.Message, state: FSMGameSearch):
    global Games
    global count
    try:
        Games = collect_Data_AllGames(int(message.text),
                                      1)  # вызов функции сбора информации с сервера о всех играх меньше данной цены
        await message.answer('Цена принята, жди ответа')
        if len(Games) == 0:  # обработка ошибки пользователя
            await message.answer('Чтоб я так жил как ты хочешь игры покупать!\nНет таких дешёвых в магазине.')
            raise SyntaxError('This is the exception you expect to handle')
        else:
            await message.answer('Данные заказывали? Выгружаю!')

            i1 = 0
            while i1 < 5:  # вывод возвращённого функцией списка игр
                await bot.send_photo(message.chat.id, f'{Games[count + i1].get("img")}')
                Name = Games[count + i1].get('game_name')
                await message.answer(f'^^^^^^^^^^^^^^^^^^^\n'
                                     f'|||||||||||||||||||\n'
                                     f'{hbold(Name)}\n'
                                     f'Время игры: {Games[count + i1].get("game_time")}\n'
                                     f'Описание: {Games[count + i1].get("description")}\n'
                                     f'Кол-во игроков: {Games[count + i1].get("players_number")}\n'
                                     f'Цена: {Games[count + i1].get("price")}')
                if i1 == 4:
                    count = count + i1 + 1
                i1 = i1 + 1
            if count < len(Games):
                inline_btn_1 = InlineKeyboardButton('Вывести ещё 5 игр', callback_data='button_extract10')
                inline_btn_2 = InlineKeyboardButton('Отмена', callback_data='button_cansel2')
                inline_kb2 = InlineKeyboardMarkup().add(inline_btn_1, inline_btn_2)
                await message.answer(f'Могу вывести ещё 5. Всего игр {len(Games)}', reply_markup=inline_kb2)
            else:
                Games = []
                count = 0
                inline_btn_1 = InlineKeyboardButton('Найти игры ниже цены', callback_data='button_games')
                inline_btn_2 = InlineKeyboardButton('Вывести все категории', callback_data='button_categs')
                inline_kb1 = InlineKeyboardMarkup(row_width=1).add(inline_btn_1, inline_btn_2)
                await message.answer('Это были все игры в данной категории')
                await message.answer('Чем могу помочь?\nИли мы можем просто /болтать', reply_markup=inline_kb1)
    except Exception:
        await message.answer('Ты ввёл не число или слишком малое число. Попробуй снова.')
        inline_kb1 = InlineKeyboardMarkup(row_width=1).add(*StartBtns)
        await message.answer('Чем могу помочь?\nИли мы можем просто /болтать', reply_markup=inline_kb1)


    await state.finish()

@dp.callback_query_handler(text='button_extract10')  #обработка сабытия нажатия кнопки "Вывести ещё 10 игр"
async def ExtrContinue1(callback_query: types.CallbackQuery):
    await bot.answer_callback_query(callback_query.id)
    global count
    global Games
    i1 = 0
    flag = True
    while i1 < 5:
        try:
            await bot.send_photo(callback_query.from_user.id, f'{Games[count + i1].get("img")}')
            Name = Games[count + i1].get('game_name')
            await bot.send_message(callback_query.from_user.id,
                                   f'^^^^^^^^^^^^^^^^^^^\n'
                                   f'|||||||||||||||||||\n'
                                   f'{hbold(Name)}\n'
                                   f'Время игры: {Games[count + i1].get("game_time")}\n'
                                   f'Описание: {Games[count + i1].get("description")}\n'
                                   f'Кол-во игроков: {Games[count + i1].get("players_number")}\n'
                                   f'Цена: {Games[count + i1].get("price")}')
            if i1 == 4:
                count = count + i1 + 1
            i1 = i1 + 1
        except Exception:
            count = len(Games)
            break

    if count < len(Games):
        inline_btn_1 = InlineKeyboardButton('Вывести ещё 5 игр', callback_data='button_extract10')
        inline_btn_2 = InlineKeyboardButton('Отмена', callback_data='button_cansel2')
        inline_kb2 = InlineKeyboardMarkup().add(inline_btn_1, inline_btn_2)
        await bot.send_message(callback_query.from_user.id, f'Могу вывести ещё 5. Всего игр {len(Games)}', reply_markup=inline_kb2)
    else:
        Games = []
        count = 0
        inline_btn_1 = InlineKeyboardButton('Найти игры ниже цены', callback_data='button_games')   #возвращение к стартовому меню
        inline_btn_2 = InlineKeyboardButton('Вывести все категории', callback_data='button_categs')
        inline_kb1 = InlineKeyboardMarkup(row_width=1).add(inline_btn_1, inline_btn_2)
        await bot.send_message(callback_query.from_user.id, 'Это были все игры в данной категории')
        await bot.send_message(callback_query.from_user.id, 'Чем могу помочь?\nИли мы можем просто /болтать', reply_markup=inline_kb1)

@dp.callback_query_handler(text='button_cansel2')  #обработка сабытия нажатия кнопки "Отмена"
async def Enough1(callback_query: types.CallbackQuery):
    await bot.answer_callback_query(callback_query.id)
    global Games
    global count
    Games = []
    count = 0
    inline_btn_1 = InlineKeyboardButton('Найти_игры_ниже_цены', callback_data='button_games')   #возвращение к стартовому меню
    inline_btn_2 = InlineKeyboardButton('Вывести_все_категории', callback_data='button_categs')
    inline_kb1 = InlineKeyboardMarkup(row_width=1).add(inline_btn_1,inline_btn_2)
    await bot.send_message(callback_query.from_user.id, 'Оки)')
    await bot.send_message(callback_query.from_user.id, 'Чем могу помочь?\nИли мы можем просто /болтать', reply_markup=inline_kb1)



def main():
    executor.start_polling(dp)  #запуск прослушивания сообщений ботом




if __name__ == '__main__':
    main()


