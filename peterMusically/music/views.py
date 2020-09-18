from django.shortcuts import render

# Create your views here.
from django.http import HttpResponse, Http404
from django.shortcuts import render
from .forms import UploadFileForm
import os
import peterMusically.settings as settings

# Imaginary function to handle an uploaded file.

def handle_uploaded_file(f, name):
    with open('./database/'+name, 'wb+') as destination:
        for chunk in f.chunks():
            destination.write(chunk)

def music_file(request, id=None):
    if request.method == 'POST':
        handle_uploaded_file(request.FILES['file'], request.POST['name'])
        return HttpResponse('success', status=200)

    elif request.method == 'GET':
        if id==None:
            return HttpResponse('Please provide id', status=404)


        file_path = os.path.join(settings.MEDIA_ROOT, id)
        
        if os.path.exists(file_path):
            with open(file_path, 'rb') as fh:
                response = HttpResponse(fh.read(), content_type="audio/mpeg")
                response['Content-Disposition'] = 'inline; filename=' + os.path.basename(file_path)
                return response
        raise Http404
        