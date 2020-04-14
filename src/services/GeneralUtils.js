import {useEffect, useRef} from "react";

export function getValueSafe(fn) {
	try {
		return fn();
	} catch (e) {
		return null;
	}
}
export function usePrevious(value) {
	const ref = useRef();
	useEffect(() => {
		ref.current = value;
	});
	return ref.current;
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
