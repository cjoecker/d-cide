import wrapWord from './wrapWord';

it('wrap word', () => {
	expect(wrapWord('12345', 3)).toEqual('123-\n45');
});
it("doesn't wrap short words", () => {
	expect(wrapWord('12345', 5)).toEqual('12345');
});

it("doesn't wrap words with spaces", () => {
	expect(wrapWord('1 2345', 3)).toEqual('1 2345');
});
