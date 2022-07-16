
% initialize people
person(X) :- init(X).

% everyone is paired with everyone else
pair(X, Y) :- person(X), person(Y), X != Y.

% pairs are filtered to choose exactly one
1{match(X, Y) : pair(X, Y)}1 :- person(X).
1{match(X, Y) : pair(X, Y)}1 :- person(Y).


#show match/2.

% instance (should be randomized order)
init(alice). init(bob). init(carol). init(dave). init(eve).

