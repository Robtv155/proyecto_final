from django.shortcuts import render, redirect
from django.contrib.auth import authenticate, login, logout
from django.contrib import messages
from django.contrib.auth.models import User
from .forms import RegistroForm, LoginForm, PostForm, CommentForm
from django.views.generic import ListView, DetailView, CreateView, DeleteView, UpdateView
from .models import Post, Tag, Comment
from django.urls import reverse_lazy, reverse
from django.contrib.auth.mixins import LoginRequiredMixin, UserPassesTestMixin
from django.core.paginator import Paginator
#imports para API de terceros y cache
import requests
from django.http import JsonResponse
from django.views.decorators.cache import cache_page
from django.conf import settings
from django.utils.timezone import now
from datetime import datetime
#pagination
from rest_framework.pagination import PageNumberPagination
from rest_framework import generics
from .serializers import PostSerializer


# Create your views here.

def inicio(request):
    return render(request, 'inicio.html')

def privacidad(request):
    return render(request, 'privacidad.html')

def aviso_legal(request):
    return render(request, 'aviso_legal.html')

def index(request):
    return render (request, 'index.html')

def compra(request):
    return render (request, 'tu_compra.html')

def loginView(request):
    if request.method == 'POST':
        form = LoginForm(request.POST)
        if form.is_valid():
            email = form.cleaned_data['email']
            password = form.cleaned_data['password']
            remember = request.POST.get('remember_me')

            try:
                user = User.objects.get(email=email)
            except User.DoesNotExist:
                messages.error(request, "Correo no registrado")
                return redirect('login')
            
            user_auth= authenticate(request, username=user.username, password=password)

            if user_auth is not None:
                login(request, user_auth)

                if not remember:
                    request.session.set_expiry(0)

                messages.success(request, "Has iniciado sesión correctamente")
                return redirect('index')
            else:
                messages.success(request, "Contraseña incorrecta")
                return redirect('login')
    else:
        form = LoginForm()

    return render(request, 'login.html', {'form': form})


def registroView(request):
    if request.method == 'POST':
        form = RegistroForm(request.POST)
        if form.is_valid():
            form.save()
            messages.success(request, "Registro exitoso. Inicia sesión")
            return redirect('login')
    else:
        form = RegistroForm()
    return render(request, 'registro.html', {'form': form})

def logoutView(request):
    logout(request)
    messages.info(request, "Has cerrado sesión. ¡Vuelve pronto!")
    return redirect('index')

def politica_cookies(request):
    return render(request, 'politica_cookies.html')

class PostListView(ListView):
    model = Post
    template_name = "post_list.html"
    context_object_name = 'posts'
    paginate_by = 3

class PostDetailView(DetailView):
    model = Post
    template_name = "post_detail.html"

class PostCreateView(CreateView, LoginRequiredMixin, UserPassesTestMixin):
    model = Post
    form_class = PostForm
    template_name = "post_create.html"
    success_url = reverse_lazy('post_list')

    def test_func(self):
        obj=self.get_object()
        return self.request.user == obj.author or self.request.user.is_superuser

    def form_valid(self, form):
        post = form.save(commit = False)
        post.author = self.request.user
        post.save()

        tag_string = form.cleaned_data.get('tag_string', '')
        if tag_string:
            tag_name = [t.strip() for t in tag_string.split(',') if t.strip()]
            for name in tag_name:
                exists = Tag.objects.filter(name__iexact = name).exists()
                if not exists:
                    new_tag = Tag.objects.create(name=name)
                    post.tags.add(new_tag)
                else:
                    existing_tag = Tag.objects.get(name__iexact = name)
                    post.tags.add(existing_tag)
        return super().form_valid(form)

class PostUpdateView(UpdateView, LoginRequiredMixin, UserPassesTestMixin):
    model = Post
    form_class = PostForm
    template_name = 'post_form.html'
    success_url = reverse_lazy('post_list')

    def test_func(self):
        obj=self.get_object()
        return self.request.user == obj.author or self.request.user.is_superuser

    def form_valid(self, form):
        post = form.save(commit = False)
        post.author = self.request.user
        post.save()

        tag_string = form.cleaned_data.get('tag_string', '')
        if tag_string:
            tag_name = [t.strip() for t in tag_string.split(',') if t.strip()]
            for name in tag_name:
                exists = Tag.objects.filter(name__iexact = name).exists()
                if not exists:
                    new_tag = Tag.objects.create(name=name)
                    post.tags.add(new_tag)
                else:
                    existing_tag = Tag.objects.get(name__iexact = name)
                    post.tags.add(existing_tag)
        return super().form_valid(form)

