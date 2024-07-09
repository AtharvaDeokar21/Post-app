
from typing import Any
from django.db.models.query import QuerySet
from django.forms import BaseModelForm
from django.http import HttpRequest, HttpResponse
from django.views.generic import DetailView, TemplateView
from django.views.generic.edit import CreateView
from django.contrib.auth.mixins import LoginRequiredMixin
from django.shortcuts import render
from followers.models import Follower
from .models import Post

class HomePage(TemplateView):
    http_method_names = ["get"]
    template_name = "feed/homepage.html"
    
    def dispatch(self, request: HttpRequest, *args, **kwargs):
        self.request = request
        return super().dispatch(request, *args, **kwargs)
    
    def get_context_data(self, **kwargs):
        context = super().get_context_data(**kwargs)
        if self.request.user.is_authenticated:
            following = list(Follower.objects.filter(followed_by=self.request.user).values_list('following', flat=True))
            if not following:
                # Show default 30 posts
                posts = Post.objects.all().order_by('-id')[:30]
            else:
                # Show posts from followed users
                posts = Post.objects.filter(author__in=following).order_by('-id')[:60]
            
            # Get some random posts, excluding the posts from followed users
            random_posts = Post.objects.exclude(author__in=following).order_by('?')[:10]
            
        else:
            posts = Post.objects.all().order_by('-id')[:30]
            random_posts = []
        
        context['posts'] = posts
        context['random_posts'] = random_posts
        return context

class PostDetailView(DetailView):
    http_method_names = ["get"]
    template_name = "feed/detail.html"
    model = Post
    context_object_name = "post"
    
class CreateNewPost(LoginRequiredMixin, CreateView):
    model = Post
    template_name = "feed/create.html"
    fields = ['text']
    success_url = "/"
    
    def dispatch(self, request, *args, **kwargs):
        self.request = request
        return super().dispatch(request, *args, **kwargs)
    
    def form_valid(self, form):
        obj = form.save(commit=False)
        obj.author = self.request.user
        obj.save()
        return super().form_valid(form)
    
    def post(self, request, *args, **kwargs):
        
        post = Post.objects.create(
            text=request.POST.get("text"),
            author=request.user,
        )
        
        return render(
            request,
            "includes/post.html",
            {
                "post": post,
                "show_detail_link": True,
            },
            content_type="application/html"
        )
