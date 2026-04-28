from django.db import models

class Story(models.Model):
    title = models.CharField(max_length=200)

    def __str__(self):
        return self.title 

class StoryPage(models.Model):
    story = models.ForeignKey(Story, on_delete=models.CASCADE, related_name='pages')
    page_number = models.IntegerField()
    content = models.TextField()

    class Meta:
        ordering = ['page_number']

    def __str__(self):
        return f"{self.story.title} - Page {self.page_number}"