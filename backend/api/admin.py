from django.contrib import admin
from .models import Language, QuestionSet, Question, QuestionOption, QuestionAnswer, Leaderboard
# Register your models here.

admin.site.register(Language)
admin.site.register(QuestionSet)
admin.site.register(Question)
admin.site.register(QuestionOption)
admin.site.register(QuestionAnswer)
admin.site.register(Leaderboard)
