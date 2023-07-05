from django.contrib.auth import get_user_model
from rest_framework.generics import ListAPIView
from .serializers import CustomUserSerializer
from rest_framework_simplejwt import views
from rest_framework_simplejwt import exceptions
from rest_framework.response import Response
from rest_framework import status

User = get_user_model()


class UserList(ListAPIView):
    queryset = User.objects.filter(is_active=True)
    serializer_class = CustomUserSerializer

#　JWTをcookieに持たせる
class JWTokenObtainView(views.TokenObtainPairView):
    def post(self, request, *args, **kwargs):
        serializer = self.get_serializer(data=request.data)

        try:
            serializer.is_valid(raise_exception=True)
        except exceptions.TokenError as e:
            raise exceptions.InvalidToken(e.args[0])
        
        response = Response(serializer.validated_data, status=status.HTTP_200_OK)

        try:
            response.delete_cookie("access_token")
        except Exception as e:
            print(e)
        
        # Cookieのheaderにトークンのセット
        response.set_cookie(
            "access_token",
            serializer.validated_data["access"],
            # 期限は1日
            max_age=60 * 60 * 24,
            httponly=True,
        )
        response.set_cookie(
            "refresh_token",
            serializer.validated_data["refresh"],
            # 期限は1週間
            max_age=60 * 60 * 24 * 7,
            httponly=True,

        )

        return response
    
# JWTのリフレッシュ
class JWTokenRefreshView(views.TokenRefreshView):
    def post(self, request, *args, **kwargs):
        serializer = self.get_serializer(data=request.data)

        try:
            serializer.is_valid(raise_exception=True)
        except exceptions.TokenError as e:
            raise exceptions.InvalidToken(e.args[0])
        
        response = Response(serializer.validated_data, status=status.HTTP_200_OK)

        response.delete_cookie("access_token")

        response.set_cookie(
            "access_token",
            serializer.validated_data["access"],
            max_age=60 * 60,
            httponly=True,
        )