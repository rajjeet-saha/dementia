extends Node2D
var adaptive_engine = AdaptiveEngine.new()

# =========================================================
# GAME VARIABLES
# =========================================================

var score = 0
var round_number = 1
var level = 1
var max_rounds = 15

var game_state = "menu"

var items_per_round = 3
var memorize_seconds = 4

var original_items = []
var selected_items = []

var total_attempts = 0
var correct_answers = 0

var current_streak = 0
var best_streak = 0
var reaction_start_time = 0.0
var total_reaction_time = 0.0
var performance_history: Array[float] = []


# =========================================================
# UI VARIABLES
# =========================================================

var root_ui
var background

var main_container

var title_label
var instruction_label
var timer_label
var round_label
var score_label
var feedback_label

var item_grid

var play_again_button


# =========================================================
# SHOPPING ITEMS
# =========================================================

var shopping_items = [
	"APPLE",
	"MILK",
	"BREAD",
	"RICE",
	"BANANA",
	"JUICE",
	"EGGS",
	"CHEESE",
	"TOMATO",
	"SOAP",
	"COFFEE",
	"SUGAR",
	"BUTTER",
	"ORANGE",
	"FLOUR",
	"YOGURT"
]
func get_item_icon(item):
	match item:
		"APPLE":
			return "🍎"
		"MILK":
			return "🥛"
		"BREAD":
			return "🍞"
		"RICE":
			return "🍚"
		"BANANA":
			return "🍌"
		"JUICE":
			return "🧃"
		"EGGS":
			return "🥚"
		"CHEESE":
			return "🧀"
		"TOMATO":
			return "🍅"
		"SOAP":
			return "🧼"
		"COFFEE":
			return "☕"
		"SUGAR":
			return "🧂"
		"BUTTER":
			return "🧈"
		"ORANGE":
			return "🍊"
		"FLOUR":
			return "🌾"
		"YOGURT":
			return "🥣"
		_:
			return "🛒"


# =========================================================
# READY
# =========================================================

func _ready():
	randomize()

	create_ui()
	show_menu()


# =========================================================
# CREATE UI
# =========================================================

func create_ui():

	var root = Control.new()

	root.set_anchors_and_offsets_preset(
		Control.PRESET_FULL_RECT
	)

	add_child(root)

	root_ui = root


	# =====================================================
	# BACKGROUND
	# =====================================================

	background = ColorRect.new()

	background.color = Color("#121827")

	background.set_anchors_and_offsets_preset(
		Control.PRESET_FULL_RECT
	)

	root.add_child(background)


# =========================================================
# MENU
# =========================================================

func show_menu():

	game_state = "menu"
	create_menu_ui()


# =========================================================
# START GAME
# =========================================================

func start_game():

	# Reset game statistics
	score = 0
	round_number = 1
	level = 1

	total_attempts = 0
	correct_answers = 0

	current_streak = 0
	best_streak = 0
	reaction_start_time = 0.0
	total_reaction_time = 0.0
	performance_history.clear()

	# Remove the menu UI completely
	for child in root_ui.get_children():

		if child != background:
			child.queue_free()

	await get_tree().process_frame

	# Create fresh game UI
	create_game_ui()

	start_round()


# =========================================================
# START ROUND
# =========================================================

