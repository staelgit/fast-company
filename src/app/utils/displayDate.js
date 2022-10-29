export function displayDate(dateString) {
   const diffDate = Date.now() - dateString;
   const date = new Date(parseInt(dateString));

   if (diffDate < 60000) return '1 минуту назад'; // 60 * 1000
   else if (diffDate < 300000) return '5 минут назад'; // 5 * 60 * 1000
   else if (diffDate < 600000) return '10 минут назад'; // 10 * 60 * 1000
   else if (diffDate < 1800000) return '30 минут назад'; // 30 * 60 * 1000
   else if (diffDate < 86400000)
      return `${date.getHours()}:${date.getMinutes()}`; // 24 * 60 * 60 * 1000
   else if (diffDate < 31536000000)
      return date.toLocaleDateString('ru-RU', {
         day: 'numeric',
         month: 'long'
      });
   // 365 * 24 * 60 * 60 * 1000
   else
      return date.toLocaleDateString('ru-RU', {
         day: 'numeric',
         month: 'long',
         year: 'numeric'
      });
}
