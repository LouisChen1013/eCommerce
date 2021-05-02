# https://docs.djangoproject.com/en/3.1/topics/signals/

from django.db.models.signals import pre_save
from django.contrib.auth.models import User

# Set username = email for login in purpose
def updateUser(sender, instance, **kwargs):
    # print('Signal Triggered')
    user = instance
    if user.email != "":
        user.username = user.email

# Run the updateUser function before a User Model is saved 
pre_save.connect(updateUser,sender=User)
