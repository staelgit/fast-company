const declOfNum = (n, textForms) => {
   n = Math.abs(n) % 100;
   const n1 = n % 10;
   if (n > 10 && n < 20) {
      return textForms[2];
   }
   if (n1 > 1 && n1 < 5) {
      return textForms[1];
   }
   if (n1 === 1) {
      return textForms[0];
   }
   return textForms[2];
};

export default declOfNum;

// example
// declOfNum(1, ['минута', 'минуты', 'минут']); // вернёт — минута
// declOfNum(2, ['минута', 'минуты', 'минут']); // вернёт — минуты
// declOfNum(5, ['минута', 'минуты', 'минут']); // вернёт — минут
// source - https://realadmin.ru/coding/sklonenie-na-javascript.html
