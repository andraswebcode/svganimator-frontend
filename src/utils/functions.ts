export const clamp = (value: number, min: number, max: number): number =>
	Math.min(Math.max(value, min), max);

export const toFixed = (value: number, fractionDigits = 2): number =>
	Math.round(value * 10 ** fractionDigits) / 10 ** fractionDigits || 0;
