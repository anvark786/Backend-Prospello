from django.db import models
from django.forms.utils import to_current_timezone
import uuid
from django.utils.translation import gettext_lazy as _
from django.urls import reverse
from PIL import Image


class Appoinment(models.Model):

    PERSON_CHOICES = (
        ('default', 'SELECT PERSON'),
        ('person_1', 'FADHIL FAEZ'),
        ('person_2', 'ADNAN LATHEEF'),
        ('person_3', 'PV ANFAS'),
        ('person_4', 'YAQOOB K C'),
        ('person_5', 'PRABHINA'),
    )

    name = models.CharField(max_length=120,blank=True, null=True)
    email = models.EmailField(max_length=120,blank=True, null=True)
    phone = models.CharField(max_length=50,blank=True, null=True)
    person = models.CharField(choices=PERSON_CHOICES,default='default',max_length=12)
    message = models.TextField(blank=True, null=True)
    date = models.DateTimeField(auto_now=to_current_timezone)

    def __str__(self):
        return str(self.name)

    class Meta:
        ordering = ('-id',)

class ApplyPost(models.Model):
    name = models.CharField(max_length=120)
    phone = models.CharField(max_length=50)
    email = models.EmailField(max_length=120)
    post_name = models.CharField(max_length=120)
    cv = models.FileField(upload_to="web/career/files/")
    date = models.DateTimeField(auto_now=to_current_timezone)

    def __str__(self):
        return str(self.name)

class Business(models.Model):
    name = models.CharField(max_length=120)
    bg_image = models.ImageField(upload_to="web/Home/",blank=True,null=True)
    slug = models.SlugField(max_length=120,blank=True,null=True,unique=True)
    title = models.CharField(max_length=120)
    sub_title = models.CharField(max_length=50,blank=True,null=True)
    description = models.TextField()

    def __str__(self):
        return str(self.name)

    def get_absolute_url(self):
        return reverse('web:business_detail', args=[self.slug])

    class Meta:
        ordering = ('id',)
        verbose_name = _('business')
        verbose_name_plural = _('business')    


class Career(models.Model):
    business = models.ForeignKey(Business,on_delete=models.CASCADE)
    job_name = models.CharField(max_length=120,blank=True, null=True)
    image = models.ImageField(upload_to="web/career/",default='web/career/default.jpg')
    job_description = models.CharField(max_length=120,blank=True,null=True)   
    date = models.DateTimeField(auto_now=to_current_timezone)
    id = models.UUIDField(default=uuid.uuid4, primary_key=True)

    def __str__(self):
        return str(self.job_name)

    def save(self, *args, **kwargs):
        super().save()
        img = Image.open(self.image.path)
        width, height = img.size  # Get dimensions

        if width > 200 and height > 200:
            # keep ratio but shrink down
            img.thumbnail((width, height))

        # check which one is smaller
        if height < width:
            # make square by cutting off equal amounts left and right
            left = (width - height) / 2
            right = (width + height) / 2
            top = 0
            bottom = height
            img = img.crop((left, top, right, bottom))

        elif width < height:
            # make square by cutting off bottom
            left = 0
            right = width
            top = 0
            bottom = width
            img = img.crop((left, top, right, bottom))

        if width > 200 and height > 200:
            img.thumbnail((200, 200))

        img.save(self.image.path)


    class Meta:
        ordering = ('date',)
        verbose_name = _('career')
        verbose_name_plural = _('career')   


class Team(models.Model):
    photo = models.ImageField(upload_to="web/teams/",blank=True,null=True)
    name = models.CharField(max_length=120)
    designation = models.CharField(max_length=120)
    description = models.TextField(blank=True, null=True)

    def __str__(self):
        return str(self.name)

    class Meta:
        ordering = ('id',)
        verbose_name = _('leadership team')
        verbose_name_plural = _('leadership Teams')


class Role(models.Model):
    team = models.ForeignKey(Team, on_delete=models.CASCADE,related_name='teams')
    role = models.CharField(max_length=80)


class Project(models.Model):
    title = models.CharField(max_length=60)
    description = models.TextField()

    def __str__(self):
        return str(self.title)

    class Meta:
        ordering = ('id',)
        verbose_name = _('Upcoming Project')
        verbose_name_plural = _('Upcoming Project')


class Community(models.Model):
    title = models.CharField(max_length=60)
    description = models.TextField()

    def __str__(self):
        return str(self.title)

    class Meta:
        ordering = ('id',)
        verbose_name = _('Community')
        verbose_name_plural = _('Community')


class Social(models.Model):
    instegram = models.CharField(max_length=120,blank=True,null=True)
    facebook = models.CharField(max_length=120,blank=True,null=True)
    linkedin = models.CharField(max_length=120,blank=True,null=True)

    def __str__(self):
        return str(self.id)


    class Meta:
        ordering = ('id',)
        verbose_name = _('social links')
        verbose_name_plural = _('social links')