func start_round():

	game_state = "memorize"


	# =====================================================
	# DETERMINE LEVEL
	# =====================================================

	# AI keeps the current difficulty
	# Difficulty will be updated after performance evaluation

	


	# =====================================================
	# NUMBER OF ITEMS
	# =====================================================

	# AI DIFFICULTY SETTINGS

	var settings = adaptive_engine.get_difficulty_settings(level)

	items_per_round = settings["objects"]

	


	# =====================================================
	# MEMORIZATION TIME
	# =====================================================

	memorize_seconds = settings["memorize_time"]

	


	# =====================================================
	# UI
	# =====================================================

	instruction_label.text = "REMEMBER YOUR SHOPPING LIST"

	round_label.text = (
		"ROUND "
		+ str(round_number)
		+ "  •  LEVEL "
		+ str(level)
	)

	feedback_label.text = ""

	score_label.text = "Score: " + str(score)


	# =====================================================
	# SELECT RANDOM ITEMS
	# =====================================================

	original_items.clear()

	var available_items = shopping_items.duplicate()

	available_items.shuffle()


	for i in range(items_per_round):

		original_items.append(
			available_items[i]
		)


	# =====================================================
	# SHOW LIST
	# =====================================================

	show_memory_list()


	# =====================================================
	# COUNTDOWN
	# =====================================================

	for seconds in range(
		memorize_seconds,
		0,
		-1
	):

		timer_label.text = "MEMORIZE: " + str(seconds)

		await get_tree().create_timer(
			1.0
		).timeout


	# =====================================================
	# HIDE LIST
	# =====================================================

	clear_grid()

	timer_label.text = ""

	instruction_label.text = "SELECT EVERYTHING YOU REMEMBER"

	await get_tree().create_timer(
		0.8
	).timeout


	# =====================================================
	# SHOW CHOICES
	# =====================================================

	show_choices()


# =========================================================
# SHOW MEMORY LIST
# =========================================================

func show_memory_list():

	clear_grid()

	for item in original_items:

		var card = VBoxContainer.new()

		card.custom_minimum_size = Vector2(180, 170)

		card.alignment = BoxContainer.ALIGNMENT_CENTER

		card.add_theme_constant_override(
			"separation",
			5
		)


		# Icon

		var icon = Label.new()

		icon.text = get_item_icon(item)

		icon.horizontal_alignment = HORIZONTAL_ALIGNMENT_CENTER

		icon.add_theme_font_size_override(
			"font_size",
			65
		)

		card.add_child(icon)


		# Item name

		var label = Label.new()

		label.text = item

		label.horizontal_alignment = HORIZONTAL_ALIGNMENT_CENTER

		label.add_theme_font_size_override(
			"font_size",
			26
		)

		card.add_child(label)


		item_grid.add_child(card)


# =========================================================
# SHOW CHOICES
# =========================================================

func show_choices():

	game_state = "answer"

	clear_grid()

	selected_items.clear()


	# ---------------------------------------------------------
	# Create correct items + incorrect items
	# ---------------------------------------------------------

	var choices = original_items.duplicate()


	var available_items = shopping_items.duplicate()

	available_items.shuffle()


	for item in available_items:

		if choices.size() >= items_per_round * 2:

			break

		if not choices.has(item):

			choices.append(item)


	choices.shuffle()


	# ---------------------------------------------------------
	# Create buttons
	# ---------------------------------------------------------

	for item in choices:

		var button = Button.new()

		button.text =  get_item_icon(item) + "\n" + item

		button.custom_minimum_size = Vector2(
			0,
			135
		)

		button.size_flags_horizontal = Control.SIZE_EXPAND_FILL

		button.add_theme_font_size_override(
			"font_size",
			26
		)


		# Normal style

		var normal_style = StyleBoxFlat.new()

		normal_style.bg_color = Color("#273149")

		normal_style.corner_radius_top_left = 15
		normal_style.corner_radius_top_right = 15
		normal_style.corner_radius_bottom_left = 15
		normal_style.corner_radius_bottom_right = 15

		button.add_theme_stylebox_override(
			"normal",
			normal_style
		)


		# Pressed style

		var pressed_style = StyleBoxFlat.new()

		pressed_style.bg_color = Color("#3c4b6b")

		pressed_style.corner_radius_top_left = 15
		pressed_style.corner_radius_top_right = 15
		pressed_style.corner_radius_bottom_left = 15
		pressed_style.corner_radius_bottom_right = 15

		button.add_theme_stylebox_override(
			"pressed",
			pressed_style
		)


		item_grid.add_child(button)


		button.pressed.connect(
			func():
				select_item(item, button)
		)


	# ---------------------------------------------------------
	# Done button
	# ---------------------------------------------------------

	var done_button = Button.new()

	done_button.text = "DONE"
	done_button.custom_minimum_size = Vector2(0, 80)

	done_button.add_theme_font_size_override(
	"font_size",
	28
)
	var done_style = StyleBoxFlat.new()

	done_style.bg_color = Color("#35d07f")

	done_style.corner_radius_top_left = 15
	done_style.corner_radius_top_right = 15
	done_style.corner_radius_bottom_left = 15
	done_style.corner_radius_bottom_right = 15

	done_button.add_theme_stylebox_override(
		"normal",
		done_style
)

	done_button.custom_minimum_size = Vector2(
		0,
		70
	)

	done_button.add_theme_font_size_override(
		"font_size",
		24
	)

	done_button.size_flags_horizontal = Control.SIZE_EXPAND_FILL

	item_grid.add_child(done_button)

	done_button.pressed.connect(
		submit_answer
	)
	
	reaction_start_time = Time.get_ticks_msec() / 1000.0


