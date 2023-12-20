from rest_framework_simplejwt.authentication import JWTAuthentication
from rest_framework_simplejwt.tokens import UntypedToken, RefreshToken
from rest_framework_simplejwt.exceptions import InvalidToken
from rest_framework.exceptions import AuthenticationFailed
from django.conf import settings


# tokenをauthorizationヘッダーからではなくcookieヘッダーから取得
class CookieJWTAuthentication(JWTAuthentication):

    def authenticate(self, request):
        # Cookieヘッダーからaccess_tokenを取得
        access_token = request.COOKIES.get('access_token')
        # access_tokenが存在すればauthrizationヘッダーに追加
        if access_token:
            try:
                UntypedToken(access_token)
            except InvalidToken:
                return self.handle_refresh_token(request)

            request.META['HTTP_AUTHORIZATION'] = '{header_type} {access_token}'.format(
                header_type=settings.SIMPLE_JWT['AUTH_HEADER_TYPES'][0],
                access_token=access_token
            )
            return super().authenticate(request)
        # access_tokenが存在しない場合はエラーを送出せず、Noneを返す
        else:
            return None

    def handle_refresh_token(self, request):
        refresh_token = request.COOKIES.get('refresh_token')
        if refresh_token:
            try:
                valid_token = RefreshToken(refresh_token)
                new_access_token = str(valid_token.access_token)
                request.new_access_token = new_access_token
                request.META['HTTP_AUTHORIZATION'] = '{header_type} {access_token}'.format(
                    header_type=settings.SIMPLE_JWT['AUTH_HEADER_TYPES'][0],
                    access_token=new_access_token
                )
                return super().authenticate(request)
            except InvalidToken:
                raise AuthenticationFailed('Invalid refresh token', 401)
        else:
            return None


