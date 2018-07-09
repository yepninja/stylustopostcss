# Stylus to CSS

## Проблемы:
* Смешанные пробелы и табы
* Разное количество пробелов
* Отсутствие двоеточия
* Переменные
* Примеси
* Миксины

1. Prepare `stylus` for *postcss*
2. Proccess `stylus` with *postcss*
    - change syntax from `stylus` to `css4` with *sugarss*
    - change
3. Test results
    * Process `css4` with *postcss*
        * use *postcss-import*
        * use *postcss-nested*
        * use *postcss-cssnext*
    * Process `stylus` sources with *stylus*
        * import utils (vars & mixins)