class RefreshTokenMiddleware:
    def __init__(self, get_response):
        self.get_response = get_response

    def __call__(self, request):
        response = self.get_response(request)
        if hasattr(request, 'new_access_token'):
            response.set_cookie(
                'access_token',
                request.new_access_token,
                max_age=60 * 60 * 3,
                httponly=True
            )
        return response
