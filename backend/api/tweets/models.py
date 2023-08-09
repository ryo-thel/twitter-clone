import uuid

from django.conf import settings
from django.db import models


class Tweet(models.Model):
    id = models.UUIDField(verbose_name="ID", primary_key=True, default=uuid.uuid4, editable=False,)
    text = models.TextField(verbose_name="テキスト")
    user = models.ForeignKey(
        settings.AUTH_USER_MODEL,
        verbose_name="ユーザー",
        on_delete=models.CASCADE,
        related_name="tweets"
    )
    created_at = models.DateTimeField(verbose_name="作成日時", auto_now_add=True)
