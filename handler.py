from clingo.control import Control
from urllib.parse import unquote_plus
from random import sample

asp_rules = """
	% Initialize persons
	person(X) :- init(X).

	% Create pairs
	pair(X, Y) :- person(X), person(Y), X != Y.

	% Filter pairs
	1{match(X, Y) : pair(X, Y)}1 :- person(X).
	1{match(X, Y) : pair(X, Y)}1 :- person(Y).

	#show match/2.
"""

def asp_handler(event, context):
	# Parse event to get names
	name_arr = unquote_plus(event['Records'][0]['s3']['object']['key'], encoding='utf-8').split(",")
	formatted_arr = ["init(" + name.strip() + ")" for name in name_arr]
	
	# Randomize name order
	name_str = ".".join(sample(formatted_arr, len(name_arr))) + "."

	# Add instance to program
	asp_program = "".join((name_str, asp_rules))
	
	# Implement solver
	control = Control()
	control.add("base", [], asp_program)
	control.ground([("base", [])])
	control.configuration.solve.models = 0
	answers = control.solve(yield_=True)

	# Take one model
	model = list(answers)[0]
	updated_model = [str(atom) for atom in model.symbols(shown=True)]
	print(f"Answer set: {updated_model}")

	# Save result to output bucket

