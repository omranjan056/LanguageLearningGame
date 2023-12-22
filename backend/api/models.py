from django.db import models
from django.contrib.auth.models import User

class Language(models.Model):
    language = models.CharField(max_length=50, null=False, default="")

    def __str__(self):
        return self.language

class QuestionSet(models.Model):
    language = models.ForeignKey(Language, on_delete=models.CASCADE)
    name = models.CharField(max_length=50, default="", null=False)

    def __str__(self):
        return f"{self.language} - QuestionSet {self.name}"

class Question(models.Model):
    questionset = models.ForeignKey(QuestionSet, on_delete=models.CASCADE, related_name='questions')
    question = models.CharField(max_length=255, null=False, default="")
    RATING_CHOICES = [(1, 'Easy'), (2, 'Medium'), (3, 'Hard')]
    rating = models.IntegerField(choices=RATING_CHOICES, default=1)
    increment = models.IntegerField(default=0, null=False)
    decrement = models.IntegerField(default=0, null=False)

    def __str__(self):
        return self.question

class QuestionOption(models.Model):
    question = models.ForeignKey(Question, on_delete=models.CASCADE)
    choice = models.CharField(max_length=50, null=False, default="")

    def __str__(self):
        return self.choice

class QuestionAnswer(models.Model):
    question = models.ForeignKey(Question, on_delete=models.CASCADE)
    answer = models.ForeignKey(QuestionOption, on_delete=models.CASCADE)

    def __str__(self):
        return f"{self.question} - {self.answer}"

class Leaderboard(models.Model):
    user = models.ForeignKey(User, on_delete=models.CASCADE, related_name='leaderboard_entries')
    language = models.ForeignKey(Language, on_delete=models.CASCADE)
    questionset = models.ForeignKey(QuestionSet, on_delete=models.CASCADE)
    marks = models.FloatField(default=0, null=False)
    total_marks = models.IntegerField(default=50, null=False)
    last_graded_time = models.DateTimeField(auto_now=True)

    def __str__(self):
        return f"{self.user.username} - {self.language} - {self.questionset} - Marks: {self.marks}"
