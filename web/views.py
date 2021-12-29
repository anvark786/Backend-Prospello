from django.shortcuts import render,get_object_or_404
from django.http.response import HttpResponse,HttpResponseRedirect
import json
from .forms import AppoinmentForm,ApplyPostForm
from . models import Career,Team,Role,Project,Community,Business



def index(request):
    return render(request, 'web/index.html')


def about(request):  
    context = {
        "title":"About",
    }  
    return render(request, 'web/about-company.html',context)


def teams(request):
    teams = Team.objects.all()    
    
    context = {
        "teams":teams,        
        "title":"Teams",
    }
    return render(request, 'web/teams.html',context)


def community(request):
    community_datas = Community.objects.all()
    context = {
        "title":"Community",
        "community_datas":community_datas
    }
    return render(request, 'web/community.html',context)


def upcoming(request):
    projects = Project.objects.all()
    context = {
        "title":"Projects",
        "projects":projects,
    }
    return render(request, 'web/upcoming.html',context)


def business_detail(request,slug):
    business_detail = get_object_or_404(Business,slug=slug)
    context = {
        "title":"Business",
        "business_detail": business_detail,
    }
    return render(request, 'web/business_detail.html',context)



def career_list(request,business_slug):
    business = get_object_or_404(Business,slug=business_slug)
    career_list = Career.objects.filter(business=business)
    context = {
        "title": "Career",
        "business": business,
        "career_list": career_list,
    }
    return render(request, 'web/career_list.html',context)


def apply_post(request,pk):
    form = ApplyPostForm()    
    apply_post_instance = Career.objects.get(id=pk)     
      
    if request.method == "POST":       
        form = ApplyPostForm(request.POST,request.FILES)       
        if form.is_valid():
            data= form.save(commit=False)
            data.post_name = apply_post_instance.job_description
            data.save()
            return render(request,'web/success.html',{'data':data})
        else:            
            message = generate_form_errors(form,formset=False)
    context={
        'apply_post_instance': apply_post_instance,
        'form': form,
        "title": "Career",

    }
    return render(request, 'web/apply_post.html',context)


def contact(request):    
    if request.method == "POST":        
        form = AppoinmentForm(request.POST)
        if form.is_valid():
            form.save()

            response_data = {
                "status" : "true",
                "title" : "Successfully Submitted",
                "message" : "Your Appoinment Successfully Submitted.",
            }
        else:
            message = generate_form_errors(form,formset=False)
            
            response_data = {
                "status" : "false",
                "stable" : "true",
                "title" : "Form validation error",
                "message" : message
            }
        return HttpResponse(json.dumps(response_data), content_type='application/javascript')
    else:
        form = AppoinmentForm()
        context = {
            "title": "Contact",
            "form": form,
        }
    return render(request, 'web/contact.html',context)
