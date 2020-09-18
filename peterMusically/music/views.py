from django.shortcuts import render

# Create your views here.
from django.http import HttpResponse
from django.shortcuts import render
from .forms import UploadFileForm

# Imaginary function to handle an uploaded file.

def handle_uploaded_file(f, name):
    with open('./database/'+name, 'wb+') as destination:
        for chunk in f.chunks():
            destination.write(chunk)

def upload_file(request):
    if request.method == 'POST':
        handle_uploaded_file(request.FILES['file'], request.POST['name'])
        return HttpResponse('success', status=200)
    else:
        return HttpResponse('forbidden', status=404)