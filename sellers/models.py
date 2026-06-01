from django.db import models

# Create your models here.
class Sellers(models.Model):
  cpf = models.CharField(max_length=11)
  name = models.CharField(max_length=150)
  register = models.CharField(max_length=25)
