// eslint-disable-next-line @typescript-eslint/no-explicit-any
export default function shuffleArray(array: any[]) {
	const newArray = [...array];

	for (let i = newArray.length - 1; i > 0; i -= 1) {
		const j = Math.floor(Math.random() * (i + 1));
		[newArray[i], newArray[j]] = [newArray[j], newArray[i]];
	}
	return newArray;
}
