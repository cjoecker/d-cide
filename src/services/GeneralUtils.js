export function getValueSafe(fn) {
	try {
		return fn();
	} catch (e) {
		return null;
	}
}

export const mergeWithoutDuplicates = (startArray, newArray) => [
	...newArray.filter(
		(item) => !JSON.stringify(startArray).includes(JSON.stringify(item))
	),
	...startArray,
];

export const removeObjectsFromArray = (startArray, objectsToRemove) =>
	startArray.filter(
		(item) => !JSON.stringify(objectsToRemove).includes(JSON.stringify(item))
	);
