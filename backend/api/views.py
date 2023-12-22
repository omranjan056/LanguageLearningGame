from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework import status
from rest_framework.permissions import IsAuthenticated
from django.shortcuts import get_object_or_404
from .models import Language, QuestionSet, Question, QuestionAnswer, Leaderboard, QuestionOption
from .serializers import LanguageSerializer, QuestionSetSerializer, QuestionSerializer, LeaderboardSerializer
from django.db.models import F
from rest_framework_simplejwt.authentication import JWTAuthentication
from django.core.exceptions import ObjectDoesNotExist
from django.db import transaction



class GetLanguagesView(APIView):
    def get(self, request):
        try:
            languages = Language.objects.all()
            data = [{'id': lang.id, 'language': lang.language} for lang in languages]
            return Response(data, status=status.HTTP_200_OK)
        except Exception as e:
            return Response({'error': 'Language not found'}, status=status.HTTP_404_NOT_FOUND)
            # return Response({'error': str(e)}, status=status.HTTP_500_INTERNAL_SERVER_ERROR)


class GetQuestionSetsView(APIView):
    permission_classes = [IsAuthenticated]
    # authentication_classes = [JWTAuthentication]
    def get(self, request, language_id):
        try:
            language = Language.objects.get(id=language_id)
            question_sets = QuestionSet.objects.filter(language=language)
            data = [{'id': set.id, 'name': set.name} for set in question_sets]
            return Response(data, status=status.HTTP_200_OK)
        except Language.DoesNotExist:
            return Response({'error': 'Language not found'}, status=status.HTTP_404_NOT_FOUND)
        except Exception as e:
            return Response({'error': str(e)}, status=status.HTTP_500_INTERNAL_SERVER_ERROR)


# class GetQuestionsView(APIView):
#     permission_classes = [IsAuthenticated]
#     def get(self, request, question_set_id):
#         try:
#             question_set = QuestionSet.objects.get(id=question_set_id)
#             questions = Question.objects.filter(questionset=question_set)
#             data = [{'id': q.id, 'question': q.question, 'options': [o.choice for o in QuestionOption.objects.filter(question=q)]} for q in questions]
#             return Response(data, status=status.HTTP_200_OK)
#         except QuestionSet.DoesNotExist:
#             return Response({'error': 'Question Set not found'}, status=status.HTTP_404_NOT_FOUND)
#         except Exception as e:
#             return Response({'error': str(e)}, status=status.HTTP_500_INTERNAL_SERVER_ERROR)

class GetQuestionsView(APIView):
    permission_classes = [IsAuthenticated]

    def get(self, request, question_set_id):
        try:
            question_set = QuestionSet.objects.get(id=question_set_id)
            questions = Question.objects.filter(questionset=question_set)
            serializer = QuestionSerializer(questions, many=True)
            return Response(serializer.data, status=status.HTTP_200_OK)
        except QuestionSet.DoesNotExist:
            return Response({'error': 'Question Set not found'}, status=status.HTTP_404_NOT_FOUND)
        except Exception as e:
            return Response({'error': str(e)}, status=status.HTTP_500_INTERNAL_SERVER_ERROR)




class GetUserGradeView(APIView):
    permission_classes = [IsAuthenticated]

    def get(self, request, language_id, question_set_id):
        try:
            user = request.user
            language = get_object_or_404(Language, id=language_id)
            question_set = get_object_or_404(QuestionSet, id=question_set_id)

            leaderboard_entry = Leaderboard.objects.filter(user=user, language=language, questionset=question_set).first()

            if leaderboard_entry:
                serializer = LeaderboardSerializer(leaderboard_entry)
                return Response(serializer.data, status=status.HTTP_200_OK)
            else:
                return Response({'message': 'No grade found for the user in the specified language and question set.'}, status=status.HTTP_404_NOT_FOUND)
        except Exception as e:
            return Response({'error': str(e)}, status=status.HTTP_500_INTERNAL_SERVER_ERROR)


class LeaderboardView(APIView):
    def get(self, request):
        try:
            leaderboard_entries = Leaderboard.objects.annotate(submission_time=F('last_graded_time')).order_by('-marks', 'submission_time')

            data = []
            for entry in leaderboard_entries:
                # Serialize the leaderboard entry including the user's username
                serializer = LeaderboardSerializer(entry)
                user_data = {'username': entry.user.username, **serializer.data}
                data.append(user_data)

            return Response(data, status=status.HTTP_200_OK)
        except Exception as e:
            return Response({'error': str(e)}, status=status.HTTP_500_INTERNAL_SERVER_ERROR)      


