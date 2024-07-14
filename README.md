# RS School — React course

## Связь со мной - https://t.me/Minecline

### Если у вас выдает ошибку, пожалуйста, создайте .env файл в корне проекта и пропишите туда:

## (УБЕРИТЕ ПРОБЕЛЫ МЕЖДУ СИМВОЛАМИ "\_")

`VITE_API_KEY=github _ pat_ 11AMRE2QA0gnc2JXy3Ly9v _ F96xy7Y7vibjpTMKozPXS749k75wazsUZB8mXW44YrAPI2GO7AHzBNw4NrJ`

(это ключ от api gihtub, его также можно сгенерировать в https://github.com/settings/tokens?type=beta)

### И измените App.tsx (со строчки fetch):

```javascript
fetch(
  `https://api.github.com/search/repositories?q=${query}&per_page=12&page=${pageNumber}`,
  {
    headers: {
      authorization: `token ${import.meta.env.VITE_API_KEY}`,
    },
  }
);
```
