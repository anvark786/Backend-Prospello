from . models import Social,Business,Career

def main_context(request):
	social_links = Social.objects.all()	
	business_datas = Business.objects.all()
	careers = Career.objects.all()

	return {
		"social_links":social_links,
		"business_datas": business_datas,
		"careers": careers,
	}