class PostDeleteView(DeleteView, LoginRequiredMixin, UserPassesTestMixin):
    model = Post
    template_name = 'post_confirm_delete.html'
    success_url = reverse_lazy('post_list')

    def test_func(self):
        obj = self.get_object()
        return self.request.user == obj.author or self.request.user.is_superuser

# Vistas para gestionar Tag

class TagListView(ListView):
    model = Tag
    template_name = "tag_list.html"

class TagCreateView(CreateView):
    model = Tag
    fields = ['name']
    template_name = "tag_create.html"
    success_url = reverse_lazy('tag_list')

    def form_valid(self, form):
        return super().form_valid(form)

# class TagUpdateView(UpdateView):
#     model = Tag
#     template_name = "tag_edit.html"
#     success_url = reverse_lazy('tag_list')

class TagDeleteView(DeleteView):
    model = Tag
    template_name = "tag_delete.html"
    success_url = reverse_lazy('tag_list')

class PostbyTagView(DetailView):
    model = Tag
    template_name = "post_list_by_tag.html"

class CommentCreateView(CreateView):
    model = Comment
    form_class = CommentForm
    template_name = 'comment_create.html'

    def test_func(self):
        obj = self.get_object()
        return self.request.user == obj.author or self.request.user.is_superuser
    
    def form_valid(self, form):
         comentario = form.save(commit=False)   
         post = Post.objects.get(pk=self.kwargs['pk'])
         comentario.post = post     
         comentario.author = self.request.user  
         comentario.save()
         return super().form_valid(form)

    def get_success_url(self):
        return reverse('post_detail', kwargs={'pk': self.kwargs['pk']})
    
def blog(request):
    return render (request, 'blog.html')


#Handlers exceptions 400, 403, 404, 500

def custom_404(request, exception):
    return render(request, "404.html", {"path": request.path}, status = 404)
def custom_403(request, exception):
    return render(request, "403.html", status = 403)
def custom_400(request, exception):
    return render(request, "400.html", status = 400)
def custom_500(request):
    return render(request, "500.html", status = 500)

# Vista para API de terceros OPENWEATHER

@cache_page(60*30) #1800s
def weather(request):
    city = request.GET.get('city', 'Santander')
    url = f'https://api.openweathermap.org/data/2.5/weather?q={city}&units=metric&lang=es&appid={settings.OWN_KEY}'

    try:
        r = requests.get(url)
        r.raise_for_status()
        data = r.json()

        timezone_offset = data.get('timezone', 0)
        utc_now = datetime.utcnow()
        local_time = utc_now.timestamp() + timezone_offset
        localtime_str = datetime.fromtimestamp(local_time).strftime('%H:%M (%d %b %Y)')

        response = {
            'city': data['name'],
            'country': data['sys']['country'],
            'temp': round(data['main']['temp']),
            'temp_min': round(data['main']['temp_min']),
            'temp_max': round(data['main']['temp_max']),
            'feels_like': round(data['main']['feels_like']),
            'humidity': data['main']['humidity'],
            'wind_speed': data['wind']['speed'],
            'wind_deg': data['wind'].get('deg', 0),
            'desc': data['weather'][0]['description'],
            'icon': data['weather'][0]['icon'],
            'localtime': localtime_str,
        }
        return JsonResponse(response)

    except Exception:
        return JsonResponse({'error': 'No se pudo obtener el clima'}, status=500)

def recipe(request):
    key_meal = settings.OWN_KEY2
    url = f'https://www.themealdb.com/api/json/v1/{key_meal}/random.php'
    try:
        r = requests.get(url, timeout=5)
        data = r.json()
        meal = data['meals'][0]

        respuesta = {
            'name': meal['strMeal'],
            'category': meal['strCategory'],
            'area': meal['strArea'],
            'instructions': meal['strInstructions'],
            'image': meal['strMealThumb'],
            'tags': meal['strTags'],
            'youtube': meal['strYoutube'],
        }
    except Exception as e:
        respuesta = {'error': 'No se pudo obtener la receta'}

    return JsonResponse(respuesta)

#paginacion

from rest_framework.pagination import PageNumberPagination

class PostPagination(PageNumberPagination):
    page_size = 4  # <-- Aquí el número de posts por página

class PostListAPIView(generics.ListAPIView):
    queryset = Post.objects.all().order_by('-created_at')  # o por id, como prefieras
    serializer_class = PostSerializer
    pagination_class = PostPagination
