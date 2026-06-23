from django.db import models
from django.contrib.auth.models import User

class Sellers(models.Model):
  image = models.ImageField(upload_to='users_image/', blank=True, null=True)
  user = models.OneToOneField(User, on_delete = models.CASCADE, related_name = 'seller_profile')

  cpf = models.CharField(max_length=11)
  register = models.CharField(max_length=25)

  def __str__(self):
    return self.user.username
