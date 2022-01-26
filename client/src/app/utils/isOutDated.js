const TEN_MINUTES = 10 * 60 * 1000;
const isOutDated = date => Date.now() - date > TEN_MINUTES;

export default isOutDated;
