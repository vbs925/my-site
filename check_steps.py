from home.models import HomePage, HomePageWhatHappensNextStep

page = HomePage.objects.first()
steps = HomePageWhatHappensNextStep.objects.filter(page=page).order_by('sort_order')
print(f"Found {steps.count()} steps for page {page.title}")
for s in steps:
    print(f"- {s.title}: {s.description}")
