import json
from django.core.management.base import BaseCommand
from .models import Language, QuestionSet, Question, QuestionOption, QuestionAnswer

class Command(BaseCommand):
    help = 'Insert questions into the database from a JSON file'

    def handle(self, *args, **kwargs):
        with open('questions.json', 'r') as file:
            data = json.load(file)
            language, created = Language.objects.get_or_create(language="English")

            for question_data in data.get('questions', []):
                question_set, created = QuestionSet.objects.get_or_create(language=language)

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

        self.stdout.write(self.style.SUCCESS('Questions inserted successfully!'))
