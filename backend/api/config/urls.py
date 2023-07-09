from django.contrib import admin
from django.urls import path, include
from . import settings
from drf_spectacular.views import SpectacularAPIView, SpectacularRedocView, SpectacularSwaggerView  # 追加

urlpatterns = [
    path('admin/', admin.site.urls),
    path('api/v1/auth/', include('djoser.urls')),
    path('api/v1/', include('accounts.urls')),
    path('api/v1/tweets/', include('tweets.urls'))
]

if settings.DEBUG:
    urlpatterns += [
        path('api/schema/', SpectacularAPIView.as_view(), name='schema'),                                      # 追加
        path('api/schema/swagger-ui/', SpectacularSwaggerView.as_view(url_name='schema'), name='swagger-ui'),  # 追加
        path('api/schema/redoc/', SpectacularRedocView.as_view(url_name='schema'), name='redoc'),              # 追加
    ]
