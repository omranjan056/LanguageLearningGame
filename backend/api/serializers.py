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

class GradeSerializer(serializers.ModelSerializer):
    # You can include the language_id and questionset_id fields explicitly
    language_id = serializers.ReadOnlyField(source='language.id')
    questionset_id = serializers.ReadOnlyField(source='questionset.id')
    username = serializers.ReadOnlyField(source='user.username')

    class Meta:
        model = Leaderboard
        fields = ['id', 'user', 'username', 'language_id', 'questionset_id', 'marks', 'total_marks', 'last_graded_time']

# class QuestionSerializer(serializers.ModelSerializer):
#     options = serializers.SerializerMethodField()

#     class Meta:
#         model = Question
#         fields = ['id', 'question', 'rating', 'increment', 'decrement', 'options']

#     def get_options(self, obj):
#         return [option.choice for option in obj.questionoption_set.all()]