# =========================================================
# SELECT ITEM
# =========================================================

func select_item(item, button):

	if game_state != "answer":

		return


	if selected_items.has(item):

		selected_items.erase(item)

		button.modulate = Color.WHITE

	else:

		selected_items.append(item)

		button.modulate = Color("#6ee7b7")


# =========================================================
# SUBMIT ANSWER
# =========================================================

func submit_answer():

	if game_state != "answer":

		return


	game_state = "result"

	total_attempts += 1
	
	var reaction_time = (
		Time.get_ticks_msec() / 1000.0
	) - reaction_start_time

	total_reaction_time += reaction_time


	# ---------------------------------------------------------
	# Calculate correct selections
	# ---------------------------------------------------------

	var correct_count = 0

	for item in selected_items:

		if original_items.has(item):

			correct_count += 1


	# ---------------------------------------------------------
	# Calculate whether answer is perfect
	# ---------------------------------------------------------

	var perfect_answer = (
		correct_count == original_items.size()
		and selected_items.size() == original_items.size()
	)


	if perfect_answer:

		correct_answers += 1

		current_streak += 1


		if current_streak > best_streak:

			best_streak = current_streak


		score += 10 * level


		instruction_label.text = "CORRECT!"

		feedback_label.text = (
			"+"
			+ str(10 * level)
			+ " points\n"
			+ "You remembered everything!"
		)


	else:

		current_streak = 0

		instruction_label.text = "NOT QUITE!"

		var missed_items = ""

		for item in original_items:

			if not selected_items.has(item):

				missed_items += item + "\n"


		feedback_label.text = (
			"You missed:\n"
			+ missed_items
		)


	score_label.text = "Score: " + str(score)

	timer_label.text = ""


	await get_tree().create_timer(
		2.5
	).timeout


	# ---------------------------------------------------------
	# End game
	# ---------------------------------------------------------

	if round_number >= max_rounds:

		show_results()

		return
	if round_number % 5 == 0:
		evaluate_with_ai()

	round_number += 1

	start_round()
	
func evaluate_with_ai():

	var accuracy = 0.0

	if total_attempts > 0:
		accuracy = (
			float(correct_answers)
			/ float(total_attempts)
		) * 100.0

	var average_reaction_time = 0.0

	if total_attempts > 0:
		average_reaction_time = (
			total_reaction_time
			/ float(total_attempts)
		)

	var result = adaptive_engine.process_game_result(
		score,
		accuracy,
		average_reaction_time,
		best_streak,
		level,
		performance_history
	)

	performance_history.append(
		result["performance"]
	)

	level = result["next_difficulty"]

	print("========== AI ANALYSIS ==========")
	print("Average Reaction Time: ", average_reaction_time)
	print("Accuracy: ", accuracy)
	print("Best Streak: ", best_streak)
	print("Score: ", score)
	print("Performance: ", result["performance"])
	print("Next Difficulty: ", result["next_difficulty"])
	print("Trend: ", result["trend"])
	print("=================================")


# =========================================================
# RESULTS
# =========================================================

