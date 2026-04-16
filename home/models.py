from django.db import models
from modelcluster.fields import ParentalKey
from wagtail.models import Page, Orderable
from wagtail.admin.panels import FieldPanel, InlinePanel, MultiFieldPanel
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

    # Private Setting section fields
    ps_label = models.CharField(
        max_length=100, blank=True, null=True,
        default="Private Setting",
        help_text="Small label above the heading (e.g. 'Private Setting')"
    )
    ps_heading = models.CharField(
        max_length=255, blank=True, null=True,
        default="A private setting, with the Riviera within easy reach",
        help_text="Large heading for the Private Setting section"
    )
    ps_description = models.TextField(
        blank=True, null=True,
        help_text="Descriptive paragraph in the Private Setting section"
    )
    ps_image_left = models.ForeignKey(
        'wagtailimages.Image',
        null=True, blank=True,
        on_delete=models.SET_NULL,
        related_name='+',
        help_text="Left image in the Private Setting section"
    )
    ps_image_right = models.ForeignKey(
        'wagtailimages.Image',
        null=True, blank=True,
        on_delete=models.SET_NULL,
        related_name='+',
        help_text="Right image in the Private Setting section"
    )

    # Rooms & Amenities section fields
    ra_label = models.CharField(
        max_length=100, blank=True, null=True,
        default="Rooms & Amenities",
        help_text="Small label above the heading (e.g. 'Rooms & Amenities')"
    )
    ra_heading = models.CharField(
        max_length=255, blank=True, null=True,
        default="Space to breathe, designed for real living",
        help_text="Large heading for the Rooms & Amenities section"
    )
    ra_description = models.TextField(
        blank=True, null=True,
        help_text="Introductory paragraph under the heading"
    )
    ra_feature1_title = models.CharField(
        max_length=150, blank=True, null=True,
        default="Living spaces",
        help_text="First feature column title"
    )
    ra_feature1_desc = models.TextField(
        blank=True, null=True,
        help_text="First feature column description"
    )
    ra_feature2_title = models.CharField(
        max_length=150, blank=True, null=True,
        default="Bedrooms",
        help_text="Second feature column title"
    )
    ra_feature2_desc = models.TextField(
        blank=True, null=True,
        help_text="Second feature column description"
    )
    ra_image = models.ForeignKey(
        'wagtailimages.Image',
        null=True, blank=True,
        on_delete=models.SET_NULL,
        related_name='+',
        help_text="Large image on the left of the Rooms & Amenities section"
    )
    ra_button_text = models.CharField(
        max_length=80, blank=True, null=True,
        default="Discover",
        help_text="Text for the Discover button"
    )

    # Retreats & Gatherings section fields
    rg_label = models.CharField(
        max_length=100, blank=True, null=True,
        default="Retreats & Gatherings",
        help_text="Small label above the heading"
    )
    rg_heading = models.CharField(
        max_length=255, blank=True, null=True,
        default="Host your vision in a setting made for it",
        help_text="Large heading for the Retreats & Gatherings section"
    )
    rg_description = models.TextField(
        blank=True, null=True,
        help_text="Descriptive paragraph under the heading"
    )
    rg_button1_text = models.CharField(
        max_length=80, blank=True, null=True,
        default="Inquire",
        help_text="Primary button label (e.g. 'Inquire')"
    )
    rg_button2_text = models.CharField(
        max_length=80, blank=True, null=True,
        default="Next",
        help_text="Secondary text link label (e.g. 'Next')"
    )
    rg_image = models.ForeignKey(
        'wagtailimages.Image',
        null=True, blank=True,
        on_delete=models.SET_NULL,
        related_name='+',
        help_text="Image on the right side of the Retreats & Gatherings section"
    )
    rg_image_caption_title = models.CharField(
        max_length=200, blank=True, null=True,
        default="Yoga and wellness retreats",
        help_text="Bold caption title below the image"
    )
    rg_image_caption_desc = models.TextField(
        blank=True, null=True,
        help_text="Short description below the image caption title"
    )

    content_panels = Page.content_panels + [
        MultiFieldPanel([
            FieldPanel('hero_title'),
            FieldPanel('hero_description'),
            FieldPanel('hero_fine_print'),
            FieldPanel('hero_image'),
        ], heading="Hero Section"),
        InlinePanel('gallery_images', label="Gallery images"),
        MultiFieldPanel([
            FieldPanel('ps_label'),
            FieldPanel('ps_heading'),
            FieldPanel('ps_description'),
            FieldPanel('ps_image_left'),
            FieldPanel('ps_image_right'),
        ], heading="Private Setting Section"),
        MultiFieldPanel([
            FieldPanel('ra_label'),
            FieldPanel('ra_heading'),
            FieldPanel('ra_description'),
            FieldPanel('ra_feature1_title'),
            FieldPanel('ra_feature1_desc'),
            FieldPanel('ra_feature2_title'),
            FieldPanel('ra_feature2_desc'),
            FieldPanel('ra_image'),
            FieldPanel('ra_button_text'),
        ], heading="Rooms & Amenities Section"),
        MultiFieldPanel([
            FieldPanel('rg_label'),
            FieldPanel('rg_heading'),
            FieldPanel('rg_description'),
            FieldPanel('rg_button1_text'),
            FieldPanel('rg_button2_text'),
            FieldPanel('rg_image'),
            FieldPanel('rg_image_caption_title'),
            FieldPanel('rg_image_caption_desc'),
        ], heading="Retreats & Gatherings Section"),
    ]

    api_fields = [
        APIField('hero_title'),
        APIField('hero_description'),
        APIField('hero_fine_print'),
        APIField('hero_image'),
        APIField('gallery_images'),
        APIField('ps_label'),
        APIField('ps_heading'),
        APIField('ps_description'),
        APIField('ps_image_left', serializer=ImageRenditionField('original')),
        APIField('ps_image_right', serializer=ImageRenditionField('original')),
        APIField('ra_label'),
        APIField('ra_heading'),
        APIField('ra_description'),
        APIField('ra_feature1_title'),
        APIField('ra_feature1_desc'),
        APIField('ra_feature2_title'),
        APIField('ra_feature2_desc'),
        APIField('ra_image', serializer=ImageRenditionField('original')),
        APIField('ra_button_text'),
        APIField('rg_label'),
        APIField('rg_heading'),
        APIField('rg_description'),
        APIField('rg_button1_text'),
        APIField('rg_button2_text'),
        APIField('rg_image', serializer=ImageRenditionField('original')),
        APIField('rg_image_caption_title'),
        APIField('rg_image_caption_desc'),
    ]
