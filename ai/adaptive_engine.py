def calculate_performance(
    score,
    accuracy,
    avg_reaction_time,
    best_streak
):
    """
    Calculate a performance score out of 100.

    accuracy:
        0 to 100

    score:
        Game score

    avg_reaction_time:
        Average time in seconds

    best_streak:
        Longest correct-answer streak
    """

    # --------------------------------
    # SCORE COMPONENT
    # --------------------------------

    # Current game has 20 rounds
    # and gives 10 points for each
    # correct answer.
    max_score = 200

    score_percentage = (
        min(score / max_score, 1.0) * 100
    )

    # --------------------------------
    # ACCURACY COMPONENT
    # --------------------------------

    accuracy_score = accuracy

    # --------------------------------
    # REACTION TIME COMPONENT
    # --------------------------------

    if avg_reaction_time <= 2:
        reaction_score = 100

    elif avg_reaction_time <= 3:
        reaction_score = 90

    elif avg_reaction_time <= 4:
        reaction_score = 80

    elif avg_reaction_time <= 5:
        reaction_score = 70

    elif avg_reaction_time <= 6:
        reaction_score = 60

    else:
        reaction_score = 40

    # --------------------------------
    # STREAK COMPONENT
    # --------------------------------

    streak_score = min(
        (best_streak / 10) * 100,
        100
    )

    # --------------------------------
    # FINAL PERFORMANCE
    # --------------------------------

    performance = (
        score_percentage * 0.20
        + accuracy_score * 0.40
        + reaction_score * 0.25
        + streak_score * 0.15
    )

    return round(performance, 2)


def choose_difficulty(
    performance,
    current_difficulty
):
    """
    Choose the next difficulty level.

    Difficulty ranges from 1 to 4
    for the current What Changed? game.
    """

    if performance >= 80:
        return min(
            current_difficulty + 1,
            4
        )

    elif performance < 55:
        return max(
            current_difficulty - 1,
            1
        )

    else:
        return current_difficulty


def analyze_history(history):
    """
    Analyze the player's recent
    performance trend.
    """

    if len(history) < 2:
        return "Not enough data"

    previous = history[-2]
    current = history[-1]

    if current > previous + 5:
        return "Improving"

    elif current < previous - 5:
        return "Declining"

    else:
        return "Stable"


def get_difficulty_settings(level):
    """
    Settings for the current
    What Changed? game.
    """

    levels = {

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


def process_game_result(
    score,
    accuracy,
    avg_reaction_time,
    best_streak,
    current_difficulty,
    history
):
    """
    Main adaptive AI function.

    Receives results from the Godot game
    and decides the next difficulty.
    """

    # Calculate performance
    performance = calculate_performance(
        score,
        accuracy,
        avg_reaction_time,
        best_streak
    )

    # Decide next difficulty
    next_difficulty = choose_difficulty(
        performance,
        current_difficulty
    )

    # Update history
    updated_history = history + [
        performance
    ]

    # Analyze trend
    trend = analyze_history(
        updated_history
    )

    # Get settings for next game
    settings = get_difficulty_settings(
        next_difficulty
    )

    return {
        "performance": performance,
        "next_difficulty": next_difficulty,
        "trend": trend,
        "settings": settings
    }


# ==================================================
# TESTING
# ==================================================

print("===================================")
print("       ADAPTIVE ENGINE TEST")
print("===================================")


# Example result from Godot

score = 160
accuracy = 80
avg_reaction_time = 3.2
best_streak = 6

current_difficulty = 2

history = [
    62,
    68,
    74
]


result = process_game_result(
    score,
    accuracy,
    avg_reaction_time,
    best_streak,
    current_difficulty,
    history
)


print("\nGame Results:")
print("Score:", score)
print("Accuracy:", accuracy, "%")
print(
    "Average Reaction Time:",
    avg_reaction_time,
    "seconds"
)
print("Best Streak:", best_streak)

print("\nAI Analysis:")
print(
    "Performance:",
    result["performance"]
)

print(
    "Next Difficulty:",
    result["next_difficulty"]
)

print(
    "Trend:",
    result["trend"]
)

print("\nNext Game Settings:")

print(
    "Objects:",
    result["settings"]["objects"]
)

print(
    "Memorize Time:",
    result["settings"]["memorize_time"],
    "seconds"
)

print(
    "Change Types:",
    result["settings"]["change_types"]
)

print("\n===================================")
print("          TEST COMPLETE")
print("===================================")