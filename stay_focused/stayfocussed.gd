extends Node2D


# =========================================================
# GAME VARIABLES
# =========================================================

var score = 0
var round_number = 1
var max_rounds = 10

var level = 1
var game_state = "menu"

# Target
var target_color = 0
var target_shape = 0

# Current symbol
var current_symbol_color = 0
var current_symbol_shape = 0
var current_symbol_is_target = false

# Statistics
var total_targets = 0
var correct_hits = 0
var missed_targets = 0
var false_alarms = 0

var reaction_times = []

var reaction_start_time = 0
var round_start_time = 0

# Timing
var round_duration = 20.0
var target_interval = 2.0


var symbols_shown = 0
var round_timer = 0.0
var symbol_timer = 0.0
var can_tap = false


# =========================================================
# UI REFERENCES
# =========================================================

var root_ui
var background

var main_container

var title_label
var instruction_label
var target_label
var timer_label
var score_label
var round_label
var symbol_label
var feedback_label

var start_button
var tap_button


# =========================================================
# READY
# =========================================================

func _ready():
    
    randomize()
    create_ui()
    show_menu()
func _process(delta):

    if game_state != "playing":
        return

    # Update round timer
    var elapsed = (
        Time.get_ticks_msec()
        - round_start_time
    ) / 1000.0

    var remaining = max(
        0.0,
        round_duration - elapsed
    )

    timer_label.text = (
        "TIME: "
        + str(snapped(remaining, 0.1))
        + "s"
    )


# =========================================================
# CREATE BASE UI
# =========================================================

func create_ui():

    root_ui = Control.new()

    root_ui.set_anchors_and_offsets_preset(
        Control.PRESET_FULL_RECT
    )

    add_child(root_ui)


    # Background
    background = ColorRect.new()

    background.color = Color("#121827")

    background.set_anchors_and_offsets_preset(
        Control.PRESET_FULL_RECT
    )

    root_ui.add_child(background)


# =========================================================
# MAIN MENU
# =========================================================

func show_menu():

    game_state = "menu"

    for child in root_ui.get_children():

        if child != background:
            child.queue_free()

    await get_tree().process_frame


    # Center
    var center = CenterContainer.new()

    center.set_anchors_and_offsets_preset(
        Control.PRESET_FULL_RECT
    )
    center.size = get_viewport_rect().size

    root_ui.add_child(center)


    # Main container
    main_container = VBoxContainer.new()

    main_container.custom_minimum_size = Vector2(430, 600)

    main_container.add_theme_constant_override(
        "separation",
        20
    )

    center.add_child(main_container)


    # Icon
    var icon = Label.new()

    icon.text = "👁"

    icon.horizontal_alignment = HORIZONTAL_ALIGNMENT_CENTER

    icon.add_theme_font_size_override(
        "font_size",
        70
    )

    icon.custom_minimum_size = Vector2(0, 90)

    main_container.add_child(icon)


    # Title
    title_label = Label.new()

    title_label.text = "STAY FOCUSED"

    title_label.horizontal_alignment = HORIZONTAL_ALIGNMENT_CENTER

    title_label.add_theme_font_size_override(
        "font_size",
        42
    )

    main_container.add_child(title_label)


    # Divider
    var divider = HSeparator.new()

    divider.custom_minimum_size = Vector2(250, 2)

    divider.size_flags_horizontal = Control.SIZE_SHRINK_CENTER

    main_container.add_child(divider)


    # Description
    var description = Label.new()

    description.text = "Train your attention\nby staying focused on the target."

    description.horizontal_alignment = HORIZONTAL_ALIGNMENT_CENTER

    description.add_theme_font_size_override(
        "font_size",
        22
    )

    main_container.add_child(description)


    # Instructions
    var instructions = Label.new()

    instructions.text = "Watch the symbols carefully.\nTap only when the target appears."

    instructions.horizontal_alignment = HORIZONTAL_ALIGNMENT_CENTER

    instructions.add_theme_font_size_override(
        "font_size",
        17
    )

    instructions.modulate = Color("#aab4c8")

    main_container.add_child(instructions)


    # Spacer
    var spacer = Control.new()

    spacer.custom_minimum_size = Vector2(0, 20)

    main_container.add_child(spacer)


    # Start button
    start_button = Button.new()

    start_button.text = "START SESSION"

    start_button.custom_minimum_size = Vector2(330, 80)

    start_button.size_flags_horizontal = Control.SIZE_SHRINK_CENTER

    start_button.add_theme_font_size_override(
        "font_size",
        27
    )


    var start_style = StyleBoxFlat.new()

    start_style.bg_color = Color("#35d07f")

    start_style.corner_radius_top_left = 20
    start_style.corner_radius_top_right = 20
    start_style.corner_radius_bottom_left = 20
    start_style.corner_radius_bottom_right = 20

    start_button.add_theme_stylebox_override(
        "normal",
        start_style
    )

    main_container.add_child(start_button)

    start_button.pressed.connect(start_game)


    # Info
    var info = Label.new()

    info.text = "10 ROUNDS  •  ATTENTION TRAINING"

    info.horizontal_alignment = HORIZONTAL_ALIGNMENT_CENTER

    info.add_theme_font_size_override(
        "font_size",
        15
    )

    info.modulate = Color("#7f8aa3")

    main_container.add_child(info)


