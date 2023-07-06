from rest_framework_simplejwt.authentication import JWTAuthentication
from rest_framework.response import Response
from django.conf import settings

# tokenをauthorizationヘッダーからではなくcookieヘッダーから取得
class CookieJWTAuthentication(JWTAuthentication):
    def authenticate(self, request):
        # Cookieヘッダーからaccess_tokenを取得
        access_token = request.COOKIES.get('access_token')
        if not access_token:
            Response({"message": 'no Token'})
        else:
            Response(access_token)
        # access_tokenが存在すればauthrizationヘッダーに追加
        if access_token:
            request.META['HTTP_AUTHORIZATION'] = '{header_type} {access_token}'.format(
                header_type=settings.SIMPLE_JWT['AUTH_HEADER_TYPES'][0], access_token=access_token)
        # 親クラスに返す
        return super().authenticate(request)