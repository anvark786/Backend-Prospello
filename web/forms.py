from django import forms
from django.forms.widgets import Select, TextInput, Textarea
from django.utils.translation import gettext_lazy as _
from . models import Appoinment,ApplyPost

class AppoinmentForm(forms.ModelForm):

	class Meta:
		model = Appoinment
		fields = '__all__'
		widgets = {
			'name': TextInput(attrs={'class': 'required form-control','placeholder': 'Name'}),
			'email': TextInput(attrs={'class': 'required form-control','placeholder': 'Email'}),
			'phone': TextInput(attrs={'class': 'required form-control','placeholder': 'Phone'}),	
            'person': Select(attrs={'class': 'required medium-input bg-white select_person'}),	
			'message': Textarea(attrs={'class': 'required form-control','placeholder': 'Reason For Appoinment'}),	

		}
		error_messages = {
			'name': {
				'required': _("Name field is required."),
			},
			'email': {
				'required': _("Phone field is required."),
			},
			'phone': {
				'required': _("Email field is required."),
			},
			'message': {
				'required': _("Message field is required."),
			}
		}


class ApplyPostForm(forms.ModelForm):

	class Meta:
		model =ApplyPost
		exclude = ('id','post_name','date',)
		
		error_messages = {
			'name': {
				'required': _("Name field is required."),
			},
			'email': {
				'required': _("Phone field is required."),
			},
			'phone': {
				'required': _("Email field is required."),
			},
			'cv': {
				'required': _("CV  is required."),
			}
		}

		labels = {
			'cv': "Upload CV"
		}
		
	def __init__(self, *args, **kwargs):
		super(ApplyPostForm, self).__init__(*args, **kwargs)

		for name, field in self.fields.items():
			field.widget.attrs.update({'class': 'required'})
