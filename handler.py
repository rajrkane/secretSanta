from public.s3 import S3
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

def format_model(model):
	match_arr = [str(atom) for atom in model.symbols(shown=True)]
	print('match_arr: ', match_arr)
	updated_model = []
	for match in match_arr:
		match_split = match.split('(')[1].split(',')
		updated_model.append({match_split[0]: match_split[1][:-1]})

	return updated_model

def asp_handler(event, context):
	# Parse event
	key = unquote_plus(event['Records'][0]['s3']['object']['key'], encoding='utf-8') #.split(",")

	# Get S3 object body
	s3 = S3()
	body = s3.get_object_body(key)

	# Format names
	name_arr = body.split(",")
	formatted_arr = ["init(" + name.lower().strip() + ")" for name in name_arr]
	
	# Randomize name order
	name_str = ".".join(sample(formatted_arr, len(name_arr))) + "."

	# Add instance to program
	asp_program = "".join((name_str, asp_rules))

	# Configure solver
	control = Control()
	control.add("base", [], asp_program)
	control.ground([("base", [])])

	# Take one model
	control.configuration.solve.models = 1
	with control.solve(yield_=True) as handle:
		for model in handle:
			updated_model = format_model(model)

	print("updated_model: ", updated_model)

	# Return result
	return {
		"headers": {"Content-Type": "application/json"},
		"statusCode": 200,
		"body": {
			"model": updated_model
		} 
	}