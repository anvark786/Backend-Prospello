from django.contrib import admin
from django.urls import path, include
from django.conf import settings
from django.conf.urls.static import static


urlpatterns = [
    path('prospello-admin/', admin.site.urls),
    path('', include('web.urls', namespace="web")),
]
urlpatterns += static(settings.MEDIA_URL, document_root=settings.MEDIA_ROOT)

admin.site.site_header = 'Prospello Administration'
admin.site.site_title = 'Prospello site admin'
