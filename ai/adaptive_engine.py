def calculate_performance(accuracy, reaction_time, mistakes):
    """
    Calculate overall performance score out of 100.

    accuracy: value between 0 and 1
               Example: 0.85 = 85%
    reaction_time: time taken in seconds
    mistakes: number of mistakes
    """

    # Accuracy contributes up to 60 points
    accuracy_score = accuracy * 60

    # Reaction time contributes up to 25 points
    if reaction_time <= 3:
        reaction_score = 25
    elif reaction_time <= 6:
        reaction_score = 15
    else:
        reaction_score = 5

    # Mistakes contribute up to 15 points
    if mistakes == 0:
        mistake_score = 15
    elif mistakes <= 2:
        mistake_score = 10
    else:
        mistake_score = 5

    total_score = (
        accuracy_score
        + reaction_score
        + mistake_score
    )

    return round(total_score, 2)


def choose_difficulty(score, current_difficulty):
    """
    Decide the difficulty for the next round.

    Difficulty ranges from 1 to 5.
    """

    if score >= 80:
        return min(current_difficulty + 1, 5)

    elif score >= 60:
        return current_difficulty

    else:
        return max(current_difficulty - 1, 1)


def analyze_history(scores):
    """
    Analyze recent performance.

    scores should contain performance scores.
    """

    if len(scores) < 2:
        return "Not enough data"

    previous = scores[-2]
    current = scores[-1]

    if current > previous + 5:
        return "Improving"

    elif current < previous - 5:
        return "Declining"

    else:
        return "Stable"


def create_cognitive_profile(
    memory,
    attention,
    reaction,
    pattern
):
    """
    Create a cognitive performance profile.
    """

    profile = {
        "Memory": memory,
        "Attention": attention,
        "Reaction": reaction,
        "Pattern Recognition": pattern
    }

    overall = (
        memory
        + attention
        + reaction
        + pattern
    ) / 4

    return profile, round(overall, 2)


def recommend_activity(profile):
    """
    Find the weakest cognitive area
    and recommend a suitable activity.
    """

    weakest_skill = min(
        profile,
        key=profile.get
    )

    recommendations = {
        "Memory":
            "Practice visual memory games",

        "Attention":
            "Practice attention and focus games",

        "Reaction":
            "Practice reaction-speed games",

        "Pattern Recognition":
            "Practice pattern recognition games"
    }

    return (
        weakest_skill,
        recommendations[weakest_skill]
    )


def get_difficulty_settings(level):
    """
    Return the settings for each
    What Changed? difficulty level.
    """

    levels = {

        1: {
            "objects": 4,
            "observation_time": 20,
            "changes": 1
        },

        2: {
            "objects": 6,
            "observation_time": 17,
            "changes": 1
        },

        3: {
            "objects": 8,
            "observation_time": 14,
            "changes": 2
        },

        4: {
            "objects": 10,
            "observation_time": 10,
            "changes": 3
        },

        5: {
            "objects": 12,
            "observation_time": 7,
            "changes": 4
        }
    }

    return levels[level]


def process_game_result(
    accuracy,
    reaction_time,
    mistakes,
    current_difficulty,
    history
):
    """
    Process one completed game.

    Takes the player's game performance
    and decides what should happen next.
    """

    # Step 1: Calculate performance
    performance = calculate_performance(
        accuracy,
        reaction_time,
        mistakes
    )

    # Step 2: Decide next difficulty
    next_difficulty = choose_difficulty(
        performance,
        current_difficulty
    )

    # Step 3: Analyze performance trend
    updated_history = history + [performance]

    trend = analyze_history(
        updated_history
    )

    # Step 4: Get settings for next level
    settings = get_difficulty_settings(
        next_difficulty
    )

    # Step 5: Return everything
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
print("      ADAPTIVE ENGINE TEST")
print("===================================")


# ----------------------------------
# Test 1: Performance History
# ----------------------------------

scores = [60, 65, 72, 82]

trend = analyze_history(scores)

print("\nPerformance History:")
print(scores)

print("Performance Trend:")
print(trend)


# ----------------------------------
# Test 2: Cognitive Profile
# ----------------------------------

profile, overall = create_cognitive_profile(
    memory=80,
    attention=65,
    reaction=90,
    pattern=70
)

print("\nCognitive Profile:")

for skill, score in profile.items():
    print(skill + ":", score)

print("Overall Score:", overall)


# ----------------------------------
# Test 3: Recommendation
# ----------------------------------

weakest, recommendation = recommend_activity(
    profile
)

print("\nArea needing more practice:")
print(weakest)

print("Recommendation:")
print(recommendation)


# ----------------------------------
# Test 4: Game Result
# ----------------------------------

result = process_game_result(
    accuracy=0.85,
    reaction_time=3.2,
    mistakes=1,
    current_difficulty=2,
    history=[65, 72, 78]
)

print("\nGame Result Analysis:")

print("Performance:",
      result["performance"])

print("Next Difficulty:",
      result["next_difficulty"])

print("Trend:",
      result["trend"])

print("Next Game Settings:")
print("Objects:",
      result["settings"]["objects"])

print("Observation Time:",
      result["settings"]["observation_time"],
      "seconds")

print("Number of Changes:",
      result["settings"]["changes"])


print("\n===================================")
print("          TEST COMPLETE")
print("===================================")