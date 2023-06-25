from django.contrib.auth import get_user_model
from django.contrib.auth.tokens import default_token_generator
from rest_framework import status
from rest_framework.generics import ListAPIView
from rest_framework.response import Response
from .serializers import CustomUserSerializer
from djoser import utils
from djoser.compat import get_user_email
from djoser.conf import settings

User = get_user_model()


class UserList(ListAPIView):
    queryset = User.objects.filter(is_active=True)
    serializer_class = CustomUserSerializer

def Activate(request, uid, token):
    id = utils.decode_uid(uid)
    request_user = User.objects.get(pk=id)

    is_token_valid = default_token_generator.check_token(request_user, token)
    
    if is_token_valid:
        request_user.is_active = True
        request_user.save()

        if settings.SEND_CONFIRMATION_EMAIL:
            context = {"user": request_user}
            to = [get_user_email(request_user)]
            settings.EMAIL.confirmation(request, context).send(to)

        return Response(status=status.HTTP_204_NO_CONTENT)
