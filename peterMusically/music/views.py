from django.shortcuts import render

# Create your views here.
from django.http import HttpResponse, Http404
from django.shortcuts import render
from .forms import UploadFileForm
import os
import peterMusically.settings as settings
import uuid
from django.db import models
import uuid
import urllib.parse
import json

# Imaginary function to handle an uploaded file.

def handle_uploaded_file(f, name):
    with open('./database/'+name, 'wb+') as destination:
        for chunk in f.chunks():
            destination.write(chunk)

def handle_delete_file(name):
    name = './database/' + name
    if os.path.exists(name):
        os.remove(name)
        return 200
    else:
        return 404

def music_file(request, id=None):
    if request.method == 'POST':
        id = uuid.uuid4().hex
        url = id + '.mp3'
        handle_uploaded_file(request.FILES['file'], url)
        return HttpResponse(json.dumps({'url': url}), status=200)

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
    elif request.method == 'DELETE':
        status = handle_delete_file(id)
        return HttpResponse(status=status)