from django.http import Http404
from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework import status, generics, viewsets
from rest_framework.authtoken.models import Token
from rest_framework.authtoken.views import ObtainAuthToken
from rest_framework.permissions import IsAuthenticated
from rest_framework.decorators import permission_classes, api_view
from rest_framework.parsers import MultiPartParser, FormParser
from rest_framework.pagination import PageNumberPagination
from django.db.models import Q
from . models import *
from . serializers import *
from math import ceil
from django.db.models import Count
from django.contrib.auth import authenticate
import json
from rest_framework_simplejwt.tokens import RefreshToken
from rest_framework_simplejwt.authentication import JWTAuthentication
from . weather_map_helper import WeatherMapHelper


class RegisterView(APIView):
    def post(self, request):
        serializer = RegisterSerializer(data=request.data)
        if serializer.is_valid(raise_exception=True):
            user = serializer.save()
            userSerializer = UserSerializer(user)
            return Response({'message': 'User registered successfully', 'data': userSerializer.data}, status=status.HTTP_201_CREATED)
        return Response({ 'message': 'Something went wrong', 'error': serializer.errors}, status=status.HTTP_400_BAD_REQUEST)


class LoginView(ObtainAuthToken):
    def post(self, request):
        serializer = LoginSerializer(data=request.data)
        if serializer.is_valid(raise_exception=True):
            email = serializer.validated_data['email']
            password = serializer.validated_data['password']
            user = authenticate(email=email, password=password)
            if user is None:
                return Response({'message': 'email or password is incorrect'})
            refresh = RefreshToken.for_user(user)
            userSerializer = UserSerializer(user)
            return Response({
                'message': 'Login successful',
                'data': {
                    'access_token': str(refresh.access_token),
                    'refresh_token': str(refresh),
                    'user': userSerializer.data
                }
            })
        return Response({'error': 'Something went wrong!'})



class UpdateUserView(APIView):
    permission_classes=[IsAuthenticated]
    authentication_classes=[JWTAuthentication]

    def get(self, request):
        current_user = User.objects.get(id=request.user.id)
        userSerializer = UserSerializer(current_user)
        return Response({'message': 'Profile information', 'data': userSerializer.data})

    def put(self, request):
        current_user = User.objects.get(id=request.user.id)
        user_form = UpdateUserForm(request.POST or None, instance=current_user)
        if user_form.is_valid():
            user_form.save()
            current_user = User.objects.get(id=request.user.id)
            userSerializer = UserSerializer(current_user)
            return Response({'message': 'Profile information updated', 'data': userSerializer.data})
        return Response({'message': 'Something went wrong'}, status=status.HTTP_400_BAD_REQUEST)


class AddPlaceView(APIView):
    permission_classes=[IsAuthenticated]
    authentication_classes=[JWTAuthentication]

    def post(self, request):
        current_user=request.user
        addPlaceForm = AddPlaceForm(data=request.data, files=request.FILES)
        if addPlaceForm.is_valid():
            place = addPlaceForm.save(user=current_user)
            serializedPlace = PlaceSerializer(place)
            return Response({'message': 'Place added', 'data': serializedPlace.data})
        return Response({'message': 'Something went wrong'}, status=status.HTTP_400_BAD_REQUEST)


class PlaceView(APIView):
    permission_classes=[IsAuthenticated]
    authentication_classes=[JWTAuthentication]

    def get(self, request, placeId):
        place = Place.objects.get(id=placeId)
        placeSerializer = PlaceSerializer(place)
        return Response({'message': 'Place Information', 'data': placeSerializer.data})
    
    def put(self, request, placeId):
        current_user = request.user
        place = Place.objects.get(id=placeId)
        if place.created_by_user.id != current_user.id:
            return Response({'message': 'You are not allowed to edit this place'}, status=status.HTTP_403_FORBIDDEN)
        editPlaceForm = EditPlaceForm(data=request.data, files=request.FILES, instance=place)
        if editPlaceForm.is_valid():
            place = editPlaceForm.save()
            placeSerializer = PlaceSerializer(place)
            return Response({'message': 'Updated place information', 'data': placeSerializer.data})
        else:
            return Response({'message': 'Something went wrong'}, status=status.HTTP_400_BAD_REQUEST)


class ListPlacesApiView(generics.ListAPIView):
    serializer_class = PlaceSerializer
    pagination_class = MyModelPagination

    def get_queryset(self):
        queryset = Place.objects.filter(approved=True, is_featured=False).all()
        searchQuery = self.request.query_params.get('q', None)
        if searchQuery is not None:
            queryset = queryset.filter(Q(name__icontains=searchQuery) | Q(title__icontains=searchQuery) | Q(description__icontains=searchQuery) | Q(city__icontains=searchQuery) )
        return queryset
    
    def list(self, request, *args, **kwargs):
        queryset = self.get_queryset()
        page = self.paginate_queryset(queryset)
        if page is not None:
            serializer = self.get_serializer(page, many=True)
            return self.get_paginated_response(serializer.data)

        serializer = self.get_serializer(queryset, many=True)
        return Response({
            'total': queryset.count(),
            'results': serializer.data
        })


class ListFeaturedPlacesApiView(generics.ListAPIView):
    queryset = Place.objects.filter(approved=True, is_featured=True).all()
    serializer_class = PlaceSerializer


class AddReviewRatingView(APIView):
    permission_classes=[IsAuthenticated]
    authentication_classes=[JWTAuthentication]
    
    def post(self, request, placeId):
        current_user = request.user
        place = Place.objects.get(id=placeId)
        add_review_form = AddReviewForm(data=request.data)
        if add_review_form.is_valid():
            review = add_review_form.save( user=current_user, place=place )
            review_serializer = ReviewSerializer(review)
            return Response({'message': 'Review posted successfully', 'data': review_serializer.data})
        else:
            return Response({'message': 'Something went wrong'}, status=status.HTTP_400_BAD_REQUEST)


class ListReviewRatingApiView(generics.ListAPIView):
    serializer_class = ReviewSerializer
    lookup_field = 'placeId'
    lookup_url_kwarg = 'placeId'

    def get_queryset(self):
        print(self.kwargs, self.kwargs['placeId'])
        queryset = Review.objects.filter(place__id=self.kwargs['placeId']).all()
        return queryset

