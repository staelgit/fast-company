export function displayDate(dateString) {
   const diffDate = Date.now() - dateString;
   const date = new Date();
   date.setTime(dateString);
   if (diffDate < 60 * 1000) return '1 минуту назад';
   else if (diffDate < 5 * 60 * 1000) return '5 минут назад';
   else if (diffDate < 10 * 60 * 1000) return '10 минут назад';
   else if (diffDate < 30 * 60 * 1000) return '30 минут назад';
   else if (diffDate < 24 * 60 * 60 * 1000)
      return `${date.getHours()}:${date.getMinutes()}`;
   else if (diffDate < 365 * 24 * 60 * 60 * 1000)
      return date.toLocaleDateString('ru-RU', {
         day: 'numeric',
         month: 'long'
      });
   else
      return date.toLocaleDateString('ru-RU', {
         day: 'numeric',
         month: 'long',
         year: 'numeric'
      });
}