# =========================================================
# START GAME
# =========================================================

func start_game():

    score = 0
    round_number = 1
    level = 1

    total_targets = 0
    correct_hits = 0
    missed_targets = 0
    false_alarms = 0

    reaction_times.clear()

    build_game_screen()

    await get_tree().process_frame

    start_round()


# =========================================================
# BUILD GAME SCREEN
# =========================================================

func build_game_screen():

    for child in root_ui.get_children():

        if child != background:
            child.queue_free()

    await get_tree().process_frame


    # Main container
    var container = VBoxContainer.new()

    container.position = Vector2(20, 30)

    container.size = Vector2(
        get_viewport_rect().size.x - 40,
        get_viewport_rect().size.y - 60
    )

    container.add_theme_constant_override(
        "separation",
        10
    )

    root_ui.add_child(container)


    # Title
    title_label = Label.new()

    title_label.text = "STAY FOCUSED"

    title_label.horizontal_alignment = HORIZONTAL_ALIGNMENT_CENTER

    title_label.add_theme_font_size_override(
        "font_size",
        32
    )

    title_label.size_flags_horizontal = Control.SIZE_EXPAND_FILL

    container.add_child(title_label)


    # Round
    round_label = Label.new()

    round_label.text = "ROUND 1"

    round_label.horizontal_alignment = HORIZONTAL_ALIGNMENT_CENTER

    round_label.add_theme_font_size_override(
        "font_size",
        18
    )

    round_label.size_flags_horizontal = Control.SIZE_EXPAND_FILL

    container.add_child(round_label)


    # Instructions
    instruction_label = Label.new()

    instruction_label.text = "Remember the target"

    instruction_label.horizontal_alignment = HORIZONTAL_ALIGNMENT_CENTER

    instruction_label.add_theme_font_size_override(
        "font_size",
        20
    )

    instruction_label.size_flags_horizontal = Control.SIZE_EXPAND_FILL

    instruction_label.autowrap_mode = TextServer.AUTOWRAP_WORD_SMART

    container.add_child(instruction_label)


    # Target
    target_label = Label.new()

    target_label.text = "TARGET"

    target_label.horizontal_alignment = HORIZONTAL_ALIGNMENT_CENTER

    target_label.vertical_alignment = VERTICAL_ALIGNMENT_CENTER

    target_label.add_theme_font_size_override(
        "font_size",
        50
    )

    target_label.custom_minimum_size = Vector2(0, 80)

    target_label.size_flags_horizontal = Control.SIZE_EXPAND_FILL

    container.add_child(target_label)


    # Timer
    timer_label = Label.new()

    timer_label.text = ""

    timer_label.horizontal_alignment = HORIZONTAL_ALIGNMENT_CENTER

    timer_label.add_theme_font_size_override(
        "font_size",
        18
    )

    timer_label.size_flags_horizontal = Control.SIZE_EXPAND_FILL

    container.add_child(timer_label)


    # Symbol center
    var symbol_center = CenterContainer.new()

    symbol_center.size_flags_vertical = Control.SIZE_EXPAND_FILL

    symbol_center.size_flags_horizontal = Control.SIZE_EXPAND_FILL

    container.add_child(symbol_center)


    # Symbol
    symbol_label = Label.new()

    symbol_label.text = ""

    symbol_label.horizontal_alignment = HORIZONTAL_ALIGNMENT_CENTER

    symbol_label.vertical_alignment = VERTICAL_ALIGNMENT_CENTER

    symbol_label.add_theme_font_size_override(
        "font_size",
        110
    )

    symbol_label.custom_minimum_size = Vector2(250, 220)

    symbol_center.add_child(symbol_label)


    # Feedback
    feedback_label = Label.new()

    feedback_label.text = ""

    feedback_label.horizontal_alignment = HORIZONTAL_ALIGNMENT_CENTER

    feedback_label.add_theme_font_size_override(
        "font_size",
        20
    )

    feedback_label.size_flags_horizontal = Control.SIZE_EXPAND_FILL

    container.add_child(feedback_label)


    # Tap button
    tap_button = Button.new()

    tap_button.text = "TAP TARGET"

    tap_button.custom_minimum_size = Vector2(0, 85)

    tap_button.size_flags_horizontal = Control.SIZE_EXPAND_FILL

    tap_button.add_theme_font_size_override(
        "font_size",
        28
    )


    var tap_style = StyleBoxFlat.new()

    tap_style.bg_color = Color("#35d07f")

    tap_style.corner_radius_top_left = 20
    tap_style.corner_radius_top_right = 20
    tap_style.corner_radius_bottom_left = 20
    tap_style.corner_radius_bottom_right = 20

    tap_button.add_theme_stylebox_override(
        "normal",
        tap_style
    )

    container.add_child(tap_button)

    tap_button.pressed.connect(player_tapped)


    # Score
    score_label = Label.new()

    score_label.text = "Score: 0"

    score_label.horizontal_alignment = HORIZONTAL_ALIGNMENT_CENTER

    score_label.add_theme_font_size_override(
        "font_size",
        19
    )

    score_label.size_flags_horizontal = Control.SIZE_EXPAND_FILL

    container.add_child(score_label)


