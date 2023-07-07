from rest_framework_simplejwt.authentication import JWTAuthentication
from rest_framework.exceptions import AuthenticationFailed
from django.conf import settings

# tokenをauthorizationヘッダーからではなくcookieヘッダーから取得
class CookieJWTAuthentication(JWTAuthentication):
    def authenticate(self, request):
        # Cookieヘッダーからaccess_tokenを取得
        access_token = request.COOKIES.get('access_token')
        # access_tokenが存在すればauthrizationヘッダーに追加
        if access_token:
            request.META['HTTP_AUTHORIZATION'] = '{header_type} {access_token}'.format(
                header_type=settings.SIMPLE_JWT['AUTH_HEADER_TYPES'][0], access_token=access_token)
            return super().authenticate(request)
        # access_tokenが存在しない場合はエラーを送出せず、Noneを返す
        else:
            return None