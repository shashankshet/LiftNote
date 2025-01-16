import streamlit as st
import threading
import datetime
import json
from RealtimeSTT import AudioToTextRecorder
from g4f.client import Client

# Initialize the GPT-4Free client
client = Client()

# File to store workout logs
WORKOUT_LOG_FILE = "workout_logs.json"

# Recorder instance
recorder = AudioToTextRecorder()

# Global variable to control recording state
is_recording = False


# Function to process GPT-4Free response
def generate_workout_table(user_input):
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
    response = client.chat.completions.create(
        model="gpt-4o-mini",
        messages=[{"role": "user", "content": prompt}],
        web_search=False
    )
    return response.choices[0].message.content.strip()


# Function to save workout logs
def save_workout_log(date, table):
    try:
        with open(WORKOUT_LOG_FILE, "r") as f:
            logs = json.load(f)
    except FileNotFoundError:
        logs = {}

    if date in logs:
        if isinstance(logs[date], list):
            logs[date].append(table)
        else:
            logs[date] = [logs[date], table]
    else:
        logs[date] = [table]

    with open(WORKOUT_LOG_FILE, "w") as f:
        json.dump(logs, f, indent=4)


# Function to load logs
def load_workout_logs():
    try:
        with open(WORKOUT_LOG_FILE, "r") as f:
            return json.load(f)
    except FileNotFoundError:
        return {}
    except Exception as e:
        st.error(f"Error loading logs: {e}")
        return {}


# Function to process text input
def process_text(text):
    st.info(f"Recognized speech: {text}")
    workout_table = generate_workout_table(text)
    st.success("Generated Workout Table:\n")
    st.text(workout_table)
    date = datetime.date.today().isoformat()
    save_workout_log(date, workout_table)


# Thread for recording
def record_audio():
    global is_recording
    while is_recording:
        recorder.text(process_text)


# Streamlit UI
st.title("Workout Logger")
st.write("Log your gym workouts using voice input and GPT-4Free.")

# Start/Stop button for recording
if st.button("Start/Stop Recording"):
    global is_recording

    if not is_recording:
        st.info("Recording started. Speak now.")
        is_recording = True
        threading.Thread(target=record_audio, daemon=True).start()
    else:
        st.warning("Recording stopped.")
        is_recording = False

# Display workout logs
st.header("Workout Logs")
logs = load_workout_logs()
if logs:
    for date, entries in logs.items():
        st.subheader(f"Date: {date}")
        for entry in entries:
            st.text(entry)
else:
    st.info("No logs found yet.")
