from django.apps import AppConfig


class BaseConfig(AppConfig):
    name = 'base'

    # trigger our signal when we register/update our users
    def ready(sefl):
        import base.signals
