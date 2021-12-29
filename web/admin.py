from django.contrib import admin
from .models import Appoinment,Career,ApplyPost,Team,Role,Project,Community,Social,Business


class AppoinmentAdmin(admin.ModelAdmin):
    list_display = ('id','date','name','phone','email','person','message')
admin.site.register(Appoinment,AppoinmentAdmin)


class ApplyPostFormAdmin(admin.ModelAdmin):
    list_display = ('name','phone','post_name','date','email','cv')
admin.site.register(ApplyPost,ApplyPostFormAdmin)


class BusinessAdmin(admin.ModelAdmin):
    list_display = ('name','title','description',)
    prepopulated_fields = {'slug': ('name',)}
admin.site.register(Business,BusinessAdmin)


class CareerAdmin(admin.ModelAdmin):
    list_display = ('job_name','image','job_description','date',)    
admin.site.register(Career,CareerAdmin)


class RoleInline(admin.StackedInline):
    model = Role


class TeamAdmin(admin.ModelAdmin):
    inlines = [
        RoleInline,
    ]
    list_display = ('name','designation','photo','description',)
admin.site.register(Team,TeamAdmin)


class ProjectAdmin(admin.ModelAdmin):
    list_display = ('title','description',)
admin.site.register(Project,ProjectAdmin)


class SocialAdmin(admin.ModelAdmin):
    list_display = ('id','instegram','facebook','linkedin',)
admin.site.register(Social,SocialAdmin)


class CommunityAdmin(admin.ModelAdmin):
    list_display = ('title','description',)
admin.site.register(Community,CommunityAdmin)



