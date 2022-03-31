from django.test import TestCase

from rest_framework import status
from rest_framework.test import APIRequestFactory, force_authenticate  # , APIClient, APISimpleTestCase, APITestCase
# from mixer.backend.django import mixer
# from django.contrib.auth.models import User
from .models import User
from .views import UserModelViewSet


class UserViewSet(TestCase):

    def test_get_list(self):
        """ Запрос списка юзеров неавторизованным пользователем"""
        factory = APIRequestFactory()
        request = factory.get('/api/users/')
        view = UserModelViewSet.as_view({'get': 'list'})
        response = view(request)
        # print("request:", request)
        # print("response.data:", response.data)
        self.assertEqual(response.status_code, status.HTTP_401_UNAUTHORIZED)

    def test_create_admin(self):
        """ Запрос списка юзеров неавторизованным пользователем """
        factory = APIRequestFactory()
        request = factory.get('/api/users/')
        admin = User.objects.create_superuser('admin', 'admin@ad.cc', 'admin123')
        force_authenticate(request, admin)
        view = UserModelViewSet.as_view({'get': 'list'})
        response = view(request)
        # print("request:", request)
        # print("response.data:", response.data)
        self.assertEqual(response.status_code, status.HTTP_200_OK)