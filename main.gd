extends Node2D

var score = 0
var round_number = 1
var changed_object = 0
var difficulty=1
var block_count = 4
var reaction_start_time = 0
var reaction_time = 0.0
var total_attempts = 0
var correct_answers = 0
var current_streak = 0
var best_streak = 0
var max_rounds = 20
var total_reaction_time = 0.0
var performance_history: Array[float] = []
var ai_engine: AdaptiveEngine
var play_again_button
var change_type = 0
var main_container

var original_colors = []
var original_shapes=[]
var new_colors = []

var root_ui
var title_label
var instruction_label
var timer_label
var score_label
var round_label
var grid
var start_button
var feedback_label

var answer_buttons = []

var game_state = "menu"


func _ready():
    ai_engine = AdaptiveEngine.new()
    create_ui()
    show_menu()


# =========================================================
# UI SETUP
# =========================================================
func create_ui():
    var root = Control.new()
    root.set_anchors_and_offsets_preset(Control.PRESET_FULL_RECT)
    add_child(root)

    root_ui = root

    # Background
    var background = ColorRect.new()
    background.color = Color("#121827")
    background.set_anchors_and_offsets_preset(Control.PRESET_FULL_RECT)
    root.add_child(background)

    # Center everything
    # Center everything
    var center = CenterContainer.new()
    center.position = Vector2(0, 0)
    center.size = get_viewport_rect().size

    root.add_child(center)

# Main vertical container
    main_container = VBoxContainer.new()
    main_container.custom_minimum_size = Vector2(400, 600)
    main_container.add_theme_constant_override("separation", 20)
    center.add_child(main_container)

    # Title
    title_label = Label.new()
    title_label.text = "RETRIX"
    title_label.horizontal_alignment = HORIZONTAL_ALIGNMENT_CENTER
    title_label.add_theme_font_size_override("font_size", 48)
    main_container.add_child(title_label)

    # Subtitle
    var subtitle = Label.new()
    subtitle.text = "Cognitive Training"
    subtitle.horizontal_alignment = HORIZONTAL_ALIGNMENT_CENTER
    subtitle.add_theme_font_size_override("font_size", 24)
    main_container.add_child(subtitle)

    # Description
    var description = Label.new()
    description.text = "Train your visual memory\nby finding what changed."
    description.horizontal_alignment = HORIZONTAL_ALIGNMENT_CENTER
    description.add_theme_font_size_override("font_size", 20)
    main_container.add_child(description)

    # Space
    var spacer = Control.new()
    spacer.custom_minimum_size = Vector2(0, 40)
    main_container.add_child(spacer)

    # Start button
    start_button = Button.new()
    start_button.text = "START GAME"
    start_button.custom_minimum_size = Vector2(0, 80)
    start_button.add_theme_font_size_override("font_size", 28)
    main_container.add_child(start_button)

    start_button.pressed.connect(start_game)

    # Information
    var info = Label.new()
    info.text = "VISUAL MEMORY • BEGINNER"
    info.horizontal_alignment = HORIZONTAL_ALIGNMENT_CENTER
    info.add_theme_font_size_override("font_size", 16)
    main_container.add_child(info)
# MAIN MENU
# =========================================================

func show_menu():
    game_state = "menu"

    title_label.text = "RETRIX"

    instruction_label = null

    start_button.visible = true


# =========================================================
# START GAME
# =========================================================

func start_game():
    game_state = "memorize"
    score = 0
    round_number = 1

    build_game_screen()
    start_round()


