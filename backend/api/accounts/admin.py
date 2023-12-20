from django.contrib import admin
from django.contrib.auth.admin import UserAdmin
from django.contrib.auth import get_user_model
from .models import UserProfile

User = get_user_model()


class UserAdminCustom(UserAdmin):
    # ユーザー詳細
    fieldsets = (
        (None, {
            'fields': (
                'username',
                'email',
                'password',
                'is_active',
                'is_staff',
                'is_superuser',
            )
        }),
    )
    # ユーザー追加
    add_fieldsets = (
        (None, {
            'classes': ('wide',),
            'fields': (
                'username',
                'email',
                'password1',
                'password2',
                'is_active',
                'is_staff',
                'is_superuser',
            ),
        }),
    )

    # ユーザー一覧
    list_display = (
        'id',
        'username',
        'email',
        'is_active',
    )

    list_filter = ()
    # 検索
    search_fields = ('email',)
    # 順番
    ordering = ('joined_at',)

class UserProfileAdmin(admin.ModelAdmin):
    list_display = ('user', 'account_name', 'bio')
    search_fields = ('user__username', 'account_name')
    ordering = ('user__username',)

admin.site.register(User, UserAdminCustom)
admin.site.register(UserProfile, UserProfileAdmin)
