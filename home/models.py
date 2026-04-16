from django.db import models
from modelcluster.fields import ParentalKey
from wagtail.models import Page, Orderable
from wagtail.admin.panels import FieldPanel, InlinePanel
from wagtail.api import APIField

from wagtail.images.api.fields import ImageRenditionField

class HomePageGalleryImage(Orderable):
    page = ParentalKey('home.HomePage', on_delete=models.CASCADE, related_name='gallery_images')
    image = models.ForeignKey(
        'wagtailimages.Image', on_delete=models.CASCADE, related_name='+'
    )
    caption = models.CharField(blank=True, max_length=250)

    panels = [
        FieldPanel('image'),
        FieldPanel('caption'),
    ]

    api_fields = [
        APIField('image', serializer=ImageRenditionField('original')),
        APIField('caption'),
    ]

class HomePage(Page):
    """Home page model""" 
    template = "home_page.html"

    # Hero section fields
    hero_title = models.CharField(max_length=255, blank=True, null=True, help_text="Main bold heading")
    hero_description = models.TextField(blank=True, null=True, help_text="Smaller descriptive paragraph")
    hero_fine_print = models.CharField(max_length=255, blank=True, null=True, help_text="Italicized fine print under buttons")
    hero_image = models.ForeignKey(
        'wagtailimages.Image', 
        null=True, 
        blank=True, 
        on_delete=models.SET_NULL, 
        related_name='+',
        help_text="Main square image on the right side"
    )

    content_panels = Page.content_panels + [
        FieldPanel('hero_title'),
        FieldPanel('hero_description'),
        FieldPanel('hero_fine_print'),
        FieldPanel('hero_image'),
        InlinePanel('gallery_images', label="Gallery images"),
    ]

    api_fields = [
        APIField('hero_title'),
        APIField('hero_description'),
        APIField('hero_fine_print'),
        APIField('hero_image'),
        APIField('gallery_images'),
    ]