# =========================================================
# GAME SCREEN
# =========================================================
func build_game_screen():
    for child in root_ui.get_children():
        if child != root_ui.get_child(0):
            child.queue_free()

    # Get the actual phone/screen size
    var screen_size = get_viewport_rect().size

    # Main game container
    var container = VBoxContainer.new()
    container.position = Vector2(20, 30)
    container.size = Vector2(screen_size.x - 40, screen_size.y - 60)

    container.add_theme_constant_override("separation", 12)

    root_ui.add_child(container)

    # Title
    title_label = Label.new()
    title_label.text = "WHAT CHANGED?"
    title_label.horizontal_alignment = HORIZONTAL_ALIGNMENT_CENTER
    title_label.add_theme_font_size_override("font_size", 32)
    title_label.size_flags_horizontal = Control.SIZE_EXPAND_FILL
    container.add_child(title_label)

    # Round
    round_label = Label.new()
    round_label.text = "ROUND 1"
    round_label.horizontal_alignment = HORIZONTAL_ALIGNMENT_CENTER
    round_label.add_theme_font_size_override("font_size", 18)
    round_label.size_flags_horizontal = Control.SIZE_EXPAND_FILL
    container.add_child(round_label)

    # Instructions
    instruction_label = Label.new()
    instruction_label.text = "Remember the pattern"
    instruction_label.horizontal_alignment = HORIZONTAL_ALIGNMENT_CENTER
    instruction_label.add_theme_font_size_override("font_size", 22)
    instruction_label.size_flags_horizontal = Control.SIZE_EXPAND_FILL
    container.add_child(instruction_label)

    # Timer
    timer_label = Label.new()
    timer_label.text = "MEMORIZE"
    timer_label.horizontal_alignment = HORIZONTAL_ALIGNMENT_CENTER
    timer_label.add_theme_font_size_override("font_size", 18)
    timer_label.size_flags_horizontal = Control.SIZE_EXPAND_FILL
    container.add_child(timer_label)

    # Grid
    grid = GridContainer.new()
    grid.columns = 2

    grid.size_flags_horizontal = Control.SIZE_EXPAND_FILL
    grid.size_flags_vertical = Control.SIZE_EXPAND_FILL

    grid.custom_minimum_size = Vector2(0, 400)

    grid.add_theme_constant_override("h_separation", 15)
    grid.add_theme_constant_override("v_separation", 15)

    container.add_child(grid)

    # Feedback
    feedback_label = Label.new()
    feedback_label.text = ""
    feedback_label.horizontal_alignment = HORIZONTAL_ALIGNMENT_CENTER
    feedback_label.add_theme_font_size_override("font_size", 24)
    feedback_label.size_flags_horizontal = Control.SIZE_EXPAND_FILL
    container.add_child(feedback_label)

    # Score
    score_label = Label.new()
    score_label.text = "Score: 0"
    score_label.horizontal_alignment = HORIZONTAL_ALIGNMENT_CENTER
    score_label.add_theme_font_size_override("font_size", 20)
    score_label.size_flags_horizontal = Control.SIZE_EXPAND_FILL
    container.add_child(score_label)
  
    # Make the container responsiv
#===================================================
# START ROUND
# =========================================================

func start_round():
        

    game_state = "memorize"

    instruction_label.text = "Remember the pattern"
    feedback_label.text = ""

    round_label.text = "ROUND " + str(round_number) + "  •  LEVEL " + str(difficulty)

    # Decide number of blocks
       # Get settings from AI
    var settings = ai_engine.get_difficulty_settings(difficulty)

    block_count = settings["objects"]

    var memorize_seconds = settings["memorize_time"]

    # Available colors
    var available_colors = [
        Color("#ff5c57"),
        Color("#5b8cff"),
        Color("#35d07f"),
        Color("#ffd43b")
    ]

    # Create enough colors for the blocks
    original_colors.clear()

    for i in range(block_count):
        original_colors.append(available_colors[i % available_colors.size()])

    original_colors.shuffle()

    # Choose which block will change
    changed_object = randi_range(0, block_count - 1)

    # Create shapes
    original_shapes.clear()

    for i in range(block_count):
        original_shapes.append(i % 4)

    original_shapes.shuffle()

    # Show original pattern
    await show_pattern(original_colors)

 

    for seconds in range(memorize_seconds, 0, -1):
       timer_label.text = str(seconds)
       await get_tree().create_timer(1.0).timeout

    # Hide pattern
    hide_pattern()

    timer_label.text = ""
    instruction_label.text = "Get ready..."

    await get_tree().create_timer(0.5).timeout

    # Show changed pattern
    show_changed_pattern()
    # =========================================================
# CREATE OBJECTS
# =========================================================

