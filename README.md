# babel-plugin-typograf

Плагин для `babel`, который [типографирует](https://www.artlebedev.ru/typograf/about/) строки

### Возможности
Если добавить в файл комментарий `typograf-enable`, то строки в этом файле будут оттипиграфированы (кроме `import`-выражений). Также будет оттипографирован [текст](https://github.com/facebook/jsx/blob/master/AST.md#jsx-text) внутри JSX-элементов. 

Пример:
```
//typograf-enable
const myText = 'Текст, который я хочу типографировать...' 
/* => Текст, который я&nbsp;хочу типографировать...
  (enable: ["common/nbsp/replaceNbsp"])
*/
```

Отключить дальнейшее типографирование файла можно с помощью комментария `//typograf-disable`

### Установка
1. установка `npm`-пакета
```
yarn add --dev babel-plugin-typograf
```
или
```
npm  install --save-dev babel-plugin-typograf
```
2. Настройка конфига `babel`. Например, через `.babelrc`:
```
{
  "plugins": ["babel-plugin-typograf"]
}
```
Дополнительно плагин можно конфигурировать, передав ему необходимые [правила](https://github.com/typograf/typograf/blob/dev/docs/RULES.ru.md). Пример:
```
{
  "plugins":[
    [
      "babel-plugin-typograf",
      {
        "enable":[
          "common/nbsp/replaceNbsp"
        ],
        "disable":[
          "common/space/beforeBracket",
          "ru/other/phone-number"
        ]
      }
    ]
  ]
}
```
А так же [настраивать правила](https://github.com/typograf/typograf/blob/dev/docs/api_rules.md#%D0%B8%D0%B7%D0%BC%D0%B5%D0%BD%D0%B8%D1%82%D1%8C-%D0%BD%D0%B0%D1%81%D1%82%D1%80%D0%BE%D0%B9%D0%BA%D1%83-%D1%83-%D0%BF%D1%80%D0%B0%D0%B2%D0%B8%D0%BB%D0%B0). Пример:
```
{
  "plugins":[
    [
      "babel-plugin-typograf",
      {
        settings: [
          ['common/nbsp/afterShortWord', 'lengthShortWord', 2]
        ]
      }
    ]
  ]
}
```
