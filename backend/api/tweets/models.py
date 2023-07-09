from django.db import models

# Create your models here.


class Tweet(models.Model):
    image = models.ImageField(
        upload_to="images"
    )
    text = models.TextField()

