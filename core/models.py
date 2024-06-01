from django.contrib.auth.models import AbstractUser
from django.db import models

class User(AbstractUser):
    ROLE_CHOICES = [('admin', 'admin'), ('tourist', 'tourist')]
    role = models.CharField(max_length=20, choices=ROLE_CHOICES, default='tourist')
    email = models.CharField(max_length=255, unique=True)
    password = models.CharField(max_length=255)

    phone = models.CharField(max_length=50, blank=True, null=True)
    current_address = models.TextField(blank=True, null=True)
    permanent_address = models.TextField(blank=True, null=True)
    occupation = models.CharField(max_length=100, blank=True, null=True)
    designation = models.CharField(max_length=100, blank=True, null=True)
    facebook = models.TextField(blank=True, null=True)
    instagram = models.TextField(blank=True, null=True)
    linkedin = models.TextField(blank=True, null=True)
    vk = models.TextField(blank=True, null=True)

    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)

    username = None
    REQUIRED_FIELDS = []
    USERNAME_FIELD = 'email'


class Place(models.Model):
    image = models.ImageField(upload_to="images/", blank=True, null=True)
    name = models.CharField(max_length=255)
    title = models.CharField(max_length=255)
    address = models.CharField(max_length=255)
    city = models.CharField(max_length=255)
    description = models.TextField(max_length=50000)
    tags = models.TextField(blank=True, null=True)
    lat = models.DecimalField(max_digits=10, decimal_places=4)
    lon = models.DecimalField(max_digits=10, decimal_places=4)
    map_link = models.TextField(blank=True, null=True)
    temperature = models.IntegerField(blank=True)
    is_featured = models.BooleanField(default=False)
    approved = models.BooleanField(default=True)
    created_by_user=models.ForeignKey(User, on_delete=models.CASCADE)
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)

class Comment(models.Model):
    content = models.TextField()
    place = models.ForeignKey(Place, on_delete=models.CASCADE)
    created_by_user = models.ForeignKey(User, on_delete=models.CASCADE)
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)

class Review(models.Model):
    rating = models.IntegerField(default=0, verbose_name='Rating (out of 5)')
    review_text = models.TextField(blank=True, null=True)
    place = models.ForeignKey(Place, on_delete=models.CASCADE)
    reviewer = models.ForeignKey(User, on_delete=models.CASCADE)
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)

