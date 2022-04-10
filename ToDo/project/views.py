from rest_framework.viewsets import ModelViewSet
from rest_framework.pagination import LimitOffsetPagination
from rest_framework.response import Response
from rest_framework import status
from .models import Project, Todo
from .serializers import ProjectModelSerializer, TodoModelSerializer, ProjectModelSerializerV2
from django_filters import rest_framework as filters


class ProjectLimitOffsetPagination(LimitOffsetPagination):
    default_limit = 20


class ProjectFilter(filters.FilterSet):
    name = filters.CharFilter(lookup_expr='contains')

    class Meta:
        model = Project
        fields = ['name']


class ProjectModelViewSet(ModelViewSet):
    queryset = Project.objects.all()
    serializer_class = ProjectModelSerializer
    # pagination_class = ProjectLimitOffsetPagination
    filterset_class = ProjectFilter

    def get_serializer_class(self):
        if self.request.version == '2.0':
            return ProjectModelSerializerV2
        return ProjectModelSerializer


class TodoLimitOffsetPagination(LimitOffsetPagination):
    default_limit = 20


class TodoModelViewSet(ModelViewSet):
    queryset = Todo.objects.all()
    serializer_class = TodoModelSerializer
    # pagination_class = TodoLimitOffsetPagination
    filterset_fields = ['project']

    def destroy(self, request, *args, **kwargs):
        todo = self.get_object()
        todo.is_active = False
        todo.save()
        return Response(status=status.HTTP_204_NO_CONTENT)
