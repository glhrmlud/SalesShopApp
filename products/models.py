from django.db import models
from django.core.validators import MinValueValidator
# Create your models here.

class Products(models.Model):
  image = models.ImageField(upload_to='products_image/', blank=True, null=True)
  name = models.CharField(max_length=150)
  description = models.TextField()
  price = models.DecimalField(
    validators=[MinValueValidator(0.09, message='O item não pode ser de graça')],
    max_digits=10,
    decimal_places=2
  )
  stock = models.IntegerField(
    validators=[MinValueValidator(0, message='O estoque não pode ser negativo!!')]
  )

  def __str__(self):
    return f"{self.name}"
