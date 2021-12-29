from django.urls import path, include
from . import views

app_name = "web"

urlpatterns = [
    path('', views.index, name='index'),
    path('about/', views.about, name='about'),
    path('teams/', views.teams, name='teams'),
    path('community/', views.community, name='community'),
    path('business/<slug:slug>/', views.business_detail, name='business_detail'),
    path('upcoming/', views.upcoming, name='upcoming'),
    path('career/<slug:business_slug>/', views.career_list, name='career_list'),  
    path('career/apply_post/<str:pk>/', views.apply_post, name='apply_post'),
    path('contact/', views.contact, name='contact'),
]
