# RS School — React course

## Связь со мной - https://t.me/Minecline

### Если у вас выдает ошибку, пожалуйста, создайте .env файл в корне проекта и пропишите туда:

`VITE_API_KEY=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`

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
