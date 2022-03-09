# from rest_framework.viewsets import ModelViewSet
from rest_framework.viewsets import GenericViewSet
from rest_framework import mixins
# from .models import NoteUser
from .models import User
from .serializers import UserModelSerializer
from rest_framework.permissions import IsAuthenticatedOrReadOnly, AllowAny, IsAuthenticated, IsAdminUser, DjangoModelPermissions, DjangoModelPermissionsOrAnonReadOnly



# class UserModelViewSet(ModelViewSet):
class UserCustomViewSet(mixins.UpdateModelMixin, mixins.ListModelMixin, mixins.RetrieveModelMixin, GenericViewSet):
    permission_classes = [AllowAny]

    # queryset = NoteUser.objects.all()
    queryset = User.objects.all()
    serializer_class = UserModelSerializer