# class SubmitAnswersView(APIView):
#     permission_classes = [IsAuthenticated]

#     def post(self, request):
#         try:
#             user = request.user
#             language_id = int(request.data.get('language_id'))
#             question_set_id = int(request.data.get('question_set_id'))
#             answers = request.data.get('answers', [])

#             # Get language and question set objects
#             # language = get_object_or_404(Language, id=language_id)
#             # question_set = get_object_or_404(QuestionSet, id=question_set_id)
#             language = Language.objects.filter(id=language_id)
#             question_set = QuestionSet.objects.filter(id=question_set_id)

#             # Use a transaction to ensure atomicity
#             with transaction.atomic():
#                 curr_marks = 0
#                 for answer_data in answers:
#                     question_id = answer_data.get('question_id')
#                     option_id = answer_data.get('option_id')

#                     try:
#                         # Retrieve question and correct option
#                         question = Question.objects.filter(id=question_id).values()
#                         correct_option = QuestionAnswer.objects.filter(id=question_id).values()

#                         if option_id == correct_option.id:
#                             curr_marks += question.increment
#                         else:
#                             curr_marks -= question.decrement
#                     except ObjectDoesNotExist:
#                         # Handle the case where the question or answer does not exist
#                         return Response({'error': 'Invalid question or answer.'}, status=status.HTTP_400_BAD_REQUEST)

#                 # leaderboard_entry, created = Leaderboard.objects.get_or_create(
#                 #     user=user,
#                 #     language=language,
#                 #     questionset=question_set,
#                 #     defaults={'marks': curr_marks},
#                 # )

#                 # # Update the leaderboard entry if it's not a new entry and the percentage is higher
#                 # if not created and curr_marks > leaderboard_entry.marks:
#                 #     leaderboard_entry.marks = curr_marks
#                 #     leaderboard_entry.save()

#             return Response({}, status=status.HTTP_200_OK)

#         except Exception as e:
#             return Response({'error': str(e)}, status=status.HTTP_500_INTERNAL_SERVER_ERROR)


class SubmitAnswersView(APIView):
    permission_classes = [IsAuthenticated]

    def post(self, request):
        try:
            user = request.user
            # print(user)
            language_id = int(request.data.get('language_id'))
            # print(language_id)
            question_set_id = int(request.data.get('question_set_id'))
            # print(question_set_id)
            answers = request.data.get('answers', [])
            # print(answers)

            # Get language and question set objects
            language = get_object_or_404(Language, id=language_id)
            # print(language)
            question_set = get_object_or_404(QuestionSet, id=question_set_id)
            # print(question_set)

            # Use a transaction to ensure atomicity
            curr_marks = 0
            for answer_data in answers:
                question_id = answer_data.get('question_id')
                option_id = answer_data.get('option_id')

                # Retrieve question and correct option
                question = Question.objects.filter(id=question_id).values()
                curr_ans = QuestionAnswer.objects.filter(id=question_id).values()
                # print(question)
                # print(curr_ans)
                # question_option_id = curr_ans['id']
                # print(question_option_id)

                
                # if int(option_id) == int(curr_ans.get(id)):
                #     curr_marks += int(question.increment)
                # else:
                #     curr_marks -= int(question.decrement)
                # print(curr_ans)
                

            # leaderboard_entry, created = Leaderboard.objects.get_or_create(
            #     user=user,
            #     language=language,
            #     questionset=question_set,
            #     defaults={'marks': curr_marks},
            # )

            # # Update the leaderboard entry if it's not a new entry and the percentage is higher
            # if not created and curr_marks > leaderboard_entry.marks:
            #     leaderboard_entry.marks = curr_marks
            #     leaderboard_entry.save()

            return Response({'message': 'Answers submitted successfully!'}, status=status.HTTP_200_OK)

        except Exception as e:
            return Response({'error': str(e)}, status=status.HTTP_500_INTERNAL_SERVER_ERROR)


# class SubmitAnswersView(APIView):
#     permission_classes = [IsAuthenticated]

#     def post(self, request):
#         try:
#             user = request.user
#             language_id = request.data.get('language_id')
#             question_set_id = request.data.get('question_set_id')
#             answers = request.data.get('answers', [])
#             print(answers)

#             # Get language and question set objects
#             language = get_object_or_404(Language, id=language_id)
#             question_set = get_object_or_404(QuestionSet, id=question_set_id)

#             # total_questions = Question.objects.filter(questionset=question_set).count()
#             curr_marks = 0

#             for answer_data in answers:
#                 question_id = answer_data.get('question_id')
#                 option_id = answer_data.get('option_id')

