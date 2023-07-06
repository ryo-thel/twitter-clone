from rest_framework_simplejwt.authentication import JWTAuthentication
from rest_framework.exceptions import AuthenticationFailed
from django.conf import settings

# tokenをauthorizationヘッダーからではなくcookieヘッダーから取得
class CookieJWTAuthentication(JWTAuthentication):
    def authenticate(self, request):
        # Cookieヘッダーからaccess_tokenを取得
        access_token = request.COOKIES.get('access_token')
        if not access_token:
            raise AuthenticationFailed('No access token')
        # access_tokenが存在すればauthrizationヘッダーに追加
        else :
            request.META['HTTP_AUTHORIZATION'] = '{header_type} {access_token}'.format(
                header_type=settings.SIMPLE_JWT['AUTH_HEADER_TYPES'][0], access_token=access_token)
        # 親クラスに返す
        return super().authenticate(request)