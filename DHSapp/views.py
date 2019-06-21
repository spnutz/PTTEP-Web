from django.shortcuts import render
from django.http import HttpResponse
from django.template import loader
from django.shortcuts import render_to_response
# Create your views here.
def index(request):
    return render(request, 'index.html')