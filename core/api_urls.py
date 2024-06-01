from django.urls import path
from . import views

urlpatterns = [
    path('register/', views.RegisterView.as_view()),
    path('login/', views.LoginView.as_view()),

    path('profile/', views.UpdateUserView.as_view()),
    path('profile/', views.UpdateUserView.as_view()),
    
    path('places/add/', views.AddPlaceView.as_view()),
    path('places/', views.ListPlacesApiView.as_view()),
    path('places/featured/', views.ListFeaturedPlacesApiView.as_view()),
    
    path('places/<int:placeId>/', views.PlaceView.as_view()),
    path('places/<int:placeId>/', views.PlaceView.as_view()),
    
    path('places/<int:placeId>/reviews/add/', views.AddReviewRatingView.as_view()),
    path('places/<int:placeId>/reviews/', views.ListReviewRatingApiView.as_view()),

]