func create_object(color: Color, shape_id: int):
    var button = Button.new()

    button.custom_minimum_size = Vector2(180, 180)
    button.size_flags_horizontal = Control.SIZE_EXPAND_FILL
    button.size_flags_vertical = Control.SIZE_EXPAND_FILL
    button.text = ""

    # Block background
    var style = StyleBoxFlat.new()
    style.bg_color = color
    style.corner_radius_top_left = 25
    style.corner_radius_top_right = 25
    style.corner_radius_bottom_left = 25
    style.corner_radius_bottom_right = 25

    button.add_theme_stylebox_override("normal", style)

    # Pressed appearance
    var pressed_style = StyleBoxFlat.new()
    pressed_style.bg_color = color.darkened(0.2)
    pressed_style.corner_radius_top_left = 25
    pressed_style.corner_radius_top_right = 25
    pressed_style.corner_radius_bottom_left = 25
    pressed_style.corner_radius_bottom_right = 25

    button.add_theme_stylebox_override("pressed", pressed_style)

    # Center the shape
    var center = CenterContainer.new()
    center.set_anchors_and_offsets_preset(Control.PRESET_FULL_RECT)
    center.mouse_filter = Control.MOUSE_FILTER_IGNORE
    button.add_child(center)

    # Fixed area for the shape
    var shape_area = Control.new()
    shape_area.custom_minimum_size = Vector2(120, 120)
    shape_area.mouse_filter = Control.MOUSE_FILTER_IGNORE
    center.add_child(shape_area)

    # Polygon shape
    var shape = Polygon2D.new()
    var points = PackedVector2Array()

    if shape_id == 0:
        # Circle
        for i in range(32):
            var angle = TAU * i / 32.0
            points.append(
                Vector2(cos(angle), sin(angle)) * 45.0
                + Vector2(60, 60)
            )

    elif shape_id == 1:
        # Triangle
        points = PackedVector2Array([
            Vector2(60, 10),
            Vector2(110, 100),
            Vector2(10, 100)
        ])

    elif shape_id == 2:
        # Square
        points = PackedVector2Array([
            Vector2(15, 15),
            Vector2(105, 15),
            Vector2(105, 105),
            Vector2(15, 105)
        ])

    elif shape_id == 3:
        # Star
        for i in range(10):
            var angle = -PI / 2.0 + TAU * i / 10.0
            var radius = 50.0 if i % 2 == 0 else 22.0

            points.append(
                Vector2(cos(angle), sin(angle)) * radius
                + Vector2(60, 60)
            )

    shape.polygon = points
    shape.color = Color.WHITE

    shape_area.add_child(shape)

    grid.add_child(button)

    return button
func show_pattern(colors):
    for child in grid.get_children():
        child.queue_free()

    await get_tree().process_frame

    answer_buttons.clear()

    for i in range(block_count):
        var button = create_object(colors[i], original_shapes[i])
        answer_buttons.append(button)
func hide_pattern():
    for child in grid.get_children():
        child.queue_free()

    await get_tree().process_frame

# =========================================================
# SHOW CHANGED PATTERN
# =========================================================

func show_changed_pattern():
    game_state = "answer"
    reaction_start_time = Time.get_ticks_msec()

    instruction_label.text = "What changed?"
    timer_label.text = "TAP THE CHANGED BLOCK"
    feedback_label.text = ""

    for child in grid.get_children():
        child.queue_free()

    answer_buttons.clear()

    for i in range(block_count):
        var color = original_colors[i]
        var shape_id = original_shapes[i]

        # Change ONLY the selected object
        if i == changed_object:

            if change_type == 0:
                # Shape change
                shape_id = (shape_id + 1) % 4

            elif change_type == 1:
                # Color change
                if color == Color("#ff5c57"):
                    color = Color("#5b8cff")
                elif color == Color("#5b8cff"):
                    color = Color("#35d07f")
                elif color == Color("#35d07f"):
                    color = Color("#ffd43b")
                else:
                    color = Color("#ff5c57")

        var button = create_object(color, shape_id)

        answer_buttons.append(button)

        button.pressed.connect(func():
            check_answer(i)
        )
        
        


# =========================================================
# PLAYER ANSWER
# =========================================================

func _on_answer_pressed(index):
    check_answer(index)

func start_new_game():
    if play_again_button:
        play_again_button.queue_free()

    play_again_button = null

    score = 0
    round_number = 1
    difficulty = 1
    block_count = 4
    performance_history.clear()

    total_attempts = 0
    correct_answers = 0
    current_streak = 0
    best_streak = 0

    reaction_time = 0.0
    total_reaction_time = 0.0

    start_game()
    
