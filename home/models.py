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

class HomeComfortsImage(Orderable):
    page = ParentalKey('home.HomePage', on_delete=models.CASCADE, related_name='home_comforts_images')
    image = models.ForeignKey(
        'wagtailimages.Image', on_delete=models.CASCADE, related_name='+'
    )

    panels = [
        FieldPanel('image'),
    ]

    api_fields = [
        APIField('image', serializer=ImageRenditionField('original')),
    ]


class HomePageReview(Orderable):
    """A single guest review for the Reviews section."""
    page = ParentalKey('home.HomePage', on_delete=models.CASCADE, related_name='reviews')
    stars = models.IntegerField(default=5, help_text="Rating out of 5")
    text = models.TextField(help_text="Review text (shown in italic)")
    author_name = models.CharField(max_length=150, help_text="Guest name")
    author_title = models.CharField(max_length=150, blank=True, null=True, help_text="Guest title or location (optional)")
    author_image = models.ForeignKey(
        'wagtailimages.Image',
        on_delete=models.SET_NULL,
        null=True, blank=True,
        related_name='+',
        help_text="Profile picture"
    )

    panels = [
        FieldPanel('stars'),
        FieldPanel('text'),
        FieldPanel('author_name'),
        FieldPanel('author_title'),
        FieldPanel('author_image'),
    ]

    api_fields = [
        APIField('stars'),
        APIField('text'),
        APIField('author_name'),
        APIField('author_title'),
        APIField('author_image', serializer=ImageRenditionField('original')),
    ]


class HomePageWhatHappensNextStep(Orderable):
    page = ParentalKey('home.HomePage', on_delete=models.CASCADE, related_name='whn_steps')
    title = models.CharField(max_length=255)
    description = models.TextField()
    image = models.ForeignKey('wagtailimages.Image', on_delete=models.SET_NULL, null=True, blank=True, related_name='+')
    
    panels = [ FieldPanel('image'), FieldPanel('title'), FieldPanel('description') ]
    api_fields = [ APIField('image', serializer=ImageRenditionField('original')), APIField('title'), APIField('description') ]

class HomePageWhyBookBenefit(Orderable):
    page = ParentalKey('home.HomePage', on_delete=models.CASCADE, related_name='why_benefits')
    text = models.CharField(max_length=255)
    
    panels = [ FieldPanel('text') ]
    api_fields = [ APIField('text') ]

