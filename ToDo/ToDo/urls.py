from django.contrib import admin
from django.urls import path, include, re_path
from rest_framework.permissions import AllowAny
from rest_framework.routers import DefaultRouter
from rest_framework.authtoken.views import obtain_auth_token
from rest_framework.authtoken.models import Token
from drf_yasg.views import get_schema_view
from drf_yasg import openapi

from users.views import UserModelViewSet
from project.views import ProjectModelViewSet, TodoModelViewSet

router = DefaultRouter()
router.register('users', UserModelViewSet)
# router.register('users_restrict', UserCustomViewSet)
router.register('project', ProjectModelViewSet)
router.register('todo', TodoModelViewSet)

schema_view = get_schema_view(
    openapi.Info(
        title='Library',
        default_version='1.0',
        description='description',
        contact=openapi.Contact(email='test@mail.com'),
        license=openapi.License(name='MIT')
    ),
    public=True,
    permission_classes=(AllowAny, )
)

urlpatterns = [
    path('admin/', admin.site.urls),
    path('api-auth/', include('rest_framework.urls')),
    path('api/', include(router.urls)),
    path('api-token-auth/', obtain_auth_token),

    # Версионность API по URLPathVersioning
    # path('api/<str:version>/users/', UserListAPIView.as_view()),
    # Версионность API по NamespaceVersioning (неудобно - объемный код, меняем url)
    # path('api/users/v1', include('users.urls', namespace='v1')),
    # path('api/users/v2', include('users.urls', namespace='v2')),
    # Версионность по QueryParameterVersioning - подключит автоматически при api/users/?version=v2
    # Версионность по AcceptHeaderVersioning - через Postman в header (application/json; version=v2)


    path('swagger/', schema_view.with_ui('swagger')),  # Swagger
    re_path(r'^swagger(?P<format>\.json|\.yaml)', schema_view.without_ui())
]