func show_results():
    game_state = "results"

    # Calculate accuracy
    var accuracy = 0.0

    if total_attempts > 0:
        accuracy = (float(correct_answers) / float(total_attempts)) * 100.0

    # Calculate average reaction time
    var average_reaction_time = 0.0

    if total_attempts > 0:
        average_reaction_time = total_reaction_time / float(total_attempts)

    # Remove the game screen
    for child in root_ui.get_children():
        if child != root_ui.get_child(0):
            child.queue_free()

    await get_tree().process_frame

    # Create a full-screen center container
    var results_center = CenterContainer.new()
    results_center.name = "ResultsCenter"

    results_center.position = Vector2(0, 0)
    results_center.size = get_viewport_rect().size

    root_ui.add_child(results_center)

    # Create results vertical container
    var results_container = VBoxContainer.new()

    results_container.custom_minimum_size = Vector2(400, 600)

    results_container.add_theme_constant_override("separation", 20)

    results_center.add_child(results_container)

    # Title
    var results_title = Label.new()

    results_title.text = "GAME COMPLETE!"
    results_title.horizontal_alignment = HORIZONTAL_ALIGNMENT_CENTER
    results_title.add_theme_font_size_override("font_size", 36)

    results_container.add_child(results_title)

    # Results information
    var results_label = Label.new()

    results_label.text = (
        "FINAL RESULTS\n\n" +
        "Score: " + str(score) +
        "\n\nAccuracy: " + str(snapped(accuracy, 0.1)) + "%" +
        "\n\nAverage Reaction Time: " +
        str(snapped(average_reaction_time, 0.01)) + " sec" +
        "\n\nBest Streak: " + str(best_streak)
    )

    results_label.horizontal_alignment = HORIZONTAL_ALIGNMENT_CENTER
    results_label.add_theme_font_size_override("font_size", 22)

    results_container.add_child(results_label)

    # Play Again button
    play_again_button = Button.new()

    play_again_button.text = "PLAY AGAIN"

    play_again_button.custom_minimum_size = Vector2(250, 70)

    play_again_button.add_theme_font_size_override("font_size", 24)

    play_again_button.size_flags_horizontal = Control.SIZE_SHRINK_CENTER

    results_container.add_child(play_again_button)

    play_again_button.pressed.connect(start_new_game)


func check_answer(index):
    if game_state != "answer":
        return

    game_state = "result"

    # Calculate reaction time
    reaction_time = (Time.get_ticks_msec() - reaction_start_time) / 1000.0
    total_reaction_time += reaction_time

    # Count this attempt
    total_attempts += 1

    if index == changed_object:

        # Correct answer
        correct_answers += 1
        current_streak += 1

        if current_streak > best_streak:
            best_streak = current_streak

        score += 10

        instruction_label.text = "CORRECT!"

        feedback_label.text = "+10 points\nReaction time: " + str(snapped(reaction_time, 0.01)) + " sec\nStreak: " + str(current_streak)

    else:

        # Wrong answer
        current_streak = 0

        instruction_label.text = "WRONG!"

        feedback_label.text = "The changed object was #" + str(changed_object + 1) + "\nReaction time: " + str(snapped(reaction_time, 0.01)) + " sec"

    score_label.text = "Score: " + str(score)

    timer_label.text = ""

    await get_tree().create_timer(2.0).timeout
    
    if round_number>=max_rounds:
        show_results()
        return
    # Evaluate performance after every 5 rounds
    if round_number % 5 == 0:
        evaluate_with_ai()

    round_number += 1
    start_round()
    
func evaluate_with_ai():
    var accuracy = 0.0
    var average_reaction_time = 0.0

    if total_attempts > 0:
        accuracy = (float(correct_answers) / float(total_attempts)) * 100.0

    if total_attempts > 0:
        average_reaction_time = total_reaction_time / float(total_attempts)

    var result = ai_engine.process_game_result(
        score,
        accuracy,
        average_reaction_time,
        best_streak,
        difficulty,
        performance_history
    )

    performance_history.append(result["performance"])

    difficulty = result["next_difficulty"]

    print("========== AI ANALYSIS ==========")
    print("Performance: ", result["performance"])
    print("Next Difficulty: ", result["next_difficulty"])
    print("Trend: ", result["trend"])
    print("Objects: ", result["settings"]["objects"])
    print("Memorize Time: ", result["settings"]["memorize_time"])
    print("=================================")
    

    
