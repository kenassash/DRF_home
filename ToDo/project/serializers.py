from rest_framework.serializers import HyperlinkedModelSerializer
from .models import Project, Todo


class ProjectModelSerializer(HyperlinkedModelSerializer):
    class Meta:
        model = Project
        fields = ('id', 'url', 'name', 'repository', 'users')

class ProjectModelSerializerV2(HyperlinkedModelSerializer):
    class Meta:
        model = Project
        fields = ('id', 'name', 'repository', 'users')


class TodoModelSerializer(HyperlinkedModelSerializer):
    class Meta:
        model = Todo
        fields = ('id', 'project', 'text', 'created', 'updated', 'user', 'is_active')