#                 # Retrieve question and correct option
#                 question = get_object_or_404(Question, id=question_id)
#                 correct_option = QuestionAnswer.objects.get(question=question)

#                 # Check if the selected option matches the correct option
#                 print(correct_option.id, " ", question_id)
#                 if option_id == correct_option.id:
#                     curr_marks += question.increment
#                     print("currect")
#                 else:
#                     curr_marks -= question.decrement
#                     print("wrong")

#             # Calculate the percentage of correct answers
#             # total_marks = 50
#             # Update or create leaderboard entry
#             leaderboard_entry, created = Leaderboard.objects.get_or_create(
#                 user=user,
#                 language=language,
#                 questionset=question_set,
#                 marks=curr_marks,
#             )

#             # Update the leaderboard entry if it's a new entry or the percentage is higher
#             if created or curr_marks > leaderboard_entry.marks:
#                 leaderboard_entry.marks = curr_marks
#                 leaderboard_entry.save()

#             return Response({'message': 'Answers submitted successfully!'}, status=status.HTTP_200_OK)
#         except Exception as e:
#             return Response({'error': str(e)}, status=status.HTTP_500_INTERNAL_SERVER_ERROR)

# class LeaderboardView(APIView):
#     def get(self, request, language_id, question_set_id):
#         try:
#             language = Language.objects.get(id=language_id)
#             question_set = QuestionSet.objects.get(id=question_set_id)

#             leaderboard_entries = Leaderboard.objects.filter(
#                 language=language,
#                 questionset=question_set
#             ).order_by('-marks', 'last_graded_time')

#             data = []
#             for entry in leaderboard_entries:
#                 # Serialize the leaderboard entry including the user's username
#                 serializer = LeaderboardSerializer(entry)
#                 user_data = {'username': entry.user.username, **serializer.data}
#                 data.append(user_data)

#             return Response(data, status=status.HTTP_200_OK)
#         except (Language.DoesNotExist, QuestionSet.DoesNotExist):
#             return Response({'error': 'Language or Question Set not found'}, status=status.HTTP_404_NOT_FOUND)
#         except Exception as e:
#             return Response({'error': str(e)}, status=status.HTTP_500_INTERNAL_SERVER_ERROR)
        

# class GetLanguagesView(APIView):
#     def get(self, request):
#         languages = Language.objects.all()
#         serializer = LanguageSerializer(languages, many=True)
#         return Response(serializer.data)

# class GetQuestionSetsView(APIView):
#     permission_classes = [IsAuthenticated]

#     def get(self, request, language_id):
#         language = get_object_or_404(Language, id=language_id)
#         question_sets = QuestionSet.objects.filter(language=language)
#         serializer = QuestionSetSerializer(question_sets, many=True)
#         return Response(serializer.data)

# class GetQuestionsView(APIView):
#     permission_classes = [IsAuthenticated]

#     def get(self, request, question_set_id):
#         question_set = get_object_or_404(QuestionSet, id=question_set_id)
#         questions = question_set.questions.all()
#         serializer = QuestionSerializer(questions, many=True)
#         return Response(serializer.data)




# class SubmitAnswersView(APIView):
#     permission_classes = [IsAuthenticated]

#     def post(self, request):
#         try:
#             user = request.user
#             language_id = request.data.get('language_id')
#             question_set_id = request.data.get('question_set_id')
#             answers = request.data.get('answers', [])

#             language = get_object_or_404(Language, id=language_id)
#             question_set = get_object_or_404(QuestionSet, id=question_set_id)

#             total_questions = Question.objects.filter(questionset=question_set).count()
#             correct_answers = 0

#             for answer_data in answers:
#                 question_id = answer_data.get('question_id')
#                 option_id = answer_data.get('option_id')

#                 question = get_object_or_404(Question, id=question_id)
#                 correct_option = QuestionAnswer.objects.get(question=question).answer

#                 if option_id == correct_option.id:
#                     correct_answers += 1

#             percentage_correct = (correct_answers / total_questions) * 100

#             # Update or create leaderboard entry
#             leaderboard_entry, created = Leaderboard.objects.get_or_create(
#                 user=user,
#                 language=language,
#                 questionset=question_set,
#             )

#             if created or percentage_correct > leaderboard_entry.marks:
#                 leaderboard_entry.marks = percentage_correct
#                 leaderboard_entry.save()

#             return Response({'message': 'Answers submitted successfully!'}, status=status.HTTP_200_OK)
#         except Exception as e:
#             return Response({'error': str(e)}, status=status.HTTP_500_INTERNAL_SERVER_ERROR)