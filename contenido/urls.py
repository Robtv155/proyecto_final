from django.urls import path, include
from . import views
from .views import PostListView, PostDetailView, PostCreateView, PostUpdateView, PostDeleteView
from .views import TagListView, TagCreateView, TagDeleteView, PostbyTagView
from .views import CommentCreateView

urlpatterns = [
    path('', views.index, name = 'index'),
    path('menujavahtmlcss/', views.menujavahtmlcss, name = 'menujavahtmlcss'),
    path('indice_1/', views.indice_1, name = 'indice_1'),
    path('indice_2/', views.indice_2, name = 'indice_2'),
    path('indice_3/', views.indice_3, name = 'indice_3'),
    path('indice_4/', views.indice_4, name = 'indice_4'),
    path('javascript1/', views.javascript1, name = 'javascript1'),
    path('encabezados/', views.encabezados, name = 'encabezados'),
    path('direccionamiento/', views.direccionamiento, name = 'direccionamiento'),
    path('atajos_teclado/', views.atajos_teclado, name = 'atajos_teclado'),
    path('tablas/', views.tablas, name = 'tablas'),
    path('imagenes/', views.imagenes, name = 'imagenes'),
    path('imagenes_svg_y_webp/', views.svgywebp, name = 'svgywebp'),
    path('flexbox/', views.flexbox, name = 'flexbox'),
    path('margin_padding/', views.margin_padding, name = 'margin_padding'),
    path('tu_compra/', views.compra, name='compra'),
    path('login/', views.loginView, name='login'),
    path('registro/', views.registroView, name='registro'),
    path('logout/', views.logoutView, name='logout'),
    path('post/', PostListView.as_view(), name = 'post_list'),
    path('<int:pk>/', PostDetailView.as_view(), name ='post_detail'),
    path('new/', PostCreateView.as_view(), name ='post_create'),
    path('<int:pk>/edit/', PostUpdateView.as_view(), name = 'post_update'),
    path('<int:pk>/delete/', PostDeleteView.as_view(), name = 'post_delete'),
    path('tags/', TagListView.as_view(), name = 'tag_list'),
    path('newT/', TagCreateView.as_view(), name = 'tag_create'),
    # path('<int:pk>/editT/', TagUpdateView.as_view(), name = 'tag_edit'),
    path('<int:pk>/deleteT/', TagDeleteView.as_view(), name = 'tag_delete'),
    path('post_by_tag/<int:pk>/', PostbyTagView.as_view(), name = 'post_list_by_tag'),
    path('comment/<int:pk>/', CommentCreateView.as_view(), name = 'comment_create'),
    path('blog', views.blog, name = 'blog'),
    path('politica-cookies/', views.politica_cookies, name = 'politica_cookies'),
    path('weather/', views.weather, name ='weather'),
    path('recipe/', views.recipe, name ='recipe')
]