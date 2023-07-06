from django.contrib.auth import get_user_model
from rest_framework.generics import ListAPIView
from .serializers import CustomUserSerializer
from .authentication import CookieJWTAuthentication
from rest_framework_simplejwt import views
from rest_framework_simplejwt import exceptions
from rest_framework.response import Response
from rest_framework import status, permissions

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

        # Cookieにトークンをセット
        response.set_cookie(
            "access_token",
            serializer.validated_data["access"],
            # 期限は3時間
            max_age=60 * 60 * 3,
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
        # cookieからリフレッシュトークンを取得
        refresh_token = request.COOKIES.get("refresh_token")
        if refresh_token is None:
            return Response({'error': 'No refresh'}, status=status.HTTP_400_BAD_REQUEST)

        # リクエストにリフレッシュトークンを含めなおす
        request.data["refresh"] = refresh_token

        serializer = self.get_serializer(data=request.data)

        try:
            serializer.is_valid(raise_exception=True)
        except exceptions.TokenError as e:
            raise exceptions.InvalidToken(e.args[0])
        
        response = Response(serializer.validated_data, status=status.HTTP_200_OK)

        response.set_cookie(
            "access_token",
            serializer.validated_data["access"],
            max_age=60 * 60 * 3,
            httponly=True,
        )
        response.set_cookie(
            "refresh_token",
            serializer.validated_data["refresh"],
            max_age=60 * 60 * 24 * 7,
            httponly=True,
        )

        return response

class LogoutView(views.TokenBlacklistView):
    authentication_classes = (CookieJWTAuthentication,)
    permission_classes = (permissions.IsAuthenticated,)
    def post(self, request, *args, **kwargs):
        refresh_token = request.COOKIES.get("refresh_token")
        if refresh_token is None:
            return Response({'error': 'No refresh'}, status=status.HTTP_400_BAD_REQUEST)

        # リクエストにリフレッシュトークンを含めなおす
        request.data["refresh"] = refresh_token

        response = super().post(request, *args, **kwargs)

        # トークンをCookieから削除
        response.delete_cookie("access_token")
        response.delete_cookie("refresh_token")

        # 既に存在するresponseにdataを追加
        response.data = {"Message": "Logout"}

        return response


