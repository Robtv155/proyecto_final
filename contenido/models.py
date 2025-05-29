from django.db import models

# Create your models here.

from django.contrib.auth.models import User

class Post(models.Model):
    title = models.CharField(max_length=200)
    content = models.TextField()
    author = models.ForeignKey(User, on_delete = models.CASCADE)
    created_at = models.DateTimeField(auto_now_add = True)
    imagen = models.ImageField(upload_to='imagenes_posts/', null=True, blank=True)

class Tag(models.Model):
    name = models.CharField(max_length=50)
    posts = models.ManyToManyField(Post, related_name='tags')

# class Comentarios(models.Model):
#     author = models.ForeignKey(User, on_delete= models.CASCADE)
#     text = models.TextField()
#     created_at = models.DateTimeField(auto_now_add = True)

class Comment(models.Model):
    content=models.TextField()
    post = models.ForeignKey(Post, on_delete=models.CASCADE)
    author = models.ForeignKey(User, on_delete=models.SET_NULL, null=True, blank=True)
    created_at= models.DateTimeField(auto_now_add=True)

    def __str__(self):
        autor = self.author.username if self.author else "Anónimo"
        return f"Comentario por {autor} en {self.post.title}"