# =========================================================
# START ROUND
# =========================================================

func start_round():

    game_state = "playing"
    can_tap= false


    # Determine level
    if round_number <= 4:

        level = 1

    elif round_number <= 7:

        level = 2

    else:

        level = 3


    # Level settings
    if level == 1:

        round_duration = 20.0
        target_interval = 2.0

    elif level == 2:

        round_duration = 25.0
        target_interval = 1.7

    else:

        round_duration = 30.0
        target_interval = 1.5


    # Choose target
    if level == 1:

        target_color = 0

    elif level == 2:

        target_shape = randi_range(0, 3)

    else:

        target_color = randi_range(0, 3)
        target_shape = randi_range(0, 3)


    # Round label
    round_label.text = (
		"ROUND "
        + str(round_number)
        + "  •  LEVEL "
        + str(level)
    )


    # Instructions
    if level == 1:

        instruction_label.text = "TAP ONLY WHEN YOU SEE THIS COLOR"

        target_label.text = "TARGET: " + get_color_symbol(target_color)

    elif level == 2:

        instruction_label.text = "TAP ONLY WHEN YOU SEE THIS SHAPE"

        target_label.text = "TARGET: " + get_shape_symbol(target_shape)

    else:

        instruction_label.text = "TAP ONLY WHEN YOU SEE THIS COMBINATION"

        target_label.text = (
			"TARGET: "
            + get_color_symbol(target_color)
            + " "
            + get_shape_symbol(target_shape)
        )


    # Reset UI
    timer_label.text = ""

    feedback_label.text = ""

    score_label.text = "Score: " + str(score)


    # Reset round
    round_start_time = Time.get_ticks_msec()
    round_timer = 0.0
    symbol_timer = 0.0
    

    symbols_shown = 0

    

    current_symbol_is_target = false
    can_tap=false


    # Start symbol sequence
    show_next_symbol()


