# babel-plugin-typograf

Плагин для `babel`, который [типографирует](https://www.artlebedev.ru/typograf/about/) строки

### Возможности
1. Если добавить в начало файла комментарий `typograf-enable`, то строки в этом файле будут оттипиграфированы (кроме `import`-выражений). Пример:
```
//typograf-enable
const myText = 'Текст, который я хочу типографировать...' 
/* => Текст, который я&nbsp;хочу типографировать...
  (enable: ["common/nbsp/replaceNbsp"])
*/
```
2. Плагин автоматически типографирует [текст](https://github.com/facebook/jsx/blob/master/AST.md#jsx-text) внутри `JSX`-элементов.

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
