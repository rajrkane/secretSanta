from clingo.control import Control
import urllib

asp_rules = """
	% instance (should be randomized order)
	% init(alice). init(bob). init(carol). init(dave). init(eve).

	% initialize people
	person(X) :- init(X).

	% everyone is paired with everyone else
	pair(X, Y) :- person(X), person(Y), X != Y.

	% filter pairs
	1{match(X, Y) : pair(X, Y)}1 :- person(X).
	1{match(X, Y) : pair(X, Y)}1 :- person(Y).

	#show match/2.
"""

# TODO: randomly match names to numbers so that alphabetical order doesnt play

def asp_handler(event, context):
	print(f'Event is {event}')

	# Parse event to get names
	init_names = urllib.parse.unquote_plus(event['Records'][0]['s3']['object']['key'], encoding='utf-8')
	print(init_names)
	#init_names = """
	#init(alice). init(bob). init(carol). init(dave). init(eve).
#"""

	# Add initializations to program
	asp_program = "".join((init_names, asp_rules))
	
	# Generate answer sets
	control = Control()
	control.add("base", [], asp_program)
	control.ground([("base", [])])
	control.configuration.solve.models = 0
	answers = control.solve(yield_=True)

	# Take one answer set
	model = list(answers)[0]
	updated_model = [str(atom) for atom in model.symbols(shown=True)]
	print(f"Answer set: {updated_model}")

	# Save result to output bucket

