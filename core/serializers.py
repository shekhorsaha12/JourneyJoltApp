from typing import Any
from rest_framework import serializers
from rest_framework.pagination import PageNumberPagination
from . models import *
from urllib.parse import urljoin, quote
from django.conf import settings
from math import ceil
from django import forms
from django.contrib.auth.forms import UserChangeForm
from . weather_map_helper import WeatherMapHelper


class RegisterSerializer(serializers.ModelSerializer):
    password = serializers.CharField(write_only=True)
    first_name = serializers.CharField()
    last_name = serializers.CharField()
    class Meta:
        model = User
        fields = ['email', 'password', 'first_name', 'last_name']

    def create(self, validated_data):
        user = User.objects.create(
            email=validated_data['email'],
            first_name=validated_data['first_name'],
            last_name=validated_data['last_name'],
            role='tourist',
        )
        user.set_password(validated_data['password'])
        user.save()
        return user

class LoginSerializer(serializers.Serializer):
    email = serializers.EmailField()
    password = serializers.CharField(max_length=255)


class UserSerializer(serializers.ModelSerializer):
    class Meta:
        model = User
        fields = ['id', 'email', 'first_name', 'last_name', 'role', 'phone', 'current_address', 'permanent_address', 'occupation', 'designation', 'facebook', 'instagram', 'linkedin', 'vk']


class UpdateUserForm(UserChangeForm):
    
    class Meta:
        model = User
        fields = ['email', 'first_name', 'last_name', 'phone', 'current_address', 'permanent_address', 'occupation', 'designation', 'facebook', 'instagram', 'linkedin', 'vk']
    
    def __init__(self, *args: Any, **kwargs: Any) -> None:
        super().__init__(*args, **kwargs)


class AddReviewForm(forms.ModelForm):
    class Meta:
        model = Review
        fields = [
            'rating',
            'review_text'
        ]
    
    def save(self, user, place, commit=True):
        instance = super().save(commit=False)
        instance.reviewer = user
        instance.place = place
        if commit:
            instance.save()
        return instance


class ReviewSerializer(serializers.ModelSerializer):
    reviewer = UserSerializer(many=False, read_only=True)

    class Meta:
        model = Review
        fields = [
            'id',
            'rating',
            'review_text',
            'reviewer',
            'created_at'
        ]


class AddPlaceForm(forms.ModelForm):
    class Meta:
        model = Place
        fields = [
            'name',
            'title',
            'description',
            'tags',
            'address',
            'city',
            'image'
        ]
    def save(self, user, commit=True):
        instance = super().save(commit=False)
        instance.created_by_user = user
        lat, lon = WeatherMapHelper.getGeocoding(instance.city)
        instance.temperature = WeatherMapHelper.getTemperature(lat, lon)
        instance.lat = lat
        instance.lon = lon
        if commit:
            instance.save()
        return instance


class EditPlaceForm(forms.ModelForm):
    image = forms.ImageField(required=False)
    class Meta:
        model = Place
        fields = [
            'name',
            'title',
            'description',
            'tags',
            'address',
            'city',
            'image'
        ]

    def save(self, commit=True):
        place = super().save(commit=False)
        lat, lon = WeatherMapHelper.getGeocoding(place.city)
        place.temperature = WeatherMapHelper.getTemperature(lat, lon)
        place.lat = lat
        place.lon = lon
        if commit:
            place.save()
        return place


class PlaceSerializer(serializers.ModelSerializer):
    created_by_user = UserSerializer(many=False, read_only=True)
    class Meta:
        model = Place
        fields = [
            'id',
            'image',
            'name',
            'title',
            'description',
            'address',
            'city',
            'tags',
            'lat',
            'lon',
            'temperature',
            'is_featured',
            'approved',
            'created_by_user',
            'created_at',
            'updated_at',
        ]


