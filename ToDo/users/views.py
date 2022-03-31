from rest_framework.viewsets import ModelViewSet
from rest_framework.viewsets import GenericViewSet
from rest_framework import mixins, generics
# from .models import NoteUser
from .models import User
from .serializers import UserModelSerializer, UserModelSerializerV2
from rest_framework.permissions import IsAuthenticatedOrReadOnly, AllowAny, IsAuthenticated, IsAdminUser, DjangoModelPermissions, DjangoModelPermissionsOrAnonReadOnly



class UserModelViewSet(ModelViewSet):
# class UserCustomViewSet(mixins.UpdateModelMixin, mixins.ListModelMixin, mixins.RetrieveModelMixin, GenericViewSet):
    # permission_classes = [AllowAny]

    # queryset = NoteUser.objects.all()
    queryset = User.objects.all()
    serializer_class = UserModelSerializer


    def get_serializer_class(self):
        if hasattr(self.request, 'version') and self.request.version == 'v2':  # если версия передана и =='v2'
            return UserModelSerializerV2
        return UserModelSerializer

class UserListAPIView(generics.ListAPIView):
    queryset = User.objects.all()
    # serializer_class = UserModelSerializer

    def get_serializer_class(self):
        if hasattr(self.request, 'version') and self.request.version == 'v2':   # если версия передана и =='v2'
            return UserModelSerializerV2
        return UserModelSerializer