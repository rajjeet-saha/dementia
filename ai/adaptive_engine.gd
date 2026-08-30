class_name AdaptiveEngine
extends RefCounted


# =========================================================
# 1. CALCULATE PERFORMANCE
# =========================================================

func calculate_performance(
	score: int,
	accuracy: float,
	avg_reaction_time: float,
	best_streak: int
) -> float:

	# Current game:
	# 20 rounds × 10 points = 200 maximum
	var max_score = 200.0

	# Convert score to percentage
	var score_percentage = min(
		(float(score) / max_score) * 100.0,
		100.0
	)

	# Accuracy is already 0–100
	var accuracy_score = accuracy

	# -------------------------------------------------
	# Reaction time score
	# -------------------------------------------------

	var reaction_score = 0.0

	if avg_reaction_time <= 2.0:
		reaction_score = 100.0

	elif avg_reaction_time <= 3.0:
		reaction_score = 90.0

	elif avg_reaction_time <= 4.0:
		reaction_score = 80.0

	elif avg_reaction_time <= 5.0:
		reaction_score = 70.0

	elif avg_reaction_time <= 6.0:
		reaction_score = 60.0

	else:
		reaction_score = 40.0

	# -------------------------------------------------
	# Best streak score
	# -------------------------------------------------

	var streak_score = min(
		(float(best_streak) / 10.0) * 100.0,
		100.0
	)

	# -------------------------------------------------
	# Final performance score
	# -------------------------------------------------

	var performance = (
		score_percentage * 0.20
		+ accuracy_score * 0.40
		+ reaction_score * 0.25
		+ streak_score * 0.15
	)

	return round(performance * 100.0) / 100.0


# =========================================================
# 2. CHOOSE NEXT DIFFICULTY
# =========================================================

func choose_difficulty(
	performance: float,
	current_difficulty: int
) -> int:

	# Excellent performance → increase difficulty
	if performance >= 80.0:

		return min(
			current_difficulty + 1,
			4
		)

	# Poor performance → decrease difficulty
	elif performance < 55.0:

		return max(
			current_difficulty - 1,
			1
		)

	# Average performance → keep same difficulty
	else:

		return current_difficulty


# =========================================================
# 3. ANALYZE PERFORMANCE HISTORY
# =========================================================

func analyze_history(
	history: Array[float]
) -> String:

	if history.size() < 2:

		return "Not enough data"

	var previous = history[-2]
	var current = history[-1]

	if current > previous + 5.0:

		return "Improving"

	elif current < previous - 5.0:

		return "Declining"

	else:

		return "Stable"


# =========================================================
# 4. DIFFICULTY SETTINGS
# =========================================================

func get_difficulty_settings(
	level: int
) -> Dictionary:

	var levels = {

		1: {
			"objects": 4,
			"memorize_time": 3,
			"change_types": 1
		},

		2: {
			"objects": 6,
			"memorize_time": 3,
			"change_types": 1
		},

		3: {
			"objects": 6,
			"memorize_time": 2,
			"change_types": 1
		},

		4: {
			"objects": 9,
			"memorize_time": 4,
			"change_types": 2
		}
	}

	return levels[level]


# =========================================================
# 5. PROCESS COMPLETE GAME RESULT
# =========================================================

func process_game_result(
	score: int,
	accuracy: float,
	avg_reaction_time: float,
	best_streak: int,
	current_difficulty: int,
	history: Array[float]
) -> Dictionary:

	# Calculate overall performance
	var performance = calculate_performance(
		score,
		accuracy,
		avg_reaction_time,
		best_streak
	)

	# Decide the next difficulty
	var next_difficulty = choose_difficulty(
		performance,
		current_difficulty
	)

	# Copy previous history
	var updated_history = history.duplicate()

	# Add current performance
	updated_history.append(performance)

	# Determine trend
	var trend = analyze_history(
		updated_history
	)

	# Get settings for the next difficulty
	var settings = get_difficulty_settings(
		next_difficulty
	)

	# Return everything to the game
	return {
		"performance": performance,
		"next_difficulty": next_difficulty,
		"trend": trend,
		"settings": settings
	}
