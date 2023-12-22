from django.urls import path
from . import views

app_name = "api"

urlpatterns = [
    path('languages/', views.GetLanguagesView.as_view(), name='get_languages'),
    path('question-sets/<int:language_id>/', views.GetQuestionSetsView.as_view(), name='get_question_sets'),
    path('questions/<int:question_set_id>/', views.GetQuestionsView.as_view(), name='get_questions'),
    path('submit-answers/', views.SubmitAnswersView.as_view(), name='submit_answers'),
    path('user-grade/<int:language_id>/<int:question_set_id>/', views.GetUserGradeView.as_view(), name='get_user_grade'),
    path('leaderboard/', views.LeaderboardView.as_view(), name='leaderboard'),
]


