import sys
import os
import django 

from fastapi import FastAPI, HTTPException
from fastapi.middleware.cors import CORSMiddleware
"""
Django is in the backend folder while fastAPI in the api folder
To ensure that fastAPI can access Django you hace to specify where Django is 
"""
sys.path.insert(0, os.path.join(os.path.dirname(__file__), "..", 'backend'))

"""Apart from that  we have the startproject and startapp
In this case specification to django the settings.py it should use
"""
os.environ.setdefault("DJANGO_SETTINGS_MODULE", "storiesdb.settings")

#Boot Django
"""
To boot is to ensure django:
ensures that the django framework  connects to the database, loads all your apps, prepares the ORM.
"""
django.setup()

"""
With all that accomplished - the backend file established as to where it is and is accesible by python
Sttings.py defined - to ensure django knows which file/syntax to use
Then django setup - loaded
We can now import the models
"""

from stories.models import Story, StoryPage

app = FastAPI()

app.add_middleware(
    CORSMiddleware,
     allow_origins=[
        "http://localhost:5173",      # keep this
        "http://127.0.0.1:5173",      # add this too
    ],
    allow_credentials =True,
    allow_methods = ['GET'],
    allow_headers = ['*'],
)

#objects.all() - we want to acess and list all the stories that we have in our database
@app.get('/stories')
def get_stories():
    stories = Story.objects.all()
    return [
        {
            "id": story.id,
            "title": story.title,
        }
        for story in stories
    ]

#We want the pages of a story - the one many relationship

@app.get("/stories/{story_id}")
def get_story(story_id: int):
    #Defencive programming with try-excpet block to check if the stories actually exist or they've been deleted

    try:
        story = Story.objects.get(id=story_id)
    except Story.DoesNotExist:
        raise HTTPException(status_code = 404, detail='Story not Found!')
    
    #Uses releated_name from the model - ForeignKey enables two way flow of data 
    #From a page to a story as well as a story to a page
    pages = story.pages.all()

    return {
        "id": story.id,
        "title": story.title,
        'pages': [
            {
                "page_number": page.page_number,
                "content": page.content,
            }
            for page in pages
        ]
    }