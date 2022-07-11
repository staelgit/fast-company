const declOfNum = (n, text_forms) => {
   n = Math.abs(n) % 100;
   const n1 = n % 10;
   if (n > 10 && n < 20) {
      return text_forms[2];
   }
   if (n1 > 1 && n1 < 5) {
      return text_forms[1];
   }
   if (n1 === 1) {
      return text_forms[0];
   }
   return text_forms[2];
};

export default declOfNum;

// example
// declOfNum(1, ['минута', 'минуты', 'минут']); // вернёт — минута
// declOfNum(2, ['минута', 'минуты', 'минут']); // вернёт — минуты
// declOfNum(5, ['минута', 'минуты', 'минут']); // вернёт — минут
// source - https://realadmin.ru/coding/sklonenie-na-javascript.html
