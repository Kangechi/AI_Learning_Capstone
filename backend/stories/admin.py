from django.contrib import admin
from .models import Story, StoryPage

class StoryPageInline(admin.TabularInline):
    model = StoryPage
    extra = 3

class StoryAdmin(admin.ModelAdmin):
    inlines = [StoryPageInline]

admin.site.register(Story, StoryAdmin)


# Register your models here.
