/* eslint-disable no-undef*/
// eslint-disable-next-line import/no-extraneous-dependencies

Cypress.Commands.add('getTestElement', selector => {
  return cy.get(`[data-testid="${selector}"]`);
});

Cypress.Commands.add('getTestElementStartingWith', selector => {
  return cy.get(`[data-testid^="${selector}"]`);
});

Cypress.Commands.add('setStartItems', () => {
  window.localStorage.setItem('cookieConsentAccepted', 'true');
  window.localStorage.setItem(
    'appState',
    'U2FsdGVkX1+OMby7mCnvanryMChpRFafw3S7dr1yZE6wBb55Ta5OXtXVoLCRhV1bgv0UNtWYXm0qLGdCr4SU92HGfCdyE2fbvtpOZN6vncektpIMgMsejSC+G6vaJS0SayFkCqFj5aQrAwWwiiOH2fEEflX51yE8eGREXfy9BXBgKu4TBK57m3dgUqkryetd73FEvDQSmvIZeULPNpx9OAVK5dTceZ6sls9KghlEwhgPy6ikEwTYZoCIn88vwp/NVImI44V/yMusW/z6w3V4R55qpRsMECfEbQNWMYC6vGkCopVxkFct5dRf//1YKJ2ytVt1lVPlPdq/7tYsuhVkhwa8bpVUF8WA+bTRrbxdPZ0qRmclRP6ZuQcjvZnGD3YMiRToVdhVj4mmND3KtcAod1bQhKI+rZchwkQDSRMiHRyl+a+UwEYRiTH90dZ2i/Y78j4N6QyVjDgDQH6OWh8XsA1VEQJDdXIO5Danptfdp2dg8I/nD5SfKaslwhTj8SWTrjK13Gz/rdnAqMLZKMzONfwZcuUYbH/Ond9aEucKM4cVc7y+PzflU8TI1OMxkcFLE0OUCYWDDnKWjFmBZdmJwHMjKSmh61cDK6ZtP9+yRbXIhK1Big+JxhHsDEFbyhSxD79X7hAYomCsWz8I+P099uX89VsurkBo3wXOjB84WkQM0PVDHopg3PgHGj+Mcpoloak7hz7KsqGYydSawDyU06lRYKC3BCnU3Lt/qmAIR1KpX7T6GzsGztZwEAQKjr0Esm9vChNzdU6qt4EKo9C7jIOFNjqHdU28iTsa2GFbioAGos2whqc2Lyczc/X5rklzCwuDqA9goryp9mFemgdMk3XtNVkZbgQNJXxNW+0p1rTFoKGRbQ9aQnPvR4EkVT5pNzEuasK1y1m5t/VLPMMdW4DQJeeAQ3ublZKvNnwbJL0jPC1uvu2WuTD06GvMWR8d7kGX+2nRlTO5AuR+njPoWd+WoOxPWJpFs1n199YYPstFdgfK+vRW8lhGw+Md84ICDT3IQ0r/jtKXqNGCAc1Aqm9LcnQZRPbkRyhaP1yuqFdbRuzjl5Nxi50hf1BbzH5Za6X6Y9IzTkHpwgJR9A3XqCXE+gBBz99KUfQHpONz2F4864iZeayFYqv58PNbh8nCd33b7qSO0LQxM4eVlmVxDYyOseD35P6f+0oRiljECtSRbN3uE/FpNlDgLSi2h5CVTrorb6NUJ2uxOXjbxq7WvA=='
  );
});