class HomePageConfidenceItem(Orderable):
    page = ParentalKey('home.HomePage', on_delete=models.CASCADE, related_name='bwc_items')
    text = models.CharField(max_length=255)
    image = models.ForeignKey('wagtailimages.Image', on_delete=models.SET_NULL, null=True, blank=True, related_name='+')
    
    panels = [ FieldPanel('image'), FieldPanel('text') ]
    api_fields = [ APIField('image', serializer=ImageRenditionField('original')), APIField('text') ]


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

    # Home Comforts section fields
    hc_label = models.CharField(
        max_length=100, blank=True, null=True,
        default="Home Comforts",
        help_text="Small label above the top heading"
    )
    hc_top_heading = models.CharField(
        max_length=255, blank=True, null=True,
        default="Everything you need, without compromise",
        help_text="Large heading for the top block"
    )
    hc_top_description = models.TextField(
        blank=True, null=True,
        help_text="Descriptive paragraph for the top block"
    )
    hc_top_button = models.CharField(
        max_length=80, blank=True, null=True,
        default="Learn more",
        help_text="Primary button label (e.g. 'Learn more')"
    )
    hc_bottom_heading = models.CharField(
        max_length=255, blank=True, null=True,
        default="Thoughtfully designed so you can switch off",
        help_text="Large heading for the bottom block"
    )
    hc_bottom_description = models.TextField(
        blank=True, null=True,
        help_text="Descriptive paragraph for the bottom block"
    )

    # Outdoor Living & Pool section fields
    olp_label = models.CharField(
        max_length=100, blank=True, null=True,
        default="Outdoor Living & Pool",
        help_text="Small label above the heading"
    )
    olp_heading = models.CharField(
        max_length=255, blank=True, null=True,
        default="What the villa offers to make your stay seamless",
        help_text="Large heading for the section"
    )
    olp_description_1 = models.TextField(
        blank=True, null=True,
        default="Outdoor living here is effortless and inviting with long lunches under the shade drift into evenings that stretch gently into the night, offering space to gather with others or simply sit back and breathe.",
        help_text="First descriptive paragraph"
    )
    olp_description_2 = models.TextField(
        blank=True, null=True,
        default="Just steps away, the pool becomes a natural extension of this rhythm, a place to cool off, unwind, or spend entire days lounging by the water, where some of the best memories quietly take shape.",
        help_text="Second descriptive paragraph"
    )
    olp_button_text = models.CharField(
        max_length=80, blank=True, null=True,
        default="Learn more",
        help_text="Primary button label (e.g. 'Learn more')"
    )
    olp_outdoor_image = models.ForeignKey(
        'wagtailimages.Image',
        null=True, blank=True,
        on_delete=models.SET_NULL,
        related_name='+',
        help_text="Image for the Outdoor Living block"
    )
    olp_outdoor_title = models.CharField(
        max_length=150, blank=True, null=True,
        default="Outdoor living",
        help_text="Title for the Outdoor Living block"
    )
    olp_outdoor_desc = models.TextField(
        blank=True, null=True,
        default="Long lunches under shade, evenings that stretch into night. Space to gather, or simply sit and breathe.",
        help_text="Description for the Outdoor Living block"
    )
    olp_pool_image = models.ForeignKey(
        'wagtailimages.Image',
        null=True, blank=True,
        on_delete=models.SET_NULL,
        related_name='+',
        help_text="Image for the Pool block"
    )
    olp_pool_title = models.CharField(
        max_length=150, blank=True, null=True,
        default="Pool",
        help_text="Title for the Pool block"
    )
    olp_pool_desc = models.TextField(
        blank=True, null=True,
        default="Cool off, unwind, or spend the whole day poolside. This is where most memories are made.",
        help_text="Description for the Pool block"
    )

    # Surroundings section fields
    sur_label = models.CharField(
        max_length=100, blank=True, null=True,
        default="Surroundings",
        help_text="Small label above the heading"
    )
    sur_heading = models.CharField(
        max_length=255, blank=True, null=True,
        default="The best of the South of France, with complete peace and privacy",
        help_text="Heading for the Surroundings section"
    )
    sur_description = models.TextField(
        blank=True, null=True,
        default="Surrounded by vineyards and forest, yet minutes from Saint Tropez. Close enough for beach clubs and restaurants, far enough for complete peace.",
        help_text="Descriptive paragraph"
    )
    sur_button_text = models.CharField(
        max_length=80, blank=True, null=True,
        default="Explore",
        help_text="Button text"
    )
    sur_image_left = models.ForeignKey(
        'wagtailimages.Image',
        null=True, blank=True,
        on_delete=models.SET_NULL,
        related_name='+',
        help_text="Image on the top left"
    )
    sur_image_right = models.ForeignKey(
        'wagtailimages.Image',
        null=True, blank=True,
        on_delete=models.SET_NULL,
        related_name='+',
        help_text="Image staggered on the right"
    )

    # Reviews section fields
    rev_heading = models.CharField(
        max_length=255, blank=True, null=True,
        default="A place guests return to",
        help_text="Section heading"
    )
    rev_description = models.TextField(
        blank=True, null=True,
        default="Guests return year after year for the calm, the setting, and the feeling of complete escape",
        help_text="Short description beneath the heading"
    )

    # Booking Section
    book_label = models.CharField(max_length=255, blank=True, null=True, default="Planning & Booking")
    book_heading = models.CharField(max_length=255, blank=True, null=True, default="Check availability and plan your stay")
    book_description = models.TextField(blank=True, null=True, default="Choose your dates, check availability instantly, and book directly with us for the best experience and rates.")

    # What Happens Next
    whn_heading = models.CharField(max_length=255, blank=True, null=True, default="What Happens Next")

    # Why Book Directly With Us
    why_heading = models.CharField(max_length=255, blank=True, null=True, default="Why Book Directly With Us")
    why_image = models.ForeignKey('wagtailimages.Image', on_delete=models.SET_NULL, null=True, blank=True, related_name='+')
    why_btn1_text = models.CharField(max_length=255, blank=True, null=True, default="Book Now")
    why_btn2_text = models.CharField(max_length=255, blank=True, null=True, default="Inquire")

    # Book With Confidence
    bwc_heading = models.CharField(max_length=255, blank=True, null=True, default="Book With Confidence")

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
        MultiFieldPanel([
            FieldPanel('hc_label'),
            FieldPanel('hc_top_heading'),
            FieldPanel('hc_top_description'),
            FieldPanel('hc_top_button'),
            FieldPanel('hc_bottom_heading'),
            FieldPanel('hc_bottom_description'),
        ], heading="Home Comforts Section"),
        InlinePanel('home_comforts_images', label="Home Comforts Images"),
        MultiFieldPanel([
            FieldPanel('olp_label'),
            FieldPanel('olp_heading'),
            FieldPanel('olp_description_1'),
            FieldPanel('olp_description_2'),
            FieldPanel('olp_button_text'),
            FieldPanel('olp_outdoor_image'),
            FieldPanel('olp_outdoor_title'),
            FieldPanel('olp_outdoor_desc'),
            FieldPanel('olp_pool_image'),
            FieldPanel('olp_pool_title'),
            FieldPanel('olp_pool_desc'),
        ], heading="Outdoor Living & Pool Section"),
        MultiFieldPanel([
            FieldPanel('sur_label'),
            FieldPanel('sur_heading'),
            FieldPanel('sur_description'),
            FieldPanel('sur_button_text'),
            FieldPanel('sur_image_left'),
            FieldPanel('sur_image_right'),
        ], heading="Surroundings Section"),
        MultiFieldPanel([
            FieldPanel('rev_heading'),
            FieldPanel('rev_description'),
        ], heading="Reviews Section"),
        InlinePanel('reviews', label="Guest Reviews"),
        MultiFieldPanel([
            FieldPanel('book_label'),
            FieldPanel('book_heading'),
            FieldPanel('book_description'),
        ], heading="Booking Section"),
        MultiFieldPanel([
            FieldPanel('whn_heading'),
        ], heading="What Happens Next Section"),
        InlinePanel('whn_steps', label="What Happens Next Steps"),
        MultiFieldPanel([
            FieldPanel('why_heading'),
            FieldPanel('why_image'),
            FieldPanel('why_btn1_text'),
            FieldPanel('why_btn2_text'),
        ], heading="Why Book Directly With Us Section"),
        InlinePanel('why_benefits', label="Why Book Directly Benefits (Bullet Points)"),
        MultiFieldPanel([
            FieldPanel('bwc_heading'),
        ], heading="Book With Confidence Section"),
        InlinePanel('bwc_items', label="Book With Confidence Items"),
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
        APIField('hc_label'),
        APIField('hc_top_heading'),
        APIField('hc_top_description'),
        APIField('hc_top_button'),
        APIField('hc_bottom_heading'),
        APIField('hc_bottom_description'),
        APIField('home_comforts_images'),
        APIField('olp_label'),
        APIField('olp_heading'),
        APIField('olp_description_1'),
        APIField('olp_description_2'),
        APIField('olp_button_text'),
        APIField('olp_outdoor_image', serializer=ImageRenditionField('original')),
        APIField('olp_outdoor_title'),
        APIField('olp_outdoor_desc'),
        APIField('olp_pool_image', serializer=ImageRenditionField('original')),
        APIField('olp_pool_title'),
        APIField('olp_pool_desc'),
        APIField('sur_label'),
        APIField('sur_heading'),
        APIField('sur_description'),
        APIField('sur_button_text'),
        APIField('sur_image_left', serializer=ImageRenditionField('original')),
        APIField('sur_image_right', serializer=ImageRenditionField('original')),
        APIField('rev_heading'),
        APIField('rev_description'),
        APIField('reviews'),
        APIField('book_label'),
        APIField('book_heading'),
        APIField('book_description'),
        APIField('whn_heading'),
        APIField('whn_steps'),
        APIField('why_heading'),
        APIField('why_image', serializer=ImageRenditionField('original')),
        APIField('why_btn1_text'),
        APIField('why_btn2_text'),
        APIField('why_benefits'),
        APIField('bwc_heading'),
        APIField('bwc_items'),
    ]
