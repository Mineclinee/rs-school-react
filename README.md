# RS School — React course

### Если у вас выдает ошибку, пожалуйста, создайте .env файл в корне проекта и пропишите туда:

`VITE_API_KEY=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`

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
