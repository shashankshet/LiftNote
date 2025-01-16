from RealtimeSTT import AudioToTextRecorder
from g4f.client import Client
import json
import datetime

# Initialize the GPT-4Free client
client = Client()

# File to store workout logs
WORKOUT_LOG_FILE = "workout_logs.json"


# Function to process GPT-4Free response
def generate_workout_table(user_input):
    # Tweak the prompt to guide GPT-4Free as a gym logger
    prompt = f"""
    You are a gym workout logger. Based on the following voice input, generate a structured workout log.
    The log should have the following columns:
    1. Exercise Name
    2. Sets
    3. Reps
    4. Weight (in kg)

    Example format:
    Exercise Name | Sets | Reps | Weight (kg)
    Push-ups      | 3    | 12   | Bodyweight

    User input: "{user_input}"
    """

    # Send request to GPT-4Free
    response = client.chat.completions.create(
        model="gpt-4o-mini",
        messages=[{"role": "user", "content": prompt}],
        web_search=False
    )
    return response.choices[0].message.content.strip()


# Function to save workout logs
def save_workout_log(date, table):
    try:
        # Load existing logs if any
        try:
            with open(WORKOUT_LOG_FILE, "r") as f:
                logs = json.load(f)
        except FileNotFoundError:
            logs = {}

        # Ensure that logs[date] is a list, then append the new log
        if date in logs:
            if isinstance(logs[date], list):  # Check if it's already a list
                logs[date].append(table)
            else:  # If not, convert the string to a list and append
                logs[date] = [logs[date], table]
        else:
            logs[date] = [table]  # Initialize as a list if date doesn't exist

        # Save back to the file
        with open(WORKOUT_LOG_FILE, "w") as f:
            json.dump(logs, f, indent=4)
        print(f"Workout log for {date} saved successfully!")
    except Exception as e:
        print(f"Error saving workout log: {e}")


# Function to process speech-to-text output
def process_text(text):
    print(f"Recognized speech: {text}")

    # Generate workout table using GPT-4Free
    workout_table = generate_workout_table(text)
    print("\nGenerated Workout Table:\n")
    print(workout_table)

    # Save workout log with today's date
    date = datetime.date.today().isoformat()
    save_workout_log(date, workout_table)


if __name__ == "__main__":
    print("Wait until it says 'speak now'")
    recorder = AudioToTextRecorder()

    while True:
        # Listen to speech and process it
        recorder.text(process_text)