func show_results():

	game_state = "results"


	# =====================================================
	# CALCULATE ACCURACY
	# =====================================================

	var accuracy = 0.0

	if total_attempts > 0:

		accuracy = (
			float(correct_answers)
			/ float(total_attempts)
		) * 100.0
		
	var average_reaction_time = 0.0

	if total_attempts > 0:
		average_reaction_time = (
			total_reaction_time
			/ float(total_attempts)
		)

	var final_ai_result = adaptive_engine.process_game_result(
		score,
		accuracy,
		average_reaction_time,
		best_streak,
		level,
		performance_history
	)

	var final_performance = final_ai_result["performance"]
	var final_trend = final_ai_result["trend"]


	# =====================================================
	# DETERMINE PERFORMANCE MESSAGE
	# =====================================================

	var performance_message = ""

	if accuracy >= 90:

		performance_message = "Excellent memory!"

	elif accuracy >= 70:

		performance_message = "Great job!"

	elif accuracy >= 50:

		performance_message = "Good effort!"

	else:

		performance_message = "Keep practicing!"


	# =====================================================
	# REMOVE GAME UI
	# =====================================================

	for child in root_ui.get_children():

		if child != background:

			child.queue_free()

	await get_tree().process_frame


	# =====================================================
	# CENTER RESULTS
	# =====================================================

	var results_center = CenterContainer.new()

	results_center.position = Vector2(0, 0)

	results_center.size = get_viewport_rect().size

	root_ui.add_child(results_center)


	var results_container = VBoxContainer.new()

	results_container.custom_minimum_size = Vector2(
		400,
		650
	)

	results_container.add_theme_constant_override(
		"separation",
		18
	)

	results_center.add_child(
		results_container
	)


	# =====================================================
	# TITLE
	# =====================================================

	var results_title = Label.new()

	results_title.text = "SESSION COMPLETE!"

	results_title.horizontal_alignment = HORIZONTAL_ALIGNMENT_CENTER

	results_title.add_theme_font_size_override(
		"font_size",
		36
	)

	results_container.add_child(
		results_title
	)


	# =====================================================
	# PERFORMANCE MESSAGE
	# =====================================================

	var message_label = Label.new()

	message_label.text = performance_message

	message_label.horizontal_alignment = HORIZONTAL_ALIGNMENT_CENTER

	message_label.add_theme_font_size_override(
		"font_size",
		26
	)

	results_container.add_child(
		message_label
	)


	# =====================================================
	# ANALYSIS
	# =====================================================

	var analysis_label = Label.new()

	analysis_label.text = (
		"FINAL SCORE\n"
		+ str(score)
		+ "\n\n"
		+ "ACCURACY\n"
		+ str(snapped(accuracy, 0.1))
		+ "%\n\n"
		+ "PERFECT ROUNDS\n"
		+ str(correct_answers)
		+ " / "
		+ str(total_attempts)
		+ "\n\n"
		+ "BEST STREAK\n"
		+ str(best_streak)
		+ "\n\n"
		+ "HIGHEST LEVEL\n"
		+ str(level)
		+ "\n\n"
		+ "AI PERFORMANCE\n"
		+ str(final_performance)
		+ "\n\n"
		+ "PERFORMANCE TREND\n"
		+ final_trend
	)

	analysis_label.horizontal_alignment = HORIZONTAL_ALIGNMENT_CENTER

	analysis_label.add_theme_font_size_override(
		"font_size",
		20
	)

	results_container.add_child(
		analysis_label
	)


	# =====================================================
	# PLAY AGAIN BUTTON
	# =====================================================

	play_again_button = Button.new()

	play_again_button.text = "PLAY AGAIN"

	play_again_button.custom_minimum_size = Vector2(
		280,
		70
	)

	play_again_button.add_theme_font_size_override(
		"font_size",
		24
	)

	play_again_button.size_flags_horizontal = Control.SIZE_SHRINK_CENTER

	results_container.add_child(
		play_again_button
	)

	play_again_button.pressed.connect(
		start_new_game
	)


	# =====================================================
	# MAIN MENU BUTTON
	# =====================================================

	var menu_button = Button.new()

	menu_button.text = "MAIN MENU"

	menu_button.custom_minimum_size = Vector2(
		280,
		60
	)

	menu_button.add_theme_font_size_override(
		"font_size",
		22
	)

	menu_button.size_flags_horizontal = Control.SIZE_SHRINK_CENTER

	results_container.add_child(
		menu_button
	)

	menu_button.pressed.connect(
		return_to_menu
	)
func return_to_menu():

	game_state = "menu"

	score = 0
	round_number = 1
	level = 1

	total_attempts = 0
	correct_answers = 0

	current_streak = 0
	best_streak = 0

	# Remove everything except background

	for child in root_ui.get_children():

		if child != background:
			child.queue_free()

	await get_tree().process_frame

	# Recreate menu

	create_menu_ui()
	
func create_menu_ui():

	var center = CenterContainer.new()

	center.position = Vector2.ZERO
	center.size = get_viewport_rect().size

	root_ui.add_child(center)


	# =====================================================
	# MAIN MENU CONTAINER
	# =====================================================

	main_container = VBoxContainer.new()

	main_container.custom_minimum_size = Vector2(430, 620)

	main_container.add_theme_constant_override(
		"separation",
		18
	)

	center.add_child(main_container)


	# =====================================================
	# SHOPPING ICON
	# =====================================================

	var icon = Label.new()

	icon.text = "🛒"

	icon.horizontal_alignment = HORIZONTAL_ALIGNMENT_CENTER

	icon.add_theme_font_size_override(
		"font_size",
		72
	)

	icon.custom_minimum_size = Vector2(0, 90)

	main_container.add_child(icon)


	# =====================================================
	# TITLE
	# =====================================================

	title_label = Label.new()

	title_label.text = "SHOPPING MEMORY"

	title_label.horizontal_alignment = HORIZONTAL_ALIGNMENT_CENTER

	title_label.add_theme_font_size_override(
		"font_size",
		42
	)

	title_label.custom_minimum_size = Vector2(0, 60)

	main_container.add_child(title_label)


	# =====================================================
	# DIVIDER
	# =====================================================

	var divider = HSeparator.new()

	divider.custom_minimum_size = Vector2(250, 2)

	divider.size_flags_horizontal = Control.SIZE_SHRINK_CENTER

	main_container.add_child(divider)


	# =====================================================
	# SUBTITLE
	# =====================================================

	var description = Label.new()

	description.text = "Strengthen your everyday\nmemory skills"

	description.horizontal_alignment = HORIZONTAL_ALIGNMENT_CENTER

	description.add_theme_font_size_override(
		"font_size",
		23
	)

	description.custom_minimum_size = Vector2(0, 70)

	main_container.add_child(description)


	# =====================================================
	# SPACER
	# =====================================================

	var spacer = Control.new()

	spacer.custom_minimum_size = Vector2(0, 25)

	main_container.add_child(spacer)


	# =====================================================
	# START BUTTON
	# =====================================================

	var start_button = Button.new()

	start_button.text = "START SESSION"

	start_button.custom_minimum_size = Vector2(
		330,
		85
	)

	start_button.size_flags_horizontal = Control.SIZE_SHRINK_CENTER

	start_button.add_theme_font_size_override(
		"font_size",
		28
	)


	# Normal button

	var start_style = StyleBoxFlat.new()

	start_style.bg_color = Color("#35d07f")

	start_style.corner_radius_top_left = 20
	start_style.corner_radius_top_right = 20
	start_style.corner_radius_bottom_left = 20
	start_style.corner_radius_bottom_right = 20

	start_style.content_margin_left = 20
	start_style.content_margin_right = 20

	start_button.add_theme_stylebox_override(
		"normal",
		start_style
	)


	# Hover

	var hover_style = StyleBoxFlat.new()

	hover_style.bg_color = Color("#45df8f")

	hover_style.corner_radius_top_left = 20
	hover_style.corner_radius_top_right = 20
	hover_style.corner_radius_bottom_left = 20
	hover_style.corner_radius_bottom_right = 20

	start_button.add_theme_stylebox_override(
		"hover",
		hover_style
	)


	# Pressed

	var pressed_style = StyleBoxFlat.new()

	pressed_style.bg_color = Color("#28b86b")

	pressed_style.corner_radius_top_left = 20
	pressed_style.corner_radius_top_right = 20
	pressed_style.corner_radius_bottom_left = 20
	pressed_style.corner_radius_bottom_right = 20

	start_button.add_theme_stylebox_override(
		"pressed",
		pressed_style
	)


	main_container.add_child(start_button)

	start_button.pressed.connect(start_game)


	# =====================================================
	# SESSION INFORMATION
	# =====================================================

	var info = Label.new()

	info.text = "15 ROUNDS  •  VISUAL MEMORY TRAINING"

	info.horizontal_alignment = HORIZONTAL_ALIGNMENT_CENTER

	info.add_theme_font_size_override(
		"font_size",
		16
	)

	info.modulate = Color("#aab4c8")

	main_container.add_child(info)


	# =====================================================
	# SMALL INSTRUCTION
	# =====================================================

	var instruction = Label.new()

	instruction.text = "Remember the items • Select what you recall"

	instruction.horizontal_alignment = HORIZONTAL_ALIGNMENT_CENTER

	instruction.add_theme_font_size_override(
		"font_size",
		14
	)

	instruction.modulate = Color("#7f8aa3")

	main_container.add_child(instruction)


# =========================================================
# START NEW GAME
# =========================================================

func start_new_game():

	score = 0

	round_number = 1

	level = 1

	items_per_round = 3

	total_attempts = 0

	correct_answers = 0

	current_streak = 0

	best_streak = 0
	
	reaction_start_time = 0.0
	total_reaction_time = 0.0
	performance_history.clear()

	play_again_button = null


	# Remove results screen

	for child in root_ui.get_children():

		if child != background:
			child.queue_free()

	await get_tree().process_frame


	# Create fresh game UI

	create_game_ui()

	start_round()


# =========================================================
# CREATE GAME UI AGAIN
# =========================================================

func create_game_ui():

	var center = CenterContainer.new()

	center.position = Vector2(0, 0)

	center.size = get_viewport_rect().size

	root_ui.add_child(center)


	main_container = VBoxContainer.new()

	main_container.custom_minimum_size = Vector2(
		400,
		600
	)

	main_container.add_theme_constant_override(
		"separation",
		20
	)

	center.add_child(main_container)


	# Title

	title_label = Label.new()

	title_label.text = "SHOPPING MEMORY"

	title_label.horizontal_alignment = HORIZONTAL_ALIGNMENT_CENTER

	title_label.add_theme_font_size_override(
		"font_size",
		40
	)

	main_container.add_child(title_label)


	# Instructions

	instruction_label = Label.new()

	instruction_label.horizontal_alignment = HORIZONTAL_ALIGNMENT_CENTER

	instruction_label.add_theme_font_size_override(
		"font_size",
		24
	)

	main_container.add_child(instruction_label)


	# Round

	round_label = Label.new()

	round_label.horizontal_alignment = HORIZONTAL_ALIGNMENT_CENTER

	round_label.add_theme_font_size_override(
		"font_size",
		18
	)

	main_container.add_child(round_label)


	# Timer

	timer_label = Label.new()

	timer_label.horizontal_alignment = HORIZONTAL_ALIGNMENT_CENTER

	timer_label.add_theme_font_size_override(
		"font_size",
		28
	)

	main_container.add_child(timer_label)


	# Grid

	item_grid = GridContainer.new()

	item_grid.columns = 2

	item_grid.size_flags_horizontal = Control.SIZE_EXPAND_FILL

	item_grid.add_theme_constant_override(
		"h_separation",
		15
	)

	item_grid.add_theme_constant_override(
		"v_separation",
		15
	)

	main_container.add_child(item_grid)


	# Feedback

	feedback_label = Label.new()

	feedback_label.horizontal_alignment = HORIZONTAL_ALIGNMENT_CENTER

	feedback_label.add_theme_font_size_override(
		"font_size",
		22
	)

	main_container.add_child(feedback_label)


	# Score

	score_label = Label.new()

	score_label.horizontal_alignment = HORIZONTAL_ALIGNMENT_CENTER

	score_label.add_theme_font_size_override(
		"font_size",
		20
	)

	main_container.add_child(score_label)


# =========================================================
# CLEAR GRID
# =========================================================

func clear_grid():

	if item_grid == null:

		return


	for child in item_grid.get_children():

		child.queue_free()
