import os
import json
import django

# Replace 'backend' with the actual name of your Django project
os.environ.setdefault("DJANGO_SETTINGS_MODULE", "backend.settings")
django.setup()

from api.models import Language, QuestionSet, Question, QuestionOption, QuestionAnswer

def insert_data():
    with open('questions.json', 'r') as file:
        data = json.load(file)
        language, created = Language.objects.get_or_create(language="English")

        # Limit the number of questions to 10
        questions = data.get('questions', [])
        set_name = "English-Question-Set"
        set_size = 10

        for i in range(0, len(questions), set_size):
            # question_set, created = QuestionSet.objects.create(language=language, name=f"{set_name}-{i // set_size + 1}")
            question_set = QuestionSet.objects.create(language=language, name=f"{set_name}-{i // set_size + 1}")

            for question_data in questions[i:i + set_size]:
                question = Question.objects.create(
                    questionset=question_set,
                    question=question_data.get('text', ''),
                    rating=question_data.get('rating', 1),
                    increment=question_data.get('increaseAmount', 0),
                    decrement=question_data.get('decreaseAmount', 0),
                )

                for option_text in question_data.get('options', []):
                    QuestionOption.objects.create(question=question, choice=option_text)

                correct_answer = QuestionOption.objects.get(
                    question=question, choice=question_data.get('correctAnswer', '')
                )

                QuestionAnswer.objects.create(question=question, answer=correct_answer)

        print('Questions inserted successfully!')

if __name__ == "__main__":
    insert_data()
