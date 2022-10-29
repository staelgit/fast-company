function isOutdated(date) {
   return Date.now() - date > 600000;
}

export default isOutdated;