# =========================================================
# SHOW NEXT SYMBOL
# =========================================================

func show_next_symbol():

    if game_state != "playing":
        return

    # Check elapsed round time
    var elapsed = (
        Time.get_ticks_msec()
        - round_start_time
    ) / 1000.0

    if elapsed >= round_duration:
        end_round()
        return

    # Generate symbol
    current_symbol_color = randi_range(0, 3)
    current_symbol_shape = randi_range(0, 3)

    # Determine if this is a target
    if level == 1:

        current_symbol_is_target = (
            current_symbol_color == target_color
        )

    elif level == 2:

        current_symbol_is_target = (
            current_symbol_shape == target_shape
        )

    else:

        current_symbol_is_target = (
            current_symbol_color == target_color
            and current_symbol_shape == target_shape
        )

    # Display symbol
    symbol_label.text = get_symbol(
        current_symbol_color,
        current_symbol_shape
    )

    symbols_shown += 1

    # Allow player to tap
    can_tap = true

    # Start reaction timer for targets
    if current_symbol_is_target:

        total_targets += 1
        reaction_start_time = Time.get_ticks_msec()

    # Wait for symbol duration
    await get_tree().create_timer(
        target_interval
    ).timeout

    # If player did not respond to target
    if (
        current_symbol_is_target
        and game_state == "playing"
    ):

        missed_targets += 1

    # Disable tapping until next symbol
    can_tap = false

    # Continue sequence
    show_next_symbol()


# =========================================================
# PLAYER TAP
# =========================================================

func player_tapped():

    if game_state != "playing":
        return
    if not can_tap:
        return


    # Correct
    if current_symbol_is_target:

        var reaction = (
            Time.get_ticks_msec()
            - reaction_start_time
        ) / 1000.0

        reaction_times.append(reaction)

        correct_hits += 1

        score += 10

        feedback_label.text = "CORRECT!"

        score_label.text = "Score: " + str(score)

        # Prevent duplicate hit
        current_symbol_is_target = false
        can_tap= false


    # False alarm
    else:

        false_alarms += 1

        score -= 2

        if score < 0:
            score = 0

        feedback_label.text = "WAIT FOR THE TARGET"

        score_label.text = "Score: " + str(score)


# =========================================================
# GET SYMBOL
# =========================================================

func get_symbol(color_id, shape_id):

    if shape_id == 0:
        return get_color_symbol(color_id) + "●"

    elif shape_id == 1:
        return get_color_symbol(color_id) + "▲"

    elif shape_id == 2:
        return get_color_symbol(color_id) + "■"

    else:
        return get_color_symbol(color_id) + "★"


# =========================================================
# GET SHAPE SYMBOL
# =========================================================

func get_shape_symbol(shape_id):

    if shape_id == 0:
        return "●"

    elif shape_id == 1:
        return "▲"

    elif shape_id == 2:
        return "■"

    else:
        return "★"


# =========================================================
# GET COLOR SYMBOL
# =========================================================

func get_color_symbol(color_id):

    if color_id == 0:
        return "🔴"

    elif color_id == 1:
        return "🔵"

    elif color_id == 2:
        return "🟢"

    else:
        return "🟡"


# =========================================================
# END ROUND
# =========================================================

