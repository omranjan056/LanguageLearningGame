from rest_framework import serializers
from .models import Language, QuestionSet, Question, QuestionOption, QuestionAnswer, Leaderboard

class LanguageSerializer(serializers.ModelSerializer):
    class Meta:
        model = Language
        fields = '__all__'


class QuestionSetSerializer(serializers.ModelSerializer):
    class Meta:
        model = QuestionSet
        fields = '__all__'


# class QuestionSerializer(serializers.ModelSerializer):
#     class Meta:
#         model = Question
#         fields = '__all__'


class QuestionOptionSerializer(serializers.ModelSerializer):
    class Meta:
        model = QuestionOption
        fields = '__all__'


class QuestionAnswerSerializer(serializers.ModelSerializer):
    class Meta:
        model = QuestionAnswer
        fields = '__all__'


class LeaderboardSerializer(serializers.ModelSerializer):
    class Meta:
        model = Leaderboard
        fields = '__all__'



class QuestionSerializer(serializers.ModelSerializer):
    options = serializers.SerializerMethodField()

    class Meta:
        model = Question
        fields = ['id', 'question', 'rating', 'increment', 'decrement', 'options']

    def get_options(self, obj):
        return [{'id': option.id, 'value': option.choice} for option in obj.questionoption_set.all()]


# class QuestionSerializer(serializers.ModelSerializer):
#     options = serializers.SerializerMethodField()

#     class Meta:
#         model = Question
#         fields = ['id', 'question', 'rating', 'increment', 'decrement', 'options']

#     def get_options(self, obj):
#         return [option.choice for option in obj.questionoption_set.all()]

