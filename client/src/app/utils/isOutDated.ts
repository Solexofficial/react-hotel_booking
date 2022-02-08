const TEN_MINUTES = 10 * 60 * 1000;

const isOutDated = (date: number) => Date.now() - date > TEN_MINUTES;

export default isOutDated;
