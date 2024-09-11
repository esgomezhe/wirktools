from django.urls import path
from . import views

urlpatterns = [
    path('availability/', views.MentorAvailabilityView.as_view(), name='mentor-availability'),
    path('availability/<int:pk>/', views.DeleteAvailabilityView.as_view(), name='delete-availability'),
    path('mentor-sessions/', views.MentorSessionsView.as_view(), name='mentor-sessions'),
    path('update-session-status/<int:pk>/', views.UpdateSessionStatusView.as_view(), name='update-session-status'),
    path('apprentice-sessions/', views.ApprenticeSessionsView.as_view(), name='apprentice-sessions'),
    path('available-mentors/', views.AvailableMentorsView.as_view(), name='available-mentors'),
    path('mentor-availability/', views.MentorAvailabilityDetailView.as_view(), name='mentor-availability-detail'),
    path('book-session/', views.BookSessionView.as_view(), name='book-session'),
    path('update-mentor-about/<int:mentor_id>/', views.UpdateMentorAboutView.as_view(), name='update-mentor-about'),
    path('update-mentor-categories/<int:mentor_id>/', views.UpdateMentorCategoriesView.as_view(), name='update-mentor-categories'),
    path('categories/', views.CategoryListView.as_view(), name='category-list'),
    path('rate_mentor/<int:mentor_id>/', views.UpdateMentorRatingView.as_view(), name='rate_mentor'),
]