func end_round():

    if game_state != "playing":
        return


    game_state = "result"

    symbol_label.text = ""

    timer_label.text = ""

    instruction_label.text = "ROUND COMPLETE"

    feedback_label.text = (
		"Targets: "
        + str(total_targets)
        + "\nCorrect: "
        + str(correct_hits)
        + "\nMissed: "
        + str(missed_targets)
        + "\nFalse alarms: "
        + str(false_alarms)
    )


    await get_tree().create_timer(2.0).timeout


    # Game finished
    if round_number >= max_rounds:

        show_results()

        return


    # Next round
    round_number += 1

    start_round()


# =========================================================
# RESULTS
# =========================================================

func show_results():

    game_state = "results"


    # Accuracy
    var accuracy = 0.0

    var total_target_responses = correct_hits + missed_targets

    if total_target_responses > 0:

        accuracy = (
            float(correct_hits)
            / float(total_target_responses)
        ) * 100.0


    # Average reaction
    var average_reaction = 0.0

    if reaction_times.size() > 0:

        for reaction in reaction_times:

            average_reaction += reaction

        average_reaction /= reaction_times.size()


    # Message
    var message = ""

    if accuracy >= 90:

        message = "EXCELLENT ATTENTION!"

    elif accuracy >= 75:

        message = "GREAT FOCUS!"

    elif accuracy >= 60:

        message = "GOOD EFFORT!"

    else:

        message = "KEEP PRACTICING!"


    # Clear screen
    for child in root_ui.get_children():

        if child != background:

            child.queue_free()

    await get_tree().process_frame


    # Center
    var center = CenterContainer.new()

    center.set_anchors_and_offsets_preset(
        Control.PRESET_FULL_RECT
    )

    root_ui.add_child(center)


    # Results container
    var container = VBoxContainer.new()

    container.custom_minimum_size = Vector2(
        430,
        700
    )

    container.add_theme_constant_override(
        "separation",
        16
    )

    center.add_child(container)


    # Title
    var title = Label.new()

    title.text = "SESSION COMPLETE"

    title.horizontal_alignment = HORIZONTAL_ALIGNMENT_CENTER

    title.add_theme_font_size_override(
        "font_size",
        36
    )

    container.add_child(title)


    # Message
    var message_label = Label.new()

    message_label.text = message

    message_label.horizontal_alignment = HORIZONTAL_ALIGNMENT_CENTER

    message_label.add_theme_font_size_override(
        "font_size",
        25
    )

    container.add_child(message_label)


    # Results
    var stats = Label.new()

    stats.text = (
		"ACCURACY\n"
        + str(snapped(accuracy, 0.1))
        + "%\n\n"
        + "CORRECT TARGETS\n"
        + str(correct_hits)
        + "\n\n"
        + "MISSED TARGETS\n"
        + str(missed_targets)
        + "\n\n"
        + "FALSE ALARMS\n"
        + str(false_alarms)
        + "\n\n"
        + "AVERAGE REACTION\n"
        + str(snapped(average_reaction, 0.01))
        + " sec\n\n"
        + "FINAL SCORE\n"
        + str(score)
    )

    stats.horizontal_alignment = HORIZONTAL_ALIGNMENT_CENTER

    stats.add_theme_font_size_override(
        "font_size",
        18
    )

    container.add_child(stats)


    # Play Again
    var again = Button.new()

    again.text = "PLAY AGAIN"

    again.custom_minimum_size = Vector2(
        280,
        70
    )

    again.size_flags_horizontal = Control.SIZE_SHRINK_CENTER

    again.add_theme_font_size_override(
        "font_size",
        24
    )

    container.add_child(again)

    again.pressed.connect(start_game)


    # Main Menu
    var menu = Button.new()

    menu.text = "MAIN MENU"

    menu.custom_minimum_size = Vector2(
        280,
        60
    )

    menu.size_flags_horizontal = Control.SIZE_SHRINK_CENTER

    menu.add_theme_font_size_override(
        "font_size",
        21
    )

    container.add_child(menu)

    menu.pressed.connect(show_menu)
