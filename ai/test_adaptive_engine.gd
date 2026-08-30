extends Node


func _ready() -> void:

	var engine = AdaptiveEngine.new()

	# Test: excellent player
	var result = engine.process_game_result(
		190,        # score
		95.0,      # accuracy
		2.0,       # average reaction time
		10,        # best streak
		2,         # current difficulty
		[70.0, 78.0, 85.0]
	)

	print("========== AI TEST ==========")

	print("Performance: ", result["performance"])

	print(
		"Next Difficulty: ",
		result["next_difficulty"]
	)

	print("Trend: ", result["trend"])

	print(
		"Objects: ",
		result["settings"]["objects"]
	)

	print(
		"Memorize Time: ",
		result["settings"]["memorize_time"]
	)

	print("=============================")
