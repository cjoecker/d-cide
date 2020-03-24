export type AppActionsTypes =
	| ReturnType<typeof startLoading>
	| ReturnType<typeof endLoading>;

export const startLoading = () =>
	({
		type: "START_LOADING",
	} as const);

export const endLoading = () =>
	({
		type: "END_LOADING",
	} as const);
