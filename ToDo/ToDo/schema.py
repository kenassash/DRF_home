import graphene
from django.db.models import fields
from graphene_django import DjangoObjectType
from project.models import Todo, Project
from users.models import User


class UsersType(DjangoObjectType):
    class Meta:
        model = User
        fields = "__all__"


class TodoType(DjangoObjectType):
    class Meta:
        model = Todo
        fields = "__all__"


class ProjectType(DjangoObjectType):
    class Meta:
        model = Project
        fields = "__all__"


class Query(graphene.ObjectType):
    all_users = graphene.List(UsersType)
    all_todos = graphene.List(TodoType)
    all_projects = graphene.List(ProjectType)
    user_by_id = graphene.Field(UsersType, id=graphene.Int(required=True))
    todo_by_id = graphene.Field(TodoType, id=graphene.Int(required=True))
    project_by_id = graphene.Field(ProjectType, id=graphene.Int(required=True))

    def resolve_all_users(root, info):
        return User.objects.all()

    def resolve_all_todos(root, info):
        return Todo.objects.all()

    def resolve_all_projects(root, info):
        return Project.objects.all()

    def resolve_user_by_id(self, info, id):
        try:
            return User.objects.get(id=id)
        except User.DoesNotExist:
            return None

    def resolve_todo_by_id(self, info, id):
        try:
            return Todo.objects.get(id=id)
        except Todo.DoesNotExist:
            return None

    def resolve_project_by_id(self, info, id):
        try:
            return Project.objects.get(id=id)
        except Project.DoesNotExist:
            return None


schema = graphene.Schema(query=Query)

# 1) С помощью GraphQL создать схему, которая позволит одновременно получать ToDo, проекты
# и пользователей, связанных с проектом.

# {
#   allTodos {
#     id
#     text
#     isActive
#
# 	}
#   allProjects {
#     id
#     users {
#       id
#       username
#       firstName
#       lastName
#       email
#     }
#